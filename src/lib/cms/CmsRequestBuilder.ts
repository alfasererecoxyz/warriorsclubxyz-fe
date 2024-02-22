type CmsDataset = 'production'

type CmsPerspective = 'raw' | 'published' | 'previewDrafts'

type CmsQueryBuilderConfig = {
  baseUrl: string,
  apiVersion: string,
  dataset: CmsDataset,
  query: CmsQuery,
  method: 'GET' | 'POST',

}

type CmsQuery = {
  string: string,
  perspective: CmsPerspective,
  params?: Record<string, unknown>
}

export class CmsQueryBuilder {

  constructor(
    private config: CmsQueryBuilderConfig
  ) {}

  public setApiVersion(apiVersion: `v${number}-${number}-${number}`): CmsQueryBuilder {
    this.config.apiVersion = apiVersion
    return this
  }

  public setDataset(dataset: CmsDataset): CmsQueryBuilder {
    this.config.dataset = dataset;
    return this;
  }

  public setQuery(query: CmsQuery['string']): CmsQueryBuilder {
    this.config.query.string = query;
    return this;
  }

  public setParams(params: Record<string, unknown>): CmsQueryBuilder {
    this.config.query.params = params;
    return this;
  }

  public setPerspective(perspective: CmsPerspective): CmsQueryBuilder {
    this.config.query.perspective = perspective;
    return this;
  }

  public clone(): CmsQueryBuilder {
    return new CmsQueryBuilder(this.config)
  }

  private buildPath(): string {
    return `/${this.config.apiVersion}/data/query/${this.config.dataset}`;
  }

  private buildSearchParams(): string {
    return new URLSearchParams([
      ['query', this.config.query.string],
      ['perspective', this.config.query.perspective]
    ]).toString()
  }
  
  public build(): [URL, RequestInit] {
    switch(this.config.method) {
      case "GET": 
        return [
          new URL(this.buildPath()+"?"+this.buildSearchParams(), this.config.baseUrl), 
          { 
            method: 'GET',
            next: {
              revalidate: 3600
            }
          }
        ]
      case "POST": 
        return [
          new URL(this.buildPath(), this.config.baseUrl), 
          { 
            method: 'POST',
            next: {
              revalidate: 3600
            },
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              query: this.config.query.string,
              params: this.config.query.params
            })
          }
        ];
    }
  }
}

export const cmsQueryBuilder = new CmsQueryBuilder({ 
  baseUrl: process.env.CMS_BASE_URL!,
  apiVersion: "v2022-03-07",
  dataset: 'production',
  query: {
    string: "",
    perspective: "published"
  },
  method: 'POST',
})
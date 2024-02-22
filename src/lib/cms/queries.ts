import { CmsQueryBuilder, cmsQueryBuilder } from "./CmsRequestBuilder";
import { PortableTextComponent, PortableTextProps } from '@portabletext/react';

type BaseCmsPost = {
  _id: string,
  title: string,
  publishedAt: string
  slug: {
    current: string
  }
  excerpt: string,
  body: PortableTextProps['value'],
  categories: {title: string}[]
  author: { 
    name: string,
    image: {
      asset: {
        url: string,
        metadata: {
          dimensions: {
            aspectRatio: number,
            width: number,
            height: number
          }
        }
      }
    }
  },
  mainImage: {
    asset: {
      url: string,
      metadata: {
        dimensions: {
          aspectRatio: number,
          width: number,
          height: number
        }
      }
    }
  } 
}

const postAttributes = `
  _id, 
  title,
  slug{current},
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..255], "") + "...",
  categories[]->{title},
  author->{
    name,
    image{
      asset->{
        url,
        metadata{
          dimensions
        }
      }
    }
  },
  mainImage{
    asset->{
      url,
      metadata{
        dimensions
      }
    }
  }
`

export namespace CmsQuery {

  export function getLatestPost() {
    return cmsFetch<BaseCmsPost>(
      cmsQueryBuilder
        .clone()
        .setQuery(`*[_type == "post"]|order(publishedAt desc)[0]{${postAttributes}}`)
    )
  }

  export function getLatestFeaturedPost() {
    return cmsFetch<BaseCmsPost>(
      cmsQueryBuilder
        .clone()
        .setQuery(`*[_type == "post" && "FEATURED" in categories[]->title && "BLOG" in categories[]->title]|order(publishedAt desc)[0]{${postAttributes}}`)
    )
  }

  export function getPostBySlug(slug: string) {
    return cmsFetch<BaseCmsPost>(
      cmsQueryBuilder
      .clone()
      .setQuery(`*[_type == "post" && slug.current == $slug][0]{${postAttributes}, body}`)
      .setParams({slug})
    )
  }

  export function getPostsByCategory(category?: string) {
    category ??= "BLOG"
    return cmsFetch<Array<BaseCmsPost>>(
      cmsQueryBuilder
      .clone()
      .setQuery(`*[_type == "post" && $category in categories[]->title && "BLOG" in categories[]->title]|order(publishedAt desc){${postAttributes}}`).setParams({category})
    )
  }

  type CmsResponse<TData> = {
    query: string,
    result: TData,
    ms: string
  }

  async function cmsFetch<TData>(builder: CmsQueryBuilder): Promise<CmsResponse<TData>> {
    const [url, init] = builder.build();
    const response = await fetch(url, init);
    if (!response.ok) {
      console.log(await response.json())
      throw new Error(response.statusText)
    }

    const data = await response.json() as CmsResponse<TData>
    return data;
  }
}
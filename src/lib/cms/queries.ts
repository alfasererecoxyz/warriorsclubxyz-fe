import { CmsQueryBuilder, cmsQueryBuilder } from "./CmsRequestBuilder";
import { PortableTextComponent, PortableTextProps } from '@portabletext/react';

export namespace CmsQuery {

  export function getLatestPost() {
    return cmsFetch<{
      _id: string,
      title: string,
      publishedAt: string
      slug: {
        current: string
      }
      excerpt: string,
      body: PortableTextProps['value'],
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
    }>(
      cmsQueryBuilder
        .clone()
        .setQuery(`
        *[_type == "post"]|order(publishedAt desc)[0]{ 
            _id, 
            title,
            slug{current},
            publishedAt,
            body,
            "excerpt": array::join(string::split((pt::text(body)), "")[0..255], "") + "...",
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
          }
        `)
    )
  }

  export function getPostBySlug(slug: string) {
    return cmsFetch<{
      _id: string,
      title: string,
      publishedAt: string
      slug: {
        current: string
      }
      body: PortableTextProps['value'],
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
    }>(
      cmsQueryBuilder
      .clone()
      .setQuery(`
      *[_type == "post" && slug.current == $slug][0]{ 
        _id, 
        title,
        slug{current},
        publishedAt,
        body,
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
      }
      `)
      .setParams({
        slug
      })
    )
  }

  export function getAllPosts() {
    return cmsFetch<Array<{
      _id: string,
      title: string,
      slug: {
        current: string
      }
      excerpt: string,
      author: { name: string },
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
    }>>(
      cmsQueryBuilder
      .clone()
      .setQuery(`
      *[_type == "post"]{ 
        _id, 
        title,
        slug{current},
        "excerpt": array::join(string::split((pt::text(body)), "")[0..255], "") + "...",
        author->{name},
        mainImage{
          asset->{
            url,
            metadata{
              dimensions
            }
          }
        }
      }`
      )
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
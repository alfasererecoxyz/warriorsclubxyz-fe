import Image from 'next/image'
import { CmsQuery } from "../cms/queries"
import Link from 'next/link'

type CmsArticleProps = {
  data: Awaited<ReturnType<typeof CmsQuery.getAllPosts>>['result'][0]
}

export function CmsArticle(props: CmsArticleProps) {
  return (
    <Link href={`/blog/${props.data.slug.current}`} className='block'>
      <article>
        <Image
          alt={props.data.title}
          src={props.data.mainImage.asset.url} 
          width={props.data.mainImage.asset.metadata.dimensions.width}
          height={props.data.mainImage.asset.metadata.dimensions.height}
        />
        <h3>{props.data.title}</h3>
      </article>
    </Link>
  )
}
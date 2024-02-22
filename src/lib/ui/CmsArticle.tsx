import Image from 'next/image'
import { CmsQuery } from "../cms/queries"
import Link from 'next/link'
import { cx } from 'class-variance-authority'

type CmsArticleProps = {
  data: Awaited<ReturnType<typeof CmsQuery.getPostsByCategory>>['result'][0]
}

function CmsCategoryPill({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <span className={cx('bg-white text-black dark:bg-black dark:text-white rounded-full px-2 py-1 text-xs uppercase', className)}>
      {children}
    </span>
  )
}

export function CmsArticle(props: CmsArticleProps) {
  return (
    <Link href={`/blog/${props.data.slug.current}`} className='block'>
      <div className='relative h-60 flex flex-col justify-end p-2'>
        <Image
          alt={props.data.title}
          src={props.data.mainImage.asset.url} 
          fill
          objectFit='cover'
        />
        <div className='flex flex-row gap-2 justify-end'>
          {props.data.categories.map(c => <CmsCategoryPill className='relative'>{c.title}</CmsCategoryPill>)}
        </div>
      </div>
      <article className="bg-[#AE000011] dark:bg-[#AE000022] prose dark:prose-invert p-4 text-black dark:text-white">
        <h4>{props.data.title}</h4>
        <span className="p-0 text-xs flex flex-row items-center text-center">
          <Image 
            className="my-0 inline me-2 rounded-full" 
            src={props.data.author.image.asset.url} 
            width={24} 
            height={24} 
            alt={props.data.author.name}
          />
          {props.data.author.name}
          {" - "}
          {new Date(props.data.publishedAt).toLocaleDateString()}
        </span>
        <p className='text-xs'>
          {props.data.excerpt}
        </p>
      </article>
    </Link>
  )
}
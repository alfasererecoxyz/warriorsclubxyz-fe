import { CmsQuery } from "@/lib/cms/queries";
import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await CmsQuery.getPostBySlug(params.slug);

  const title = `${data.result.title} | Warriors Club`;

  return ({
    title,
    openGraph: {
      title,
      type: "article",
      publishedTime: data.result.publishedAt,
      tags: data.result.categories.map(t => t.title),
      authors: data.result.author.name,
      description: data.result.excerpt,
      images: {
        url: data.result.mainImage.asset.url,
      }
    }
  })
}

export default async function BlogPost({params}: { params: { slug: string } }) {
  const data = await CmsQuery.getPostBySlug(params.slug);

  return (
    <div className="flex flex-col items-stretch p-4">
      <div className='relative h-[512px] flex flex-col justify-end p-2'>
        <Image 
          src={data.result.mainImage.asset.url}
          fill
          objectFit='cover'
          className="object-top"
          alt={data.result.title}
        />
      </div>
      <div className="relative prose dark:prose-invert max-w-xl mx-auto pb-16 pt-2 px-2 bg-white dark:bg-black">
        <article className="bg-[#AE000011] dark:bg-[#AE000022] prose dark:prose-invert p-4 text-black dark:text-white">
          <span className="p-0 text-xs flex flex-row items-center text-center">
            <Image 
              className="my-2 inline me-2 rounded-full" 
              src={data.result.author.image.asset.url} 
              width={24} 
              height={24} 
              alt={data.result.author.name}
            />
            {data.result.author.name}
            {" - "}
            {new Date(data.result.publishedAt).toLocaleDateString()}
          </span>
          <h1 className="my-0">{data.result.title}</h1>
        </article>
        <PortableText value={data.result.body}/>
      </div>
    </div>
  )

}
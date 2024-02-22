import { CmsQuery } from "@/lib/cms/queries";
import { Header } from "@/lib/ui/Header";
import { PortableText } from "@portabletext/react";
import Image from "next/image"

export default async function BlogPost({params}: { params: { slug: string } }) {
  const data = await CmsQuery.getPostBySlug(params.slug);

  return (
    <div className="flex flex-col items-stretch p-4">
      <Image 
        src={data.result.mainImage.asset.url} 
        width={data.result.mainImage.asset.metadata.dimensions.width}
        height={data.result.mainImage.asset.metadata.dimensions.height}
        alt={data.result.title}
      />
      <div className="relative prose dark:prose-invert max-w-xl mx-auto pb-16 pt-4 px-8 bg-white dark:bg-black">
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
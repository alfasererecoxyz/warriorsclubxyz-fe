import { CmsQuery } from "@/lib/cms/queries";
import { CmsArticle } from "@/lib/ui/CmsArticle";
import { cx } from "class-variance-authority";
import Link from "next/link";
import Image from "next/image"
import { BorderDecal } from "@/lib/ui/BorderDecal";

export default async function BlogPosts({searchParams}: {searchParams: {category?: string}}) {
  const latestPost = await CmsQuery.getLatestPost();

  if (!searchParams.category)
    searchParams.category = 'BLOG'

  const allPosts = await CmsQuery.getPostsByCategory(searchParams.category);

  return (
    <div>
      <div className="p-4">
        <Image 
          src={latestPost.result.mainImage.asset.url}
          width={latestPost.result.mainImage.asset.metadata.dimensions.width}
          height={latestPost.result.mainImage.asset.metadata.dimensions.height}
          alt={latestPost.result.title}
        />
        <article className="bg-[#AE000011] dark:bg-[#AE000022] p-4 text-black dark:text-white flex flex-row justify-between">
          <div className="prose dark:prose-invert">
            <h4>{latestPost.result.title}</h4>
            <span className="p-0 text-xs flex flex-row items-center text-center">
              <Image 
                className="my-0 inline me-2 rounded-full" 
                src={latestPost.result.author.image.asset.url} 
                width={24} 
                height={24} 
                alt={latestPost.result.author.name}
              />
              {latestPost.result.author.name}
              {" - "}
              {new Date(latestPost.result.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <Link className="inline-block self-end" href={`/blog/${latestPost.result.slug.current}`}>
            <BorderDecal br className="dark:border-white border-black">
              <div className="dark:bg-white bg-black dark:text-black text-white  px-2 py-1">
                Read More
              </div>
            </BorderDecal>
          </Link>
        </article>
      </div>
      <div className="flex flex-row p-4 gap-4">
        <Link 
          href="?category=BLOG" 
          className={cx(
            "px-4 py-1 rounded-full", 
            searchParams.category === "BLOG" ? "bg-bright-red-900 text-white" : "bg-black text-white dark:bg-white dark:text-black"
          )}
        >
          All
        </Link>
        <Link
          href="?category=LORE"
          className={cx(
            "px-4 py-1 rounded-full", 
            searchParams.category === "LORE" ? "bg-bright-red-900 text-white" : "bg-black text-white dark:bg-white dark:text-black"
          )}
        >
          Lore
        </Link>
        <Link 
          href="?category=ART"
          className={cx(
            "px-4 py-1 rounded-full", 
            searchParams.category === "ART" ? "bg-bright-red-900 text-white" : "bg-black text-white dark:bg-white dark:text-black"
          )}
        >
          Art
        </Link>
        <Link 
          href="?category=DEV"
          className={cx(
            "px-4 py-1 rounded-full", 
            searchParams.category === "DEV" ? "bg-bright-red-900 text-white" : "bg-black text-white dark:bg-white dark:text-black"
          )}
        >
          Dev
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {
          allPosts.result.map(a => <CmsArticle key={a._id} data={a}/>)
        }
      </div>
    </div>
  )
}
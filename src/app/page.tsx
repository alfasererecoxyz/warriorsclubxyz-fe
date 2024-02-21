import { cx } from "class-variance-authority";
import "./page.css"
import { Header } from "@/lib/ui/Header";
import Image from "next/image";
import { Button } from "@/lib/ui/Button";
import { BorderDecal } from "@/lib/ui/BorderDecal";
import { Siwe } from "@/lib/siwe/Siwe";
import { BackgroundText } from "@/lib/ui/BackgroundText";
import { CmsQuery } from "@/lib/cms/queries";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

type DivProps = React.JSX.IntrinsicElements['div']

function HeaderArea({className, ...rest}: DivProps) {
  return <div {...rest} className={cx("page-grid__header", className)}/>  
}

function HeroArea({className, ...rest}: DivProps) {
  return <div {...rest} className={cx("page-grid__hero", className)}/> 
}

function BodyArea({className, ...rest}: DivProps) {
  return <div {...rest} className={cx("page-grid__body", className)}/> 
} 

function StripArea({className, ...rest}: DivProps) {
  return <div {...rest} className={cx("page-grid__strip", className)}/> 
} 

function PageGrid({className, ...rest}: DivProps) {
  return <div {...rest} className={cx("page-grid", className)}/>
}


export const metadata: Metadata = {
  title: "Warriors Club | Home"
}


export default async function Home() {

  const latestPost = await CmsQuery.getLatestPost();

  return (
    <div className="background">
      <div className="max-w-7xl mx-auto min-h-screen grid relative">
        <BackgroundText.Text className="hidden md:block absolute md:translate-y-[20%] md:translate-x-[17%] z-0 scale-105 md:-rotate-90" text="Warriors"/>
        <PageGrid className="relative z-10">
          <HeaderArea className="h-min">
            <Header/>
          </HeaderArea>
          <StripArea className="hidden md:block bg-bright-red-800 p-4 overflow-y-clip relative sm:-z-10">
            <Siwe/>
            <Image 
              src="https://cdn.sanity.io/images/wf9a2g9o/production/e1fa89696dce0e214ac84e88791e1ded82dbb343-1152x3084.png"
              alt="Human Legion Warrior"
              width={768}
              height={2056}
              className="static md:absolute md:left-1/4 md:top-1/3 z-0 md:scale-150"
            />
          </StripArea>
          <HeroArea className="p-4 flex">
            <div className="flex flex-col gap-8">
              <h1 className="prose dark:prose-invert dark:text-white text-black text-6xl">Be the now today, <br/>not tomorrow</h1>
              <div className="flex flex-row items-center gap-8">
                <Button size={'lg'} className="flex-grow">
                  <BorderDecal br className="border-black dark:border-white">
                    <div className="bg-black dark:bg-white dark:text-black text-white py-3">
                      Get Started
                    </div>
                  </BorderDecal>
                </Button>
                <Button size={'lg'} className="flex-grow">
                  <div className="border-2 text-black dark:border-white border-black dark:text-white py-3">
                    Join the Community
                  </div>
                </Button>
              </div>
            </div>
            <div/>
          </HeroArea>
          <BodyArea>
            <div className="self-start">
              <BorderDecal tl className="dark:border-bright-red-800 border-bright-red-500">
                <article className="bg-[#AE000011] dark:bg-[#AE000022] prose dark:prose-invert p-4 text-black dark:text-white flex flex-col">
                  <h4 className="dark:text-gray-400 text-gray-600">Latest Blog Post</h4>
                  <h1 className="my-0">{latestPost.result.title}</h1>
                  <span className="p-0 text-xs flex flex-row items-center">
                    <Image className="my-2 inline me-2 rounded-full" src={latestPost.result.author.image.asset.url} width={24} height={24} alt={latestPost.result.author.name}/>
                    {latestPost.result.author.name}
                    {" - "}
                    {new Date(latestPost.result.publishedAt).toLocaleDateString()}
                  </span>
                  <p>
                    {latestPost.result.excerpt}
                  </p>
                  <Link className="inline-block self-end" href={`/blog/${latestPost.result.slug.current}`}>
                    <BorderDecal br className="dark:border-white border-black">
                      <div className="dark:bg-white bg-black dark:text-black text-white  px-2 py-1">
                        Read More
                      </div>
                    </BorderDecal>
                  </Link>
                </article>
              </BorderDecal>
            </div>
          </BodyArea>
        </PageGrid>
      </div>
    </div>
  );
}

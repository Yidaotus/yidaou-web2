import { cache } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./card";

import Parser from "rss-parser";
import { Separator } from "./separator";
import Link from "next/link";
import { clamp } from "framer-motion";
import { Skeleton } from "./skeleton";
import { Badge } from "./badge";

const parser: Parser = new Parser();

const BLOG_RSS_URL = "https://yidaotus.medium.com/feed";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getRecentBlogPosts = cache(async (_ts: string) => {
  await sleep(3000);
  const blogPostReq = await fetch(BLOG_RSS_URL);
  const blogPostData = await blogPostReq.text();
  const blogPosts = await parser.parseString(blogPostData);
  return blogPosts;
});

const BlockPostsPlaceHolder = () => (
  <>
    <CardHeader>
      <CardTitle className="text-lg">Blog</CardTitle>
      <CardDescription className="">Recent Entries</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
      {[0, 1, 2].map((i) => (
        <div className="flex flex-col gap-4" key={i}>
          <h2 className="whitespace-nowrap text-ellipsis overflow-hidden">
            <Skeleton className="h-3 w-2/3" />
          </h2>
          <div className="flex space-x-4 text-muted-foreground justify-between">
            <Skeleton className="h-2 w-[50px]" />
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      ))}
    </CardContent>
  </>
);

const RecentBlockPostsCard = async () => {
  const blogPosts = await getRecentBlogPosts(new Date().toLocaleDateString());

  return (
    <>
      <CardHeader>
        <CardTitle className="text-lg">Blog</CardTitle>
        <CardDescription className="">Recent Entries</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        {blogPosts.items
          .sort(
            (p1, p2) => (Number(p2.pubDate) || 0) - (Number(p1.pubDate) || 0),
          )
          .slice(0, 3)
          .map((post, i) => (
            <>
              <div className="flex flex-col">
                <h2 className="whitespace-nowrap text-ellipsis overflow-hidden">
                  <Link
                    href={post.link || ""}
                    className="hover:text-muted-foreground transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <div className="flex space-x-4 text-muted-foreground justify-between">
                  <div className="text-xs">
                    {new Date(post.pubDate || "").toLocaleDateString()}
                  </div>
                  {/*
                  <div className="flex space-x-2">
                    {post.categories?.map((tag) => (
                      <Badge variant="outline" className="text-muted-foreground">{tag}</Badge>
                    ))}
                  </div>
                */}
                </div>
              </div>
              {i < 2 && <Separator />}
            </>
          ))}
      </CardContent>
    </>
  );
};

export default RecentBlockPostsCard;
export { BlockPostsPlaceHolder };
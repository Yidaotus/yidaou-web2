import Parser from "rss-parser";
import { Separator } from "./separator";
import Link from "next/link";
import { Skeleton } from "./skeleton";

const parser: Parser = new Parser();

const BLOG_RSS_URL = "https://yidaotus.medium.com/feed";

const getRecentBlogPosts = async () => {
  const blogPostReq = await fetch(BLOG_RSS_URL, {
    next: { revalidate: 3600 },
  });
  const blogPostData = await blogPostReq.text();
  const blogPosts = await parser.parseString(blogPostData);
  return blogPosts;
};

const BlogPostsPlaceHolder = () => (
  <div className="flex flex-col gap-4">
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
  </div>
);

const RecentBlockPosts = async () => {
  const blogPosts = await getRecentBlogPosts();

  return (
    <div className="flex flex-col space-y-2">
      {blogPosts.items
        .sort((p1, p2) => (Number(p2.pubDate) || 0) - (Number(p1.pubDate) || 0))
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
              </div>
            </div>
            {i < 2 && <Separator />}
          </>
        ))}
    </div>
  );
};

export default RecentBlockPosts;
export { BlogPostsPlaceHolder as BlockPostsPlaceHolder };

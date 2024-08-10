import { getSortedPostsData } from "@/lib/posts";
import PostListItem from "@/app/components/PostListItem";

export default function Posts() {
  const posts = getSortedPostsData();

  return (
    <section>
      <h2>Blog</h2>
      <ul className="list-unstyled">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

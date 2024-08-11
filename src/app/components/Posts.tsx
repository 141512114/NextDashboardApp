import { getSortedPostsData } from "@/lib/posts";
import PostListItem from "@/app/components/PostListItem";

export default function Posts() {
  const posts = getSortedPostsData();

  return (
    <section className="nbs-post-list-container">
      <h2>Blog</h2>
      <ul className="nbs-post-list list-unstyled">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}

import { getSortedPostsData } from "@/lib/posts";
import { VIEW_TYPE } from "@/lib/Enums";
import PostListItem from "@/app/components/Posts/PostListItem";
import AdminPostListItem from "@/app/components/Posts/AdminPostListItem";

type Props = {
  view_as?: VIEW_TYPE;
};

export default function Posts({ view_as = VIEW_TYPE.VISITOR }: Props) {
  const posts = getSortedPostsData();

  return view_as === VIEW_TYPE.ADMIN ? (
    <section className="nbs-post-list-container">
      <h2>Your Blog (Admin access)</h2>
      <ul className="nbs-post-list list-unstyled">
        {posts.map((post) => (
          <AdminPostListItem key={post.id} post={post} />
        ))}
      </ul>
    </section>
  ) : (
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

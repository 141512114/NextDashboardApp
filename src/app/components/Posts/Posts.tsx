import getSortedPostsData from "@/lib/Posts/getSortedPostsData";
import { VIEW_TYPE } from "@/lib/Enums";
import PostListItem from "@/app/components/Posts/PostListItem";
import AdminPostListItem from "@/app/components/Posts/AdminPostListItem";

type Props = {
  view_as?: VIEW_TYPE;
};

export default async function Posts({ view_as = VIEW_TYPE.VISITOR }: Props) {
  const posts = await getSortedPostsData();

  return view_as === VIEW_TYPE.ADMIN ? (
    <section className="nbs-post-list-container">
      <h2>Your Blog (Admin access)</h2>
      {posts && (
        <ul className="nbs-post-list list-unstyled">
          {posts.map((post: BlogPost) => (
            <AdminPostListItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </section>
  ) : (
    <section className="nbs-post-list-container">
      <h2>Blog</h2>
      {posts && (
        <ul className="nbs-post-list list-unstyled">
          {posts.map((post: BlogPost) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </ul>
      )}
    </section>
  );
}

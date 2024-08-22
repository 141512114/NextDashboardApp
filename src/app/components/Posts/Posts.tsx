import getSortedPostsData from "@/lib/Posts/getSortedPostsData";
import { VIEW_TYPE } from "@/lib/Enums";
import styles from "./Posts.module.scss";
import PostListItem from "@/app/components/Posts/PostListItem";
import AdminPostListItem from "@/app/components/Posts/AdminPostListItem";
import AdminToolBar from "@/app/components/Posts/AdminToolBar";

type Props = {
  view_as?: VIEW_TYPE;
};

export default async function Posts({ view_as = VIEW_TYPE.VISITOR }: Props) {
  const posts = await getSortedPostsData();

  return (
    <section className={styles.postsListContainer}>
      <h1 className="mb-4 text-center display-5">
        {view_as === VIEW_TYPE.ADMIN
          ? "Admin access: Manage your blog"
          : "The amazing blog of someone"}
      </h1>
      {view_as === VIEW_TYPE.ADMIN && <AdminToolBar></AdminToolBar>}
      {posts && (
        <ul className={styles.postList + " list-unstyled"}>
          {posts.map((post: BlogPost) => {
            if (view_as === VIEW_TYPE.ADMIN) {
              return <AdminPostListItem key={post.id} post={post} />;
            } else {
              return <PostListItem key={post.id} post={post} />;
            }
          })}
        </ul>
      )}
    </section>
  );
}

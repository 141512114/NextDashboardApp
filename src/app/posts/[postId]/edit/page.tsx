import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import PostEditor from "@/app/components/PostEditor";

export function generateMetadata({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  const post = posts.find((post) => post.id === postId);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData();
  const { postId } = params;

  if (!posts.find((p) => p.id === postId)) {
    return notFound();
  }

  const { title, date, contentHtml } = await getPostData(postId);

  const formattedDate = getFormattedDate(date);

  return (
    <main className={`px-5 mx-auto ${styles.main} ${styles.postPage}`}>
      <div className="container">
        <div className="mb-5">
          <h1 className="mt-4 mb-0">
            <small className="text-info">Edit mode activated</small>
            <br />
            {title}
          </h1>
          <p className={`${styles.postContentDate} mt-0`}>{formattedDate}</p>
        </div>
        <PostEditor title={title} content={contentHtml}></PostEditor>
        <div className="mt-4">
          <Link href="/dashboard">Back to dashboard</Link>
        </div>
      </div>
    </main>
  );
}

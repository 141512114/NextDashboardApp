import { getPostData, getSortedPostsData } from "@/lib/posts";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import styles from "@/app/page.module.scss";

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
          <h1 className="mt-4 mb-0">{title}</h1>
          <p className={`${styles.postContentDate} mt-0`}>{formattedDate}</p>
        </div>
        <article>
          <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
        <div className="mt-4">
          <Link href="/">Back to home</Link>
        </div>
      </div>
    </main>
  );
}

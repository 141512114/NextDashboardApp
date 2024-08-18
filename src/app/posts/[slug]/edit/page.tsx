import getSortedPostsData from "@/lib/Posts/getSortedPostsData";
import getPostData from "@/lib/Posts/getPostData";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import PostEditor from "@/app/components/PostEditor";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const posts = await getSortedPostsData();

  const post = posts.find((post: BlogPost) => post.id === slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const posts = await getSortedPostsData();

  if (!posts.find((post: BlogPost) => post.id === slug)) {
    return notFound();
  }

  const { title, date, contentHtml } = await getPostData(slug);

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

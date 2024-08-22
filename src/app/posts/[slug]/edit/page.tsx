import getSortedPostsData from "@/lib/Posts/getSortedPostsData";
import getPostData from "@/lib/Posts/getPostData";
import { notFound } from "next/navigation";
import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import styles from "@/app/page.module.scss";
import PostEditor from "@/app/components/PostEditor";
import { Divider } from "@mantine/core";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
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

  const { title, author, date, contentHtml } = await getPostData(slug);

  const formattedDate = getFormattedDate(date);

  return (
    <main className={`px-5 mx-auto ${styles.main} ${styles.postPage}`}>
      <div className="container py-5">
        <div className="post-page-header mb-5">
          <h1 className="mt-4 mb-0 display-3">
            <small className="text-info">Edit mode activated</small>
            <br />
            {title}
          </h1>
          <p className={`${styles.postContentDate} mt-0 small`}>
            {formattedDate} {author && `| Published by ${author}`}
          </p>
        </div>
        <div className="post-page-body">
          <PostEditor
            slug={slug}
            title={title}
            author={author}
            date={date}
            content={contentHtml}
          ></PostEditor>
          <Divider my="xl" color="#181919" />
          <div className="post-page-footer">
            <Link href="/dashboard">Back to dashboard</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

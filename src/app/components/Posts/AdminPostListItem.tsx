"use client";

import getFormattedDate from "@/lib/getFormattedDate";
import deletePost from "@/lib/Posts/deletePost";
import { Button } from "@mantine/core";
import Link from "next/link";
import styles from "./Posts.module.scss";

type Props = {
  post: BlogPost;
};

export default function AdminPostListItem({ post }: Props) {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);

  const editPostLink = `/posts/${id}/edit`;

  const removePost = async () => {
    try {
      await deletePost(id);
      console.log("Deleted post successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <li
      className={`${styles.postItem} ${styles.postItemAdmin} position-relative`}
    >
      <Link
        className="position-absolute d-block w-100 h-100 link unstyled-link"
        href={editPostLink}
        style={{ ["zIndex"]: 0 }}
      ></Link>
      <div className={`${styles.postInner} position-relative`}>
        <div className="d-block d-md-inline-block">
          <h5 className="post-title">{title}</h5>
          <p className="post-metadata m-0 hint">
            <small className="text-sm-start mt-1">{formattedDate}</small>
          </p>
        </div>
        <div className={styles.postItemActions}>
          <Button
            className="d-inline-block me-2"
            color="blue"
            component="a"
            href={editPostLink}
          >
            Edit
          </Button>
          <Button
            className="d-inline-block"
            color="red"
            type="button"
            onClick={() => removePost()}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}

"use client";

import getFormattedDate from "@/lib/getFormattedDate";
import deletePost from "@/lib/Posts/deletePost";
import { Button } from "@mantine/core";
import Link from "next/link";

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
  }

  return (
    <li className="nbs-post-list-item">
      <div className="d-inline-block">
        <p>
          <Link className="link-light link-underline" href={editPostLink}>
            {title}
          </Link>
          <br />
          <small className="text-sm-start mt-1">{formattedDate}</small>
        </p>
      </div>
      <div className="d-inline-block float-end">
        <Link className="btn btn-info me-3" href={editPostLink}>
          Edit
        </Link>
        <Button className="btn btn-danger" type="button" onClick={() => removePost()}>Remove</Button>
      </div>
    </li>
  );
}

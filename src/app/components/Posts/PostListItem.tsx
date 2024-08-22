import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";
import styles from "./Posts.module.scss";

type Props = {
  post: BlogPost;
};

export default function PostListItem({ post }: Props) {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);
  const postLink = `/posts/${id}`;

  return (
    <li className={styles.postItem + " position-relative"}>
      <Link
        className="position-absolute d-block w-100 h-100 link unstyled-link"
        href={postLink}
      ></Link>
      <div className={styles.postInner}>
        <h5 className="post-title">{title}</h5>
        <p className="post-metadata m-0 hint">
          <small className="text-sm-start mt-1">{formattedDate}</small>
        </p>
      </div>
    </li>
  );
}

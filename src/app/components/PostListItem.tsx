import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

type Props = {
  post: BlogPost;
};

export default function PostListItem({ post }: Props) {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);
  return (
    <li className="nbs-post-list-item">
      <p>
        <Link className="link-light link-underline" href={`/posts/${id}`}>
          {title}
        </Link>
        <br />
        <small className="text-sm-start mt-1">{formattedDate}</small>
      </p>
    </li>
  );
}

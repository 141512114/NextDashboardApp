import getFormattedDate from "@/lib/getFormattedDate";
import Link from "next/link";

type Props = {
  post: BlogPost;
};

export default function AdminPostListItem({ post }: Props) {
  const { id, title, date } = post;
  const formattedDate = getFormattedDate(date);

  const editPostLink = `/posts/${id}/edit`;

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
        <button className="btn btn-danger" type="button">
          Remove
        </button>
      </div>
    </li>
  );
}

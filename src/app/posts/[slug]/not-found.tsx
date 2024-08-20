import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container py-5">
      <h1>The requested post does not exist.</h1>
      <div className="mt-4">
        <Link href="/">Back to home</Link>
      </div>
    </div>
  );
}

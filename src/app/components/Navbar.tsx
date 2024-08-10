import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="mx-auto">
        <Link href="/" className="text-white">
          Nolan
        </Link>
      </div>
    </nav>
  );
}

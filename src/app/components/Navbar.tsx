import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="mx-auto">
        <ul className="list-unstyled mb-0">
          <li className="d-inline-block me-3">
            <Link href="/" className="text-white">
              Home
            </Link>
          </li>
          <li className="d-inline-block">
            <Link href="/" className="text-white">
              Admin access
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

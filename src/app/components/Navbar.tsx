import { Button } from "@mantine/core";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="mx-auto">
        <ul className="list-unstyled mb-0">
          <li className="d-inline-block me-3">
            <Button component="a" variant="light" color="#181919" href="/">
              Home
            </Button>
          </li>
          <li className="d-inline-block">
            <Button
              component="a"
              variant="light"
              color="#181919"
              href="/dashboard"
            >
              Dashboard
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

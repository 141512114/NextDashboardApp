import styles from "./page.module.scss";
import Posts from "@/app/components/Posts/Posts";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <>
      <header>
        <div className="container">
          <div className="d-flex flex-column my-5">
            <p className="text-center display-6">
              Hello and welcome to the Next.js dashboard app!
            </p>
            <p className="lead w-50 mx-auto mb-0 text-center">
              NextDashboardApp was a project meant to learn more about
              frameworks and challenge myself into learning the framework
              Next.js.
            </p>
          </div>
          <Navbar />
        </div>
      </header>
      <main className={styles.main}>
        <div className="container py-5">
          <Posts />
        </div>
      </main>
    </>
  );
}

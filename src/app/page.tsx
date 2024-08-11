import styles from "./page.module.scss";
import Posts from "@/app/components/Posts";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  return (
    <>
      <header>
        <div className="container">
          <div className="mt-5 mb-5">
            <p className="m-0 text-xl-center text-white">
              Hello and welcome to React Dashboard!&nbsp;
              <span className="text-nowrap">
                I'm <span className="fw-bold">Nolan</span>
              </span>
            </p>
          </div>
          <Navbar />
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          <Posts />
        </div>
      </main>
    </>
  );
}

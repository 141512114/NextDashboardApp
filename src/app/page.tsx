import styles from "./page.module.css";
import Posts from "@/app/components/Posts";

export default function Home() {
  return (
    <main className={styles.main}>
      <p className="mt-5 mb-5 text-xl-center text-white">
        Hello and welcome to React Dashboard!&nbsp;
        <span className="text-nowrap">
          I'm <span className="fw-bold">Nolan</span>
        </span>
      </p>
      <Posts />
    </main>
  );
}

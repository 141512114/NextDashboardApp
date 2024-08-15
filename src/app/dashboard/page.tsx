import { VIEW_TYPE } from "@/lib/Enums";
import Navbar from "@/app/components/Navbar";
import styles from "@/app/page.module.scss";
import Posts from "@/app/components/Posts/Posts";

export default function Dashboard() {
  return (
    <>
      <header>
        <div className="container">
          <div className="mt-5 mb-5">
            <p className="m-0 text-xl-center text-white">
              You are now viewing the dashboard!
              <br />
              Create, edit or delete posts as you like.
            </p>
          </div>
          <Navbar />
        </div>
      </header>
      <main className={styles.main}>
        <div className="container">
          <Posts view_as={VIEW_TYPE.ADMIN} />
        </div>
      </main>
    </>
  );
}

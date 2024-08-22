import { VIEW_TYPE } from "@/lib/Enums";
import styles from "@/app/page.module.scss";
import Navbar from "@/app/components/Navbar";
import Posts from "@/app/components/Posts/Posts";

export default function Dashboard() {
  return (
    <>
      <header>
        <div className="container">
          <div className="mt-5 mb-5">
            <p className="m-0 text-center display-6">
              You are now viewing the dashboard!
              <br />
              Create, edit or delete posts as you like.
            </p>
          </div>
          <Navbar />
        </div>
      </header>
      <main className={styles.main}>
        <div className="container py-5">
          <Posts view_as={VIEW_TYPE.ADMIN} />
        </div>
      </main>
    </>
  );
}

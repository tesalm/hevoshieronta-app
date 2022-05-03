import styles from "../../styles/Layout.module.css";
import MainNavigation from "./MainNavigation";
import Notification from "../Notification";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <div className={styles.container} id="content">
        <Notification />
        <main className={styles.main}>
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

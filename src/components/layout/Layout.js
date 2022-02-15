import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";
import Notification from "../Notification";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <div className={classes.container} id="content">
        <Notification />
        <main className={classes.main}>
          {props.children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

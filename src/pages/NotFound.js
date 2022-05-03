import styles from "../styles/NotFound.module.css";

const NotFound = () => (
  <div className={styles.notfound}>
    <div>
      <h1>404</h1>
      <h2>Sivua ei löydy!</h2>
      <small className="text-muted">
        Valitettavasti on tapahtunut virhe, pyydettyä sivua ei löydy.
      </small>
    </div>
  </div>
);

export default NotFound;

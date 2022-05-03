import { useContext, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import ContextProvider from "../store/context-reducer";
import { signinUser } from "../store/actions";


const Signup = (props) => {
  const {state, dispatch} = useContext(ContextProvider);
  const [credentials, setCredentials] = useState({user: '', password: '', confirmPassw: '' });

  const validateForm = () => {
    return (
      credentials.user.length > 0 &&
      credentials.password.length > 0 &&
      credentials.confirmPassw.length > 0
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUserData = {
      email: credentials.user,
      password: credentials.password,
    };

    if (credentials.password !== credentials.confirmPassw) {
      dispatch({
        type: "NOTIFY",
        payload: { msg: "Salasanat eivät täsmää.", type: "warning" },
      });
      return;
    }

    await signinUser(newUserData, props.history, dispatch, true);
  };

    return (
      <div className={styles.login}>
        <Form onSubmit={handleSubmit} className="bg-white border rounded shadow-sm p-3">
          <h4>Rekisteröi tilisi</h4>
          <FormGroup className="mb-3 mt-2" controlId="user">
            <FormLabel className="text-secondary mb-1">Sähköposti</FormLabel>
            <FormControl
              type="email"
              maxLength={60}
              value={credentials.user}
              onChange={(event) =>
                setCredentials({ ...credentials, user: event.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mb-3" controlId="password">
            <FormLabel className="text-secondary mb-1">Salasana</FormLabel>
            <FormControl
              type="password"
              maxLength={40}
              value={credentials.password}
              onChange={(event) =>
                setCredentials({ ...credentials, password: event.target.value })
              }
            />
          </FormGroup>

          <FormGroup className="mb-4" controlId="confirmPassword">
            <FormLabel className="text-secondary mb-1">Vahvista salasana</FormLabel>
            <FormControl
              type="password"
              maxLength={40}
              value={credentials.confirmPassw}
              onChange={(event) =>
                setCredentials({ ...credentials, confirmPassw: event.target.value })
              }
            />
          </FormGroup>

          <div className="d-grid gap-2 mb-3">
            <Button
              disabled={!validateForm()}
              className="shadow-none rounded-pill"
              type="submit"
            >
              {state.loading ? <Spinner animation="border" size="sm" /> : "Rekisteröidy"}
            </Button>
          </div>

          <small>
            Onko sinulla jo tili ? <Link to="/kirjaudu">Kirjaudu sisään</Link>
          </small>
        </Form>
      </div>
    );
}

export default Signup;
import { useContext, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Form, Spinner, Modal, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/Login.module.css";
import ContextProvider from "../store/context-reducer";
import { signinUser } from "../store/actions";
import { resetPasswordRequest } from "../util/api";
import messages from "../util/messages";


const Login = (props) => {
  const {state, dispatch} = useContext(ContextProvider);
  const [user, setUser] = useState("");
  const [passw, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    return user.length > 0 && passw.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      email: user,
      password: passw,
    };

    signinUser(credentials, dispatch);
  };

  const handleResetSubmit = (event) => {
    event.preventDefault();
    resetPasswordRequest(event.target.email.value);
    setShowModal(false)
  };

  const ResetPasswordModal = () => (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      centered
    >
      <Modal.Body>
        <h3 className="text-center">{messages.forgotPassword}</h3>
        <p className="text-center">
          {messages.requestPasswordChangeLink}
        </p>
        <Form onSubmit={handleResetSubmit}>
          <Row
            xs="auto"
            sm="auto"
            className="justify-content-center mt-4 align-items-center"
          >
            <Col>{messages.emailAccountId}</Col>
            <Col xs={10} sm={5} className="px-0">
              <FormControl
                placeholder="matti.meikäläinen@example.com"
                autoFocus={false}
                type="email"
                name="email"
                required
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              variant="success"
              type="submit"
              className="rounded-pill mt-3"
            >
              {messages.sendPasswordChangeLink}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          {messages.cancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className={styles.login}>
      <ResetPasswordModal />
      <Form
        onSubmit={handleSubmit}
        className="bg-white border rounded shadow-sm p-3"
      >
        <h4>Sisäänkirjautuminen</h4>
        <FormGroup className="mb-3 mt-2" controlId="user">
          <FormLabel className="text-secondary mb-1">
            {messages.email}
          </FormLabel>
          <FormControl
            autoFocus={false}
            type="email"
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </FormGroup>

        <FormGroup className="mb-1" controlId="password">
          <FormLabel className="text-secondary mb-1">
            {messages.password}
          </FormLabel>
          <FormControl
            value={passw}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
          />
        </FormGroup>

        <Button
          className="mb-3 p-0 shadow-none"
          variant="link"
          onClick={() => setShowModal(true)}
        >
          <small>{messages.forgotPasswordQuestion}</small>
        </Button>

        <div className="d-grid gap-2 mb-3">
          <Button
            disabled={!validateForm()}
            type="submit"
            className="shadow-none rounded-pill"
          >
            {state.loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              messages.login
            )}
          </Button>
        </div>

        <small className="d-flex justify-content-center my-1">
          <Link to="/rekisteroidy">{messages.signup}</Link>
        </small>
      </Form>
    </div>
  );
};

  export default Login;
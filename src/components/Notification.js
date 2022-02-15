import { useContext } from "react";
import { Alert } from "react-bootstrap";
import ContextProvider from '../store/context-reducer';


const Notification = () => {
  const {state, dispatch} = useContext(ContextProvider);
  const {message, type} = state.notification;

  const closeNotification = () => {
    dispatch({ type: "NOTIFY", payload: {msg: null, type: type} });
  };

  return (
    <div style={{/*position:"absolute",*/ width:"100%"}} className="px-1">
    <Alert
      show={message ? true : false}
      variant={type ? type : "danger"}
      style={{maxWidth: "52rem"}}
      className="d-flex justify-content-center my-1 mx-auto p-2"
    >
      <strong className="mx-auto ps-4">{message}</strong>
      <button
        type="button"
        className="btn-close justify-content-end px-2 shadow-none"
        onClick={closeNotification}
      />
    </Alert>
    </div>
  );
};

export default Notification;
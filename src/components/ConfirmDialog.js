import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import messages from "../util/messages";

const ConfirmDialog = ({ isDialogOpen = false, dialogProps, closeDialog }) => {
  const [isConfirmTextValid, setConfirmValid] = useState(false);
  const {
    confirmDeletion = false,
    message = messages.submitTreatmentForm,
    okBtnLabel = messages.submit,
  } = dialogProps;

  const handleConfirmTextChange = (event) => {
    if (event.target.value === messages.deleteCapitalized)
      return setConfirmValid(true);
    setConfirmValid(false);
  };

  const handleConfirm = () => {
    setConfirmValid(false);
    closeDialog();
    dialogProps.onOkButtonClick();
  };

  const handleCloseDialog = () => {
    setConfirmValid(false);
    closeDialog();
  };

  if (!isDialogOpen) return null;

  return (
    <Modal show={isDialogOpen} onHide={handleCloseDialog} size="sm" centered>
      <Modal.Body className="my-0">
        <p className="text-center mb-2 mt-3">{message}</p>
        {confirmDeletion && (
          <input
            type="text"
            placeholder={messages.deleteCapitalized}
            onChange={handleConfirmTextChange}
            className={`form-control ${
              !isConfirmTextValid ? "is-invalid" : "is-valid"
            }`}
          />
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button
          disabled={confirmDeletion && !isConfirmTextValid}
          variant="success"
          onClick={handleConfirm}
        >
          {okBtnLabel}
        </Button>
        <Button variant="secondary" onClick={handleCloseDialog}>
          {messages.cancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
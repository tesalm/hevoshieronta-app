import React, { PureComponent } from "react";
import { render } from "react-dom";
import { Button, Modal } from "react-bootstrap";

let resolve;
const defaultProps = {
  message: "Lähetä hoitolomake?",
  btnLabel: "Lähetä",
  confDeletion: false
};

class Confirm extends PureComponent {
  static create() {
    const containerElement = document.createElement("div");
    document.body.appendChild(containerElement);
    return render(<Confirm/>, containerElement);
  }

  constructor() {
    super();
    this.state = {
      confirmText: "",
      valid: false,
      isOpen: false,
      showConfirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleConfTextChange = this.handleConfTextChange.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    const { showConfirmProps, confirmText } = this.state;
    if (showConfirmProps.confDeletion && confirmText !== "POISTA") return;
    this.setState({ isOpen: false });
    resolve(true);
  }

  handleConfTextChange(event) {
    if (event.target.value === "POISTA")
      return this.setState({confirmText: event.target.value, valid: true});
    this.setState({confirmText: event.target.value, valid: false});
  }

  show(props = {}) {
    const showConfirmProps = { ...defaultProps, ...props };
    this.setState({ isOpen: true, showConfirmProps, confirmText: "", valid: false });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps, valid } = this.state;
    const { message, btnLabel, confDeletion, ...rest } = showConfirmProps;
    return (
      <Modal show={isOpen} onHide={this.handleCancel} size="sm" centered>
        <Modal.Body className="my-0">
          <p className="text-center mb-2 mt-3">{message}</p>
          {confDeletion && (
            <input
              type="text"
              placeholder="POISTA"
              onChange={this.handleConfTextChange}
              className={`form-control ${!valid ? "is-invalid" : "is-valid"}`} >
            </input>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="success rounded-0" onClick={this.handleConfirm}>{btnLabel}</Button>
          <Button variant="secondary rounded-0" onClick={this.handleCancel}>Peruuta</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Confirm;
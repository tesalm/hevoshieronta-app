import React, { PureComponent } from "react";
import { render } from "react-dom";
import { Button, Modal } from "react-bootstrap";

let resolve;
const defaultProps = {
  message: "Lähetä hoitolomake?",
  btnLabel: "Lähetä"
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
      isOpen: false,
      showConfirmProps: {},
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.show = this.show.bind(this);
  }

  handleCancel() {
    this.setState({ isOpen: false });
    resolve(false);
  }

  handleConfirm() {
    this.setState({ isOpen: false });
    resolve(true);
  }

  show(props = {}) {
    const showConfirmProps = { ...props };
    this.setState({ isOpen: true, showConfirmProps });
    return new Promise((res) => {
      resolve = res;
    });
  }

  render() {
    const { isOpen, showConfirmProps } = this.state;
    const { message, btnLabel, ...rest } = showConfirmProps;
    return (
      <Modal
        show={isOpen}
        onHide={this.handleCancel}
        size="sm"
        centered
      >
      <Modal.Body className="my-0">
        <p className="text-center mb-2 mt-3">{message || defaultProps.message}</p>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="success rounded-0" onClick={this.handleConfirm}>{btnLabel || defaultProps.btnLabel}</Button>
        <Button variant="secondary rounded-0" onClick={this.handleCancel}>Peruuta</Button>
      </Modal.Footer>
    </Modal>
    );
  }
}

export default Confirm;
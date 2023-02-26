import React, { Component } from "react";
import Modal from "../../components/ui/modal";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: "",
  };

  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
      errorMessage: error.message,
    });
  };

  modalClose = () => {
    this.setState({
      hasError: false,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Modal type="error" closeModal={this.modalClose} />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

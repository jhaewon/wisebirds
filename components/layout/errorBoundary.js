import React, { Component } from "react";
import ErrorAlert from "../ui/errorAlert";

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

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <ErrorAlert />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Alert from "./alert";
import { closeAlert } from "./alert.stories";

describe("test Alert component", () => {
  afterEach(cleanup);
  it("should render the correct default alert", () => {
    const wrapper = render(<Alert title="default alert"></Alert>);
    const titleElement = wrapper.getByText("default alert");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("SPAN");
    const alertElement = wrapper.getByTestId("test-alert");
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass("alert alert-default");
    const closeElement = wrapper.getByTestId("test-alert-icon");
    expect(closeElement).toBeInTheDocument();
    expect(closeElement).toHaveClass("close");
    expect(closeElement.tagName).toBe("SPAN");
  });
  it("should render correct alert component to call onClose function props", () => {
    const fn = jest.fn();
    const wrapper = render(<Alert onClose={fn} title="alert title" />);
    const closeElement = wrapper.getByTestId("test-alert-icon");
    expect(closeElement).toBeInTheDocument();
    fireEvent.click(closeElement);
    expect(fn).toHaveBeenCalled();
  });
  it("should render correct alert component prop isClose is false", () => {
    const fn = jest.fn();
    const wrapper = render(
      <Alert isClose={false} onClose={fn} title="alert title" />
    );
    const closeElement = wrapper.getByTestId("test-alert");
    expect(closeElement).toBeInTheDocument();

    try {
      fireEvent.click(closeElement);
    } catch (error) {
      expect(fn).not.toHaveBeenCalled();
    }
  });
  it("should render correct alert component based on different props", () => {
    const wrapper = render(<Alert title="alert title">alert message</Alert>);
    const titleElement = wrapper.getByText("alert title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H3");
    cleanup();
    const wrapper2 = render(
      <Alert type="success" title="alert title">
        alert message
      </Alert>
    );
    const alertElement = wrapper2.getByTestId("test-alert");
    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass("alert alert-success");
  });
});

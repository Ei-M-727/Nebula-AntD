import React from "react";
import {
  fireEvent,
  getByPlaceholderText,
  queryByText,
  render,
} from "@testing-library/react";
import { Input, InputProps } from "./input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};

describe("test input component", () => {
  it("should render the correct default Input ", () => {
    const wrapper = render(<Input {...defaultProps}></Input>);
    const testNode = wrapper.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument;
    expect(testNode).toHaveClass("nebula-input-inner");
    fireEvent.change(testNode, { target: { value: "23" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual("23");
  });
  it("should render the disabled Input on disabled property", () => {
    const wrapper = render(<Input disabled placeholder="disabled"></Input>);
    const testNode = wrapper.getByPlaceholderText(
      "disabled"
    ) as HTMLInputElement;
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render different input sizes on size property", () => {
    const wrapper = render(<Input placeholder="size" size="lg"></Input>);
    const testContainer = wrapper.container.querySelector(
      ".nebula-input-wrapper"
    );
    expect(testContainer).toHaveClass("input-size-lg");
  });
  it("should render prepand and append element on prepand/append property", () => {
    const { container, queryByText } = render(
      <Input prepend="http://" placeholder="pend" append=".com"></Input>
    );
    const testContainer = container.querySelector(".nebula-input-wrapper");
    expect(testContainer).toHaveClass(
      "input-group input-group-prepend  input-group-append"
    );
    expect(queryByText("http://")).toBeInTheDocument();
    expect(queryByText(".com")).toBeInTheDocument();
  });
});

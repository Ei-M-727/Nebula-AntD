import { fireEvent, render } from "@testing-library/react";
import { Input, InputProps } from "./input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};

describe("test input component", () => {
  it("should render the correct default Input", () => {
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
  /**
   * wrapper（在 Enzyme 中）是一个包含了组件树引用的对象，允许你进行各种查询和操作。
   * wrapper.container是一个 DOM 元素，你可以使用原生 DOM API（如 querySelector）来查询这个容器内的元素。
   */
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

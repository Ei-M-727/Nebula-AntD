import React from "react";
import { config } from "react-transition-group";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import {
  AutoComplete,
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";

//因为react-transition-group的动画它是一个异步的 添加这个变量可以全局的设置，这样所有的异步都会变成同步
config.disabled = true;
jest.mock("../Icon/icon", () => {
  return (props: any) => {
    return <span onClick={props.onClick}>{props.icon}</span>;
  };
});

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];
const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{
    value: string;
    number: number;
  }>;
  return <>name: {itemWithNumber.value}</>;
};

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};
const testPropsWithCustomRender: AutoCompleteProps = {
  ...testProps,
  placeholder: "auto-complete-2",
  renderOption,
};
let wrapper: RenderResult, inputNode: HTMLInputElement;

describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps}></AutoComplete>);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });
  it("test basic AutoComplete behavior", async () => {
    //input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(async () => {
      expect(wrapper.getByText("ab")).toBeInTheDocument();
    });

    expect(
      wrapper.container.querySelectorAll(".suggestion-item").length
    ).toEqual(2);
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("ab");
  });
  it("should provide keyboard support", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");
    //down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("is-active");
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass("is-active");
    //up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("is-active");
    //enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("click outside should hide the dropdown", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });
  it("renderOption should generate the right template", () => {});
  it("async fetchSuggestions should works fine", () => {});
});

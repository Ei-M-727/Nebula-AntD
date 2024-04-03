import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import Select, { SelectProps, SelectData } from "./select";
import { config } from "react-transition-group";
config.disabled = true; // 关闭动画的异步

const testData: SelectData[] = [
  {
    label: "label-1",
    value: "value1",
  },
  {
    label: "label-2",
    value: "value2",
    disabled: true,
  },
  {
    label: "label-3",
    value: "value3",
    disabled: true,
  },
  {
    label: "label-4",
    value: "value4",
  },
  {
    label: "label-5",
    value: "value5",
  },
];

const TestDefaultSelectProps: SelectProps = {
  data: testData,
  placeholder: "test select",
  onChange: jest.fn(),
  onVisibleChange: jest.fn(),
};

const TestMultipleSelectProps: SelectProps = {
  mode: "multiple",
  ...TestDefaultSelectProps,
};

const generateSlect = (props: SelectProps) => {
  return <Select {...props} />;
};

describe("test Select component", () => {
  let wrapper: RenderResult;
  let inputElement: HTMLInputElement;
  beforeEach(() => {
    wrapper = render(generateSlect(TestDefaultSelectProps));

    inputElement = wrapper.getByPlaceholderText(
      "test select"
    ) as HTMLInputElement;
  });
  it("test click input to show select options", () => {
    expect(inputElement).toBeInTheDocument();
    fireEvent.click(inputElement);
    expect(TestDefaultSelectProps.onVisibleChange).toHaveBeenCalledWith(true);
    expect(wrapper.container.querySelectorAll(":scope ul>li").length).toBe(5);
    const label1 = wrapper.getByText("label-1");
    expect(label1).toBeInTheDocument();
    expect(label1).toHaveClass("select-item");
    expect(label1).not.toHaveClass("is-active");
    expect(label1).not.toHaveClass("is-disabled");
    expect(label1).not.toHaveClass("is-hightlight");
    expect(wrapper.getByText("label-2")).toHaveClass("is-disabled");
    expect(wrapper.getByText("label-3")).toHaveClass("is-disabled");
    fireEvent.click(label1);
    expect(inputElement as HTMLInputElement).toHaveValue("label-1");

    expect(TestDefaultSelectProps.onChange).toHaveBeenCalledWith([0]);
  });
  it("test click input and keydown to show select options", () => {
    fireEvent.click(inputElement);
    fireEvent.keyDown(inputElement, { keyCode: 40 });
    const label1 = wrapper.getByText("label-1");
    expect(label1).toHaveClass("select-item item-highlighted");

    fireEvent.keyDown(inputElement, { keyCode: 40 });
    expect(wrapper.getByText("label-4")).toHaveClass(
      "select-item item-highlighted"
    );
    expect(label1).not.toHaveClass("select-item item-highlighted");

    fireEvent.keyDown(inputElement, { keyCode: 38 });
    expect(label1).toHaveClass("select-item item-highlighted");
    expect(wrapper.getByText("label-4")).not.toHaveClass(
      "select-item item-highlighted"
    );

    fireEvent.keyDown(inputElement, { keyCode: 38 });
    expect(label1).toHaveClass("select-item item-highlighted");

    fireEvent.keyDown(inputElement, { keyCode: 13 });
    expect(inputElement as HTMLInputElement).toHaveValue("label-1");
    expect(label1).toHaveClass("select-item item-highlighted");
    expect(TestDefaultSelectProps.onVisibleChange).toHaveBeenCalledWith(false);
    expect(TestDefaultSelectProps.onChange).toHaveBeenCalledWith([0]);
    expect(label1).not.toBeInTheDocument();
    fireEvent.keyDown(inputElement, { keyCode: 40 });
    expect(label1).toHaveClass("select-item item-highlighted");

    fireEvent.keyDown(inputElement, { keyCode: 27 });
    expect(TestDefaultSelectProps.onVisibleChange).toHaveBeenCalledWith(false);
    expect(label1).not.toBeInTheDocument();
  });
  it("test double click input to clear input value ", () => {
    fireEvent.click(inputElement);
    fireEvent.click(wrapper.getByText("label-1") as HTMLLIElement);
    expect(inputElement as HTMLInputElement).toHaveValue("label-1");

    fireEvent.click(inputElement);
    fireEvent.click(wrapper.getByText("label-1"));
    expect(inputElement as HTMLInputElement).toHaveValue("");
  });
  it("test default select to have value ", () => {
    cleanup();
    wrapper = render(
      generateSlect({ ...TestDefaultSelectProps, defaultSelect: ["value1"] })
    );
    fireEvent.click(wrapper.getByPlaceholderText("test select"));

    expect(wrapper.getByText("label-1")).toHaveClass("select-item  is-active");
  });

  it("test multiple select to  render correct options ", () => {
    cleanup();
    wrapper = render(generateSlect(TestMultipleSelectProps));
    inputElement = wrapper.getByPlaceholderText(
      "test select"
    ) as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    fireEvent.click(inputElement);

    fireEvent.click(wrapper.getByText("label-1"));
    expect(inputElement as HTMLInputElement).toHaveValue("label-1");

    fireEvent.click(inputElement);
    fireEvent.click(wrapper.getByText("label-4"));
    expect(inputElement as HTMLInputElement).toHaveValue("label-1,label-4");

    fireEvent.click(inputElement);
    fireEvent.click(wrapper.getByText("label-5"));
    expect(inputElement as HTMLInputElement).toHaveValue(
      "label-1,label-4,label-5"
    );
    fireEvent.click(inputElement);
    fireEvent.click(wrapper.getByText("label-5"));
    expect(inputElement).toHaveValue("label-5");
  });
});

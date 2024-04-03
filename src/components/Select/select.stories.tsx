import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Select, { SelectData } from "./select";

const data: SelectData[] = [
  {
    label: "选中",
    value: "值",
  },
  {
    label: "选中22",
    value: "值2",
    disabled: true,
  },
  {
    label: "选中2222",
    value: "值21",
    disabled: true,
  },
  {
    label: "选中3",
    value: "值3",
  },
  {
    label: "选中4",
    value: "值4",
  },
  {
    label: "选中5",
    value: "值5",
  },
  {
    label: "选中6",
    value: "值6",
  },
  {
    label: "选中7",
    value: "值7",
  },
];

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Select>;

export const DefaultSelect: Story = {
  render: function Render(args) {
    return (
      <>
        <span>默认</span>
        <Select
          data={data.filter((item) => !item.disabled)}
          placeholder="default Select Component"
          onVisibleChange={action("isVisible")}
          onChange={action("change select")}
        />
        <span>选项禁用</span>
        <Select
          data={data}
          placeholder="default disabled Select Item"
          onVisibleChange={action("isVisible")}
          onChange={action("change select")}
        />
      </>
    );
  },
};

DefaultSelect.storyName = "默认Select";

export const MultipleSelect: Story = {
  render: function Render(args) {
    return (
      <Select
        data={data}
        mode="multiple"
        defaultSelect={["值", "值3"]}
        placeholder="multiple Select Component"
      />
    );
  },
};

MultipleSelect.storyName = "多选Select";

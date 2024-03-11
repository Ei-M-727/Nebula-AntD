import React, { useState } from "react";
import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Input from "./input";
import Icon from "../Icon/icon";

const meta: Meta<typeof Input> = {
  title: "Input Component",
  component: Input,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const DefaultInput: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>("");

    return (
      <>
        <Input onChange={action("change input")} placeholder="DefaultInput" />
        <Input disabled placeholder="disabled" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="input"
        />
      </>
    );
  },
};

DefaultInput.storyName = "默认Input";

export const IconInput: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>("");

    return (
      <>
        <Input
          icon="user"
          onChange={action("change input")}
          placeholder="user icon input"
        />
        <Input icon="file" placeholder="file icon input" />
      </>
    );
  },
};

IconInput.storyName = "图标Input";

export const prependOrAppendInput: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>("");

    return (
      <>
        <Input append=".com" placeholder="please enter website url" />
        <Input append={<Icon icon="search" />} placeholder="search content" />
        <Input prepend="https://" placeholder="please enter url" />
        <Input
          prepend={<Icon icon="icons" />}
          placeholder="please enter content"
        />
      </>
    );
  },
};

prependOrAppendInput.storyName = "前后缀Input";

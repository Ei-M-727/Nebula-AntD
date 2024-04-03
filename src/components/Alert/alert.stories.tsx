import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Alert from "./alert";

const meta: Meta<typeof Alert> = {
  title: "Alert",
  component: Alert,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const defaultAlert: Story = {
  render: function (args) {
    return (
      <Alert
        {...args}
        title="default alert"
        onClose={action("close alert")}
      ></Alert>
    );
  },
};

defaultAlert.storyName = "默认alert";

export const typeAlert: Story = {
  render: function (args) {
    return (
      <>
        <Alert {...args} type="default" title="default alert"></Alert>
        <Alert {...args} type="success" title="success alert"></Alert>
        <Alert {...args} type="danger" title="danger alert"></Alert>
        <Alert {...args} type="warning" title="warning alert"></Alert>
        <Alert {...args} isClose={false} title="no close alert"></Alert>
      </>
    );
  },
};
typeAlert.storyName = "不同类型alert";

export const closeAlert: Story = {
  render: function (args) {
    return (
      <Alert
        {...args}
        type="success"
        title="close alert"
        onClose={action("close alert")}
      ></Alert>
    );
  },
};

closeAlert.storyName = "可关闭alert";

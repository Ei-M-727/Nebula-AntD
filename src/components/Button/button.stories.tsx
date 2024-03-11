import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button, ButtonProps } from "./button";

const meta: Meta<typeof Button> = {
  title: "Button Component",
  tags: ["autodocs"],
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button onClick={action("clicked")}>default button</Button>,
};

Default.storyName = "默认Button";

export const ButtonWithSize: Story = {
  render: function Render(args) {
    return (
      <>
        <Button size="lg">lg button</Button>
        <Button size="sm">sm button</Button>
      </>
    );
  },
};

ButtonWithSize.storyName = "不同尺寸的Button";

export const ButtonWithType: Story = {
  render: function Render(args) {
    return (
      <>
        <Button btnType="primary">primary button</Button>
        <Button btnType="danger">danger button</Button>
        <Button btnType="link" href="www.baidu.com">
          link button
        </Button>
      </>
    );
  },
};
ButtonWithType.storyName = "不同类型的Button";

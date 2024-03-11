import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Progress from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Progress  Component",
  component: Progress,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const DefaultProgress: Story = {
  render: function Render(args) {
    return (
      <>
        <Progress percent={10} showText={false} theme="success" />
        <br />
        <Progress percent={30} showText={true} theme="info" />
        <br />
        <Progress percent={50} showText={true} theme="danger" />
        <br />
        <Progress percent={70} showText={true} theme="dark" />
        <br />
        <Progress
          percent={90}
          showText={true}
          strokeHeight={12}
          theme="warning"
        />
      </>
    );
  },
};

DefaultProgress.storyName = "默认progress";

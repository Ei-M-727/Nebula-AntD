import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Icon from "./icon";

const meta: Meta<typeof Icon> = {
  title: "Icon Component",
  component: Icon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const DefaultIcon: Story = {
  render: function Render(args) {
    return (
      <>
        <Icon icon="times" />
        <Icon icon="ad" />
        <Icon icon="toggle-on" />
        <Icon icon="upload" />
        <Icon icon="users" />
        <Icon icon="trash" />
        <Icon icon="tv" />
        <Icon icon="wifi" />
        <Icon icon="user" />
      </>
    );
  },
};

DefaultIcon.storyName = "默认Icon";

export const SizeIcon: Story = {
  render: function Render(args) {
    return (
      <>
        <Icon size="1x" icon="times" />
        <Icon size="2x" icon="ad" />
        <Icon size="3x" icon="toggle-on" />
        <Icon size="4x" icon="upload" />
        <Icon size="5x" icon="users" />
        <Icon size="lg" icon="trash" />
        <Icon size="sm" icon="tv" />
        <Icon size="xs" icon="wifi" />
      </>
    );
  },
};

SizeIcon.storyName = "不同大小的Icon";

export const ThemeIcon: Story = {
  render: function Render(args) {
    return (
      <>
        <Icon theme="primary" size="2x" icon="times" />
        <Icon theme="secondary" size="2x" icon="ad" />
        <Icon theme="success" size="2x" icon="toggle-on" />
        <Icon theme="info" size="2x" icon="upload" />
        <Icon theme="warning" size="2x" icon="users" />
        <Icon theme="danger" size="2x" icon="trash" />
        <Icon theme="light" size="2x" icon="tv" />
        <Icon theme="dark" size="2x" icon="wifi" />
      </>
    );
  },
};

ThemeIcon.storyName = "不同主题的Icon";

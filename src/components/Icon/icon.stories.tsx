import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import Icon from "./icon";

/**
 * StoryFn 是一个函数类型，它接受一个参数（通常是 args）并返回一个 React 元素。
 * 这个函数通常用于渲染组件，并且可以通过 .bind({}) 方法来创建不同的故事实例，每个实例具有不同的参数。
 *const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

// 使用 Template 来创建不同的故事
export const Primary = Template.bind({});
Primary.args = { label: 'Primary', ... };

export const Secondary = Template.bind({});
Secondary.args = { label: 'Secondary', ... };
 */

// Meta 类型用于描述组件故事的元信息。这通常包括组件的名称、描述、参数（props）的类型和默认值等。
const meta: Meta<typeof Icon> = {
  title: "Icon Component",
  component: Icon,
  tags: ["autodocs"],
};
export default meta;

/**
 * StoryObj 是一个对象，它定义了组件故事的一个具体实例。它通常包含了一些参数（props），这些参数会被传递给组件来渲染不同的状态。
 *const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary: StoryObj<ButtonProps> = Template.bind({});
Primary.args = {
  label: 'Primary Button',
  // 其他 props...
};
 */
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

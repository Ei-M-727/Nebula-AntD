import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Tabs from "./tabs";
import Icon from "../Icon";

const meta: Meta<typeof Tabs> = {
  title: "Tabs",
  component: Tabs,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const DefaultTabs: Story = {
  render: function Render(args) {
    return (
      <Tabs onSelect={action(`current index change`)}>
        <Tabs.Item label="选项卡-1">this is tabs one</Tabs.Item>
        <Tabs.Item label="选项卡-2">this is tabs two</Tabs.Item>
        <Tabs.Item label="选项卡-3">this is tabs three</Tabs.Item>
      </Tabs>
    );
  },
};
DefaultTabs.storyName = "默认Tabs";

export const DisabledTabs: Story = {
  render: function Render(args) {
    return (
      <Tabs onSelect={function noRefCheck() {}} mode="card">
        <Tabs.Item label="card1">this is card one</Tabs.Item>
        <Tabs.Item label="card2">this is content two</Tabs.Item>
        <Tabs.Item disabled label="disabled">
          this is content three
        </Tabs.Item>
      </Tabs>
    );
  },
};

DisabledTabs.storyName = "禁用Tabs";

export const DifferentTabs: Story = {
  render: function Render(args) {
    return (
      <Tabs onSelect={action(`current index change`)}>
        <Tabs.Item label="选项卡-1">this is tabs one</Tabs.Item>
        <Tabs.Item label="选项卡-2(disabled)" disabled>
          this is tabs two
        </Tabs.Item>
        <Tabs.Item label={<code>custom label</code>}>
          this is custom TabItem Component the label props，use code tag.
        </Tabs.Item>
      </Tabs>
    );
  },
};

DifferentTabs.storyName = "不同类型Tabs";

export const IconTabs: Story = {
  render: function Render(args) {
    return (
      <Tabs onSelect={function noRefCheck() {}} mode="card">
        <Tabs.Item
          label={
            <>
              <Icon icon="check-circle" />
              自定义图标
            </>
          }
        >
          this is card one
        </Tabs.Item>
        <Tabs.Item label="tab2">this is content two</Tabs.Item>
      </Tabs>
    );
  },
};

IconTabs.storyName = "图标Tabs";

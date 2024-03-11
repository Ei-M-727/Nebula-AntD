import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const meta: Meta<typeof Menu> = {
  title: "Menu Component",
  tags: ["autodocs"],
  component: Menu,
  args: {
    defaultIndex: "0",
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const DefaultHorizontalMenu: Story = {
  render: function Render(args) {
    return (
      <>
        <Menu {...args} onSelect={action("selected MenuItem Component index")}>
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <MenuItem disabled>cool link3</MenuItem>
        </Menu>
      </>
    );
  },
};
DefaultHorizontalMenu.storyName = "默认横向Menu";

export const DefaultVerticalMenu: Story = {
  render: function Render(args) {
    return (
      <>
        <Menu
          mode="vertical"
          {...args}
          onSelect={action("selected MenuItem Component index")}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <MenuItem disabled>cool link3</MenuItem>
        </Menu>
      </>
    );
  },
};
DefaultVerticalMenu.storyName = "默认纵向Menu";

export const HorizontalSubMenu: Story = {
  render: function Render(args) {
    return (
      <>
        <Menu {...args} onSelect={action("selected MenuItem Component index")}>
          <MenuItem>cool link</MenuItem>
          <SubMenu title="horizontal-menu-1">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>cool link2</MenuItem>
          <MenuItem disabled>cool link3</MenuItem>
        </Menu>
      </>
    );
  },
};
HorizontalSubMenu.storyName = "横向SubMenu";

export const VerticalSubMenu: Story = {
  render: function Render(args) {
    return (
      <>
        <Menu
          mode="vertical"
          {...args}
          onSelect={action("selected MenuItem Component index")}
        >
          <MenuItem>cool link</MenuItem>
          <SubMenu title="horizontal-menu-1">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>cool link2</MenuItem>
          <MenuItem disabled>cool link3</MenuItem>
        </Menu>
      </>
    );
  },
};
VerticalSubMenu.storyName = "纵向SubMenu";

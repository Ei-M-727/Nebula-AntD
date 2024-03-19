import { FC } from "react";
import Menu, { MenuProps } from "./menu";
import SubMenu, { SubMenuProps } from "./subMenu";
import MenuItem, { MenuItemProps } from "./menuItem";

/**
// * 定义组件类型
 * 这里定义了一个名为 IMenuComponent 的接口。
 * 这个接口表示一个函数组件，它接受 MenuProps 作为其属性，
 * 并且它还包含两个子组件：Item 和 SubMenu。
 * 这两个子组件分别是 MenuItem 和 SubMenu 类型的函数组件。
 */
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

/**
 //* 类型转换与增强
 * 这里，我们将 Menu 组件强制类型转换为 IMenuComponent 类型。
 * 这意味着我们现在可以像处理 IMenuComponent 类型的对象一样处理 TransMenu。
 */
const TransMenu = Menu as IMenuComponent;

/**
 //*为转换后的组件添加子组件 
 * 通过这两行代码，我们为 TransMenu 添加了 Item 和 SubMenu 属性，使其真正成为了一个包含子组件的菜单组件。
 */
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;

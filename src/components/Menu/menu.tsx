//createContext 透传属性
//Context 提供了一种在组件之间共享值的方式
import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type SelectCallback = (selectedIndex: string) => void;

type MenuMode = "horizontal" | "vertical";
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

//给子组件用
export const MenuContext = createContext<IMenuContext>({ index: "0" });

const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    defaultIndex,
    children,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("nebula-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const hanleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: hanleClick,
    mode,
    defaultOpenSubMenus,
  };
  /**
   * 这个函数的核心目的是遍历所有的子元素，检查每个子元素是否是 MenuItem 或 SubMenu 组件，
   * 并相应地处理它们。如果不是这两种组件，它会输出一个警告信息。
   */
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      //这行代码对 child 进行了类型断言，认为它是一个函数组件元素，其 props 的类型是 MenuItemProps。
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      //在 React 中，displayName 通常用于描述组件的名称，例如 "MenuItem" 或 "div"。
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        //使用 React.cloneElement 来克隆子元素，并为其添加一个新的 prop，名为 index，
        //其值为当前子元素在 children 数组中的索引（已转换为字符串）。
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };
  return (
    //data-testid="test-menu": 这是一个自定义数据属性，通常用于测试目的，
    <ul className={classes} style={style} data-testid="test-menu">
      {/* //这是 MenuContext 的一个提供者（Provider） */}
      {/* 这里将 passedContext 作为值传递给 MenuContext。
      这意味着任何在这个 MenuContext.Provider 
      下面的组件都可以通过 MenuContext 访问到这个 passedContext。 */}
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;

import React, { useContext } from "react"; //它允许你访问 React Context 的值，而无需明确地通过组件树逐层传递 props 或使用 <Consumer> 组件
/**
 * 当你使用 useContext 时，你告诉 React 你想要访问某个特定的 Context 对象。
 * React 将返回该 Context 对象的当前值。Context 对象通常由 React.createContext() 创建，
 * 并且它有一个 Provider 组件，该组件允许你更新 Context 中的值。
 */
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  //确定哪一项
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    /**
     * 在 handleClick 函数内部，首先进行条件判断：
     * 如果 context.onSelect 存在（即父组件提供了 onSelect 函数），disabled 为 false，
     * 并且 index 的类型是字符串，则执行下面的代码块。
     */
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export default MenuItem;

import React, { FunctionComponentElement, useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isOpend);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents =
    //clickEvents 会被赋值为一个对象，该对象有一个 onClick 属性，其值为 handleClick 函数。
    context.mode === "vertical" ? { onClick: handleClick } : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("menu-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      /**
       * 在 React 中，一个元素（例如通过 React.createElement 创建的元素）有一个 type 属性，
       * 这通常是一个 React 组件。displayName 是这个组件的显示名称，通常用于调试和错误消息。
       */
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;

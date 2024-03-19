import React from "react";
import classNames from "classnames";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

/**
 * 定义了一个名为 IconProps 的接口。这个接口扩展（extends）了 FontAwesomeIconProps 接口，并添加了一个新的可选属性 theme
 * extends FontAwesomeIconProps: 这表明 IconProps 接口继承了 FontAwesomeIconProps 接口的所有属性。
 * 换句话说，任何实现了 IconProps 的对象也必须满足 FontAwesomeIconProps 的所有要求。
 */
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = (props) => {
  //icon-primary

  const { className, theme, ...restProps } = props;
  const classes = classNames("nebula-icon", className, {
    /**
     * **[icon-${theme}]**： 这是一个使用模板字符串的表达式，它会根据 theme的值动态地生成一个字符串。
     * 如果theme是"dark"，那么键就是 "icon-dark"；如果 theme是"light"，那么键就是 "icon-light"`。
      : theme： 这个冒号后面的 theme 是对象的值。
      在这个上下文中，theme 的值实际上被用作一个布尔值来决定是否应该包含这个类名。
      如果 theme 的值是真值（truthy），那么对应的类名会被添加到生成的字符串中；如果 theme 的值是假值（falsy），则不会添加。
     */
    [`icon-${theme}`]: theme,
  });
  /**
   * <FontAwesomeIcon ...></FontAwesomeIcon>: 这是 FontAwesomeIcon 组件的使用。
   * FontAwesomeIcon 是一个来自 @fortawesome/react-fontawesome 库的组件，用于显示 Font Awesome 图标。
   * 它的属性与 FontAwesomeIconProps 接口中的属性完全相同。
   *
   */
  return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>;
};

export default Icon;

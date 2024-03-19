import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classNames from "classnames";

/**
 *AnchorHTMLAttributes 是一个类型，可以帮助你定义一个锚点（<a> 标签）的属性和行为，
 当你使用 AnchorHTMLAttributes 类型时，你实际上是在为 <a> 标签定义属性
 使用 AnchorHTMLAttributes 可以帮助你确保组件的属性与 HTML 标准一致
 */

// export enum ButtonSize {
//   Large = "lg",
//   Small = "sm",
// }

// export enum ButtonType {
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link",
// }

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
// & 运算符在 TypeScript 中用于组合多个类型。
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
/**
 * Partial<T> 是 TypeScript 的一个内置泛型工具类型，它将类型 T 的所有属性都变为可选。
 * 这意味着，如果一个对象符合 Partial<T> 类型，那么它可以不包含 T 类型中的任何属性。
 */
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, children, href, ...restProps } =
    props;

  // classNames 库来动态生成 HTML 元素的类名
  //第二个参数 className 是一个变量，它可能包含一个或多个额外的类名。
  //第三个参数是一个对象，它的键是潜在的类名，值是决定是否应该包含这个类名的条件。
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;

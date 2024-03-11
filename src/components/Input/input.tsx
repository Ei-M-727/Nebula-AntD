import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";
export interface InputProps
  //Omit 移除或者是忽略接口中的值 现在需要忽略的是size
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用Input */
  disabled?: boolean;
  /**设置 Input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement; //前缀
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement; //后缀
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
// 第一个问题 受控和非受控的情况 value 和defaultValue同时出现在组件中就会出现这种情况

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'nebula'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */

export const Input: FC<InputProps> = (props) => {
  //取出各种属性
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    children,
    style,
    ...restProps
  } = props;
  //根据属性计算不同的className
  const classes = classNames("nebula-input-wrapper", className, {
    "is-disabled": disabled,
    [`input-size-${size}`]: size,
    "input-group": prepend || append,
    "input-group-prepend": prepend,
    "input-group-append": append,
  });

  const fixControlledValues = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    } else {
      return value;
    }
  };
  if ("value" in props) {
    // 在default和value
    // 为了解决input初始值为undefined，这时input为非受控组件，后用onchange来修改输入框的值，此方法为受控组件
    // 组件正在由非受控转换为受控组件
    delete restProps.defaultValue;
    restProps.value = fixControlledValues(props.value);
  }

  return (
    //根据属性判断是否需要添加特定的节点
    <div className={classes} style={style}>
      {prepend && <div className="nebula-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`}></Icon>
        </div>
      )}
      <input
        disabled={disabled}
        {...restProps}
        className="nebula-input-inner"
      />
      {append && <div className="nebula-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;

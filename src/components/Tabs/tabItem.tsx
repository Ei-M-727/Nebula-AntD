import React, {
  useContext,
  useCallback,
  useMemo,
  useEffect,
  FC,
  ReactNode,
  CSSProperties,
  useState,
} from "react";
import classNames from "classnames";
import { TabsContext } from "./tabs";

export interface TabItemProps {
  /** 当前的index,用于是否被选中 */
  index?: string;
  /** 展示的label内容 是一个ReactNode */
  label?: ReactNode;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

export const TabItem: FC<TabItemProps> = (props) => {
  const { index, label, className, style, disabled, children, ...restprops } =
    props;

  const context = useContext(TabsContext);
  const isActive = useMemo(() => {
    return context.index === index;
  }, [index, context]);
  const handleClick = useCallback(() => {
    if (!disabled && index && !isActive) {
      context.onSelect(index);
    }
  }, [index, disabled, isActive, context]);

  const classess = classNames("tab-item", className, {
    "is-disabled": disabled,
    "is-active": isActive,
  });
  /**
   * useEffect 用于在组件渲染后执行某些副作用操作。副作用可能包括数据获取、订阅事件或手动更改 DOM。
   * 传递给 useEffect 的函数会在每次组件渲染后执行，但只有当依赖项数组中的任何一个值发生变化时，它才会重新运行。
   */
  useEffect(() => {
    /* 判断是否选中才渲染children，给父组件渲染 */
    isActive && context.renderChildren(<div>{children}</div>);
  }, [isActive, context, children]);

  return (
    <>
      <li className={classess} style={style} key={index} onClick={handleClick}>
        {label}
      </li>
    </>
  );
};
// 标识，如果没有这个标识就不渲染并且打印error信息
TabItem.displayName = "TabItem";

TabItem.defaultProps = {
  index: "0",
  disabled: false,
};

export default TabItem;

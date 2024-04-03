import React, {
  createContext,
  useState,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
  CSSProperties,
  memo,
} from "react";
import classNames from "classnames";
import TabItem, { TabItemProps } from "./tabItem";

/**
 * useMemo 是 React 中的一个自定义 Hook，用于优化计算密集型的操作或昂贵的函数调用。
 * 它接受一个计算函数和依赖项数组，并返回计算结果。与 useCallback 类似，
 * useMemo 只有在依赖项发生变化时才会重新计算结果，如果依赖项没有变化，它会复用上一次的计算结果。
 * 这有助于避免不必要的重复计算，从而提高应用程序的性能。
 */
type TabsMode = "tab" | "card";
type SelectCallback = (selectedIndex: string) => void;

export interface TabsProps {
  /** tab模式和card卡片模式 */
  mode?: TabsMode;
  /** 默认选中哪个tab */
  defaultIndex?: string;
  className?: string;
  style?: CSSProperties;
  onSelect?: SelectCallback;
  children?: ReactNode;
}

interface TabsProperties {
  /** 每个tab 组件 */
  Item: typeof TabItem;
}
interface ITabsContext {
  index: string; //代表当前选中的tab的索引。
  onSelect: SelectCallback;
  renderChildren: Dispatch<SetStateAction<ReactNode>>; //一个dispatch函数，用于更新React组件的状态，特别是关于子组件(children)的状态。
}

export const TabsContext = createContext<ITabsContext>({} as ITabsContext);

export const Tabs: FC<TabsProps> & TabsProperties = (props) => {
  const {
    mode,
    defaultIndex,
    className,
    style,
    onSelect,
    children,
    ...restprops
  } = props;
  const [currentIndex, setCurrentIndex] = useState<string>(defaultIndex!);
  //，而renderChildren被用作ITabsContext中renderChildren的setter函数。
  const [child, renderChildren] = useState<ReactNode>();

  const contextValue = useMemo<ITabsContext>(
    () => ({
      index: currentIndex,
      onSelect: (activeIndex: string) => {
        setCurrentIndex(activeIndex);
        onSelect && onSelect(activeIndex);
      },
      renderChildren,
    }),
    [currentIndex, onSelect]
  );
  //筛选后的children
  const selectedChildren = useMemo(
    () =>
      React.Children.map(children, (child, index) => {
        const childElement =
          child as React.FunctionComponentElement<TabItemProps>;
        const { displayName } = childElement.type;
        if (displayName === "TabItem") {
          return React.cloneElement(childElement, {
            index: index.toString(),
          });
        }
        console.error("Tabs has a chile which is not TabItem component");
      }),
    [children]
  );

  const classess = classNames("tabs", className, {
    "tabs-card": mode === "card",
  });
  return (
    /**
     * TabsContext 很可能是一个通过 React.createContext() 创建的Context对象。这个对象有两个主要部分：
     * 一个Provider组件和一个Consumer组件（或在函数组件中使用的useContext hook）。
     * `TabsContext.Provider`: 这是一个组件，它允许其子组件访问其`value`属性中的值。
     * `TabsContext.Consumer` 或 `useContext(TabsContext)`: 这些是用于从Context中读取值的组件或hook。
     */
    <>
      <ul
        className={classess}
        {...restprops}
        style={style}
        data-testid="test-tab-ul"
      >
        <TabsContext.Provider value={contextValue}>
          {selectedChildren}
        </TabsContext.Provider>
      </ul>
      <div>{child}</div>
    </>
  );
};
Tabs.Item = TabItem;

Tabs.defaultProps = {
  mode: "tab",
  defaultIndex: "0",
};

export default Tabs;

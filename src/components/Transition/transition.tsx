import React from "react";
/**
 *这行代码从 react-transition-group 库中导入了 CSSTransition 组件。
 CSSTransition 是一个 React 组件，它允许你在元素进入或离开 DOM 时应用 CSS 过渡效果。
 通常，你会将它与 CSS 类名一起使用，
 这些类名会在特定的过渡阶段（如“enter”、“enter-active”、“exit”和“exit-active”）被添加到元素上。
 */
import { CSSTransition } from "react-transition-group"; //*是一个用于在 React 中添加进入、离开和过渡动画的库。
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  children?: React.ReactNode;
  className?: String;
  wrapper?: boolean;
};

// interface TransitionProps extends CSSTransitionProps {
//   animation?: AnimationName;
//   children?: React.ReactNode;
//   classNames?: string;
// }

// interface TransitionProps extends CSSTransitionProps { animation?: AnimationName, wrapper?: boolean }
// type TransitionProps = CSSTransitionProps & { animation?: AnimationName, wrapper?: boolean }

const Transition: React.FC<TransitionProps> = (props) => {
  const { animation, classNames, children, wrapper, ...restProps } = props;

  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;

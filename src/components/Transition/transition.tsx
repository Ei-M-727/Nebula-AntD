import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import classNames from "classnames";

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
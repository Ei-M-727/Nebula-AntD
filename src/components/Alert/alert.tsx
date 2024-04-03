import { FC, useState, ReactNode, useRef, useCallback } from "react";
import classNames from "classnames";
import Icon from "../Icon";
import Transition from "../Transition";

type AlertType = "default" | "success" | "warning" | "danger";

interface AlertProps {
  title: string | ReactNode;
  type?: AlertType;
  isClose?: boolean;
  className?: string;
  children?: ReactNode;
  onClose?: (currentEvent: HTMLDivElement) => any;
}

export const Alert: FC<AlertProps> = (props) => {
  const { title, type, isClose, className, children, onClose, ...restprops } =
    props;
  const [show, setShow] = useState<boolean>(true);
  const alertRef = useRef<HTMLDivElement>();
  const classes = classNames("alert", className, {
    [`alert-${type}`]: type,
  });
  /**
   * useCallback 是 React 中的一个 Hook，它返回一个记忆化的回调函数，
   * 这意味着该函数在依赖项不变的情况下，会在多次渲染之间保持不变。
   * 这在性能优化和避免不必要的渲染时非常有用，特别是在子组件中使用回调函数作为 props 传递时。
   * 总结来说，useCallback 可以用于避免在父组件每次渲染时都创建新的回调函数，从而提高应用程序的性能。
   */
  const close = useCallback(() => {
    if (onClose) {
      onClose(alertRef.current!);
    }
    setShow(false);
  }, [onClose]);
  return (
    <>
      <Transition
        timeout={300}
        in={show}
        animation="zoom-in-left"
        data-testid="test-alert"
      >
        <div className={classes} {...restprops} ref={alertRef as any}>
          {children ? <h3>{title}</h3> : <span>{title}</span>}
          {children && <span>{children}</span>}
          {isClose && (
            <span
              className="close"
              onClick={close}
              data-testid="test-alert-icon"
            >
              <Icon icon="times" />
            </span>
          )}
        </div>
      </Transition>
    </>
  );
};
Alert.defaultProps = {
  type: "default",
  isClose: true,
};
export default Alert;

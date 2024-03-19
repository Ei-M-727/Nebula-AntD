import React, { FC, useState } from "react";
import classNames from "classnames";

type AlertType = "default" | "success" | "warning" | "dager";

interface AlertProps {
  message: string;
  type?: AlertType;
  isClose?: boolean;
  onClose?: () => void;
}

const Alert: FC<AlertProps> = (props) => {
  const { message, type, isClose, ...restprops } = props;
  const [show, setShow] = useState<boolean>(true);
  const classes = classNames("alert", classNames, {
    [`alert-${type}`]: type,
  });
  return (
    <>
      <div className={classes} {...restprops}>
        {message}
      </div>
    </>
  );
};

export default Alert;

import React, { FC, useState, DragEvent } from "react";
import classNames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: React.ReactNode;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const classes = classNames("nebula-uploader-dragger", {
    "is-dragover": dragOver,
  });

  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      // 当用户将某个元素（如链接、图片等）拖动到 div 上时触发。
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      // 当用户将正在拖动的元素移出 div 时触发。
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      //事件处理器在用户将拖动的元素在 div 上放下时触发。
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;

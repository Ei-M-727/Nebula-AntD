import React, { FC } from "react";
import { ThemeProps } from "../Icon/icon";

export interface ProgressProps {
  percent: number; //* `percent`：进度条的百分比，类型为数字。
  strokeHeight?: number; //* `strokeHeight`：进度条的高度，类型为数字，并且是可选的（由 `?` 标记表示）。
  showText?: boolean; //* `showText`：一个布尔值，表示是否显示进度文本，也是可选的。
  styles?: React.CSSProperties; //* `styles`：一个可选的 CSS 属性对象，允许用户自定义组件的样式。
  theme?: ThemeProps; //* `theme`：一个可选的主题属性，类型为 `ThemeProps`。
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, showText, strokeHeight, styles, theme } = props;

  return (
    <div className="nebula-progress-bar" style={styles}>
      <div
        className="nebula-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          //* `color-${theme}` 是一个动态类名，它会根据 `theme` 属性的值变化，从而改变进度条的颜色。
          className={`nebula-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;

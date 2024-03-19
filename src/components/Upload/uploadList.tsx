import { FC } from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}
export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="nebula-upload-list">
      {fileList.map((item) => {
        /**
         * 对于每个文件项 item，显示以下信息：
         *文件名：使用 span 元素显示文件名，并基于文件的状态（item.status）为其添加不同的类名。
         *文件图标：根据文件状态显示不同的图标，如上传中、成功或错误。
         *文件操作：显示一个删除图标，点击时会调用 onRemove 函数来移除该文件。
         *上传进度：如果文件正在上传中（item.status === "uploading"），则显示一个进度条。
         */
        return (
          <li className="nebula-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary"></Icon>
              {item.name}
            </span>
            <span className="file-status">
              {item.status === "uploading" && <Icon icon="spinner" spin />}
              {item.status === "success" && (
                <Icon icon="check-circle" theme="success" />
              )}
              {item.status === "error" && (
                <Icon icon="times-circle" theme="danger" />
              )}
            </span>
            <span className="file-actions">
              <Icon icon="times" onClick={() => onRemove(item)} />
            </span>
            {item.status === "uploading" && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;

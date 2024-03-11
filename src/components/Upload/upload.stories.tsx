import React, { useState } from "react";
import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Upload, { UploadFile } from "./upload";
import Button from "../Button/button";
import Icon from "../Icon/icon";

const meta: Meta<typeof Upload> = {
  title: "Upload COmponent",
  component: Upload,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Upload>;

export const CustomOptionsUpload: Story = {
  render: function Render(args) {
    const fileList: UploadFile[] = [
      {
        uid: Date.now().toString(),
        name: "test1.docx",
        size: 30000,
        status: "success",
      },
      {
        uid: Date.now().toString() + "333",
        name: "test4.docx",
        size: 50000,
        status: "uploading",
        percent: 30,
      },
      {
        uid: Date.now().toString() + "111",
        name: "test2.docx",
        size: 50000,
        status: "error",
      },
    ];
    return (
      <Upload
        action="https://d6hqs7.lafyun.com:443/upload"
        defaultFileList={fileList}
        onProgress={action("progress")}
        onSuccess={action("success")}
        onError={action("error")}
        onChange={action("change")}
      >
        <Button>upload file</Button>
      </Upload>
    );
  },
};

CustomOptionsUpload.storyName = "自定义Upload";

export const DefaultUpload: Story = {
  render: function Render(args) {
    return (
      <>
        <Upload
          action="https://d6hqs7.lafyun.com:443/upload"
          onProgress={action("progress")}
          onSuccess={action("success")}
          onError={action("error")}
          onChange={action("change")}
          onRemove={action("remove")}
        >
          <Button size="lg" btnType="primary">
            <Icon icon="upload" /> 点击上传
          </Button>
        </Upload>
      </>
    );
  },
};

DefaultUpload.storyName = "默认Upload";

export const DropUpload: Story = {
  render: function Render(args) {
    return (
      <>
        <Upload action="https://d6hqs7.lafyun.com:443/upload" drag={true}>
          <Icon icon="upload" size="4x" />
          <br />
          <br />
          <span>上传文件</span>
        </Upload>
      </>
    );
  },
};

DropUpload.storyName = "拖动上传Upload";

export const CycleLifeUpload: Story = {
  render: function Render(args) {
    const checkFileSize = (file: File) => {
      if (Math.round(file.size / 1024) > 50) {
        alert("file too big");
        return false;
      }
      return true;
    };
    return (
      <Upload
        action="https://jsonplaceholder.typicode.com/posts/"
        beforeUpload={checkFileSize}
        onProgress={action("progress")}
        onSuccess={action("success")}
        onError={action("error")}
        onChange={action("change")}
      >
        <Button>upload file</Button>
      </Upload>
    );
  },
};
CycleLifeUpload.storyName = "限制上传大小Upload";

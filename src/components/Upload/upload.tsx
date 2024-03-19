import React, { ChangeEvent, FC, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  uid: string; //文件的唯一标识符
  size: number; //文件的大小，
  name: string; //文件的名称。
  status?: UploadFileStatus; //文件上传的状态。
  percent?: number; //文件上传的进度百分比
  //保持原始文件信息
  raw?: File; //保持原始文件信息的属性。
  response?: any; //服务器对文件上传请求的响应
  error?: any; //如果在文件上传过程中发生错误，这个属性可能包含错误信息。
}

export interface UploadProps {
  action: string; //定义了上传文件的目标 URL。
  defaultFileList?: UploadFile[]; //初始的文件列表
  beforeUpload?: (file: File) => boolean | Promise<File>; //在文件上传之前调用的函数。它接收一个 File 对象作为参数，并可以返回一个布尔值或一个 Promise，
  onProgress?: (percentage: number, file: File) => void; //当文件上传进度更新时调用的函数。它接收两个参数：上传的百分比和一个 File 对象。
  onSuccess?: (data: any, file: File) => void; //当文件上传成功时调用的函数。它接收两个参数：服务器返回的任何数据和一个 File 对象。
  onError?: (data: any, file: File) => void; //当文件上传失败时调用的函数。它也接收服务器返回的任何数据和一个 File 对象作为参数。
  onChange?: (file: File) => void; //当文件列表发生变化时调用的函数。它接收一个 File 对象作为参数。
  onRemove?: (file: UploadFile) => void; //当从文件列表中移除一个文件时调用的函数。它接收一个 UploadFile 对象作为参数。
  headers?: { [key: string]: any }; //与服务器通信时使用的 HTTP 头部。
  name?: string; //文件字段的名称，
  data?: { [key: string]: any }; //发送到服务器的其他数据。
  withCredentials?: boolean; //是否应该发送跨站访问控制（CORS）凭证。
  accept?: string; //接受上传的文件类型。
  multiple?: boolean; //是否允许选择多个文件。
  children?: React.ReactNode; // React 组件的子元素。
  drag?: boolean; // 是否应该启用拖拽上传功能。
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onProgress,
    onError,
    onSuccess,
    beforeUpload,
    onChange,
    defaultFileList,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;

  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);

  //该函数用于更新一个文件列表
  const updateFileList = (
    //这是一个类型为 UploadFile 的参数，代表要更新的文件。
    updateFile: UploadFile,
    //当你对一个类型使用 Partial 时，它会将那个类型中的所有属性都变为可选的。
    updateObj: Partial<UploadFile>
    //这意味着你可以只提供 UploadFile 类型的部分属性来更新文件，而不是必须提供所有属性。
  ) => {
    //在 setFileList 的回调函数中，使用 map 方法遍历当前的文件列表 prevList。
    setFileList((prevList) => {
      return prevList.map((file) => {
        //对于列表中的每个文件 file，检查其 uid 是否与 updateFile 的 uid 相同。
        if (file.uid === updateFile.uid) {
          //如果 uid 相同，则使用 Object.assign() 方法创建一个新对象，
          //并将 updateFile 的属性与 updateObj 进行合并。
          //然后返回这个新对象。
          return { ...file, ...updateObj };
        } else {
          //如果 uid 不相同，则返回文件本身。
          return file;
        }
      });
    });
  };
  //这个函数的主要目的是触发一个文件输入（<input type="file" />）的点击事件
  const handleClick = () => {
    //fileInput.current 是整个dom节点 <input />
    //很多例子都是这么判断的然后用.current来调用dom方法
    if (fileInput.current) {
      /**
       * 如果 fileInput.current 存在（即，如果它已经被成功地绑定到了一个 DOM 元素），则执行花括号中的代码。
       * 我们可以使用 inputRef.current 来直接访问这个DOM元素，
       * 此时input的type是file 所以呈现的是一个选择文件的按钮 所以可以click
       */

      /**
       * 这一行调用 fileInput.current（
       * 即，<input type="file" /> DOM 元素）的 click() 方法。
       * 这会触发文件选择对话框，让用户可以选择一个文件。
       */
      fileInput.current.click();
    }
  };
  //文件变化的时候
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //从事件对象 e 的 target 属性中获取到触发事件的 DOM 元素（在这种情况下，应该是一个文件输入元素），
    //并从中取出 files 属性。files 是一个 FileList 对象，它包含了用户选择的所有文件。
    const files = e.target.files;
    if (!files) {
      return;
    }
    //调用 uploadFiles 函数，并将 files 作为参数传递
    uploadFiles(files);
    if (fileInput.current) {
      //如果 fileInput.current 存在，则将其 value 属性设置为空字符串。
      //这通常是为了清空文件输入框，以便用户可以选择新的文件。
      fileInput.current.value = "";
    }
  };

  const handleRemove = (file: UploadFile) => {
    //`setFileList` 可能是一个 React 的 state 更新函数，用于更新一个名为 `fileList` 的状态。
    /**
     * 它接受一个回调函数作为参数，这个回调函数接收当前的 `fileList`（我们在这里称之为 `prevList`）。
     * 使用 `filter` 方法从 `prevList` 中过滤出所有 `uid` 不等于传入的 `file.uid` 的文件。这意味着它会移除具有指定 `uid` 的文件。
     * `setFileList` 的新值将是不包含特定 `uid` 的文件列表。
     */
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  //该函数接受一个 FileList 类型的参数 files。FileList 是一个表示一组文件
  const uploadFiles = (files: FileList) => {
    //由于 FileList 不是一个真正的数组，但具有类似数组的属性（如 length 和索引），
    //所以这里使用 Array.from() 方法将其转换为真正的数组，以便后续可以使用数组的 forEach 方法。
    const postFiles = Array.from(files);
    //使用 forEach 方法遍历转换后的 postFiles 数组，每次迭代都会处理一个文件。
    postFiles.forEach((file) => {
      //在上传每个文件之前，都会检查是否存在 beforeUpload 函数。
      if (!beforeUpload) {
        //如果不存在（即 beforeUpload 为 undefined 或 null），则直接调用 post(file) 上传文件。
        post(file);
      } else {
        //如果 beforeUpload 函数存在，则会使用它来预处理文件。这个预处理函数可能执行一些检查、转换或其他操作，并返回一个结果。
        const result = beforeUpload(file);
        /**
         * 如果 `beforeUpload` 返回一个 `Promise` 对象，那么会等待这个 `Promise` 解析完成后再上传文件。
         * 这通常意味着 `beforeUpload` 可能是一个异步函数，需要一些时间来处理文件。
         */
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
          //如果 `beforeUpload` 返回一个非 `false` 的值，那么这个值可能是一个转换后的文件或某种信息，但无论如何，都会直接上传原始文件。
        } else if (result !== false) {
          post(file);
        }
        //如果 `beforeUpload` 返回 `false`，则不会上传该文件。
      }
    });
  };
  const post = (file: File) => {
    //定义了一个 UploadFile 类型的对象 _file
    let _file: UploadFile = {
      uid: Date.now() + "upload-file", //这是一个唯一标识符用于区分不同的文件上传实例。
      status: "ready", //表示文件上传的状态。在这里，它被设置为 "ready"，意味着文件已经准备好，但还没有开始上传。
      name: file.name, //是从传入的 file 对象中获取的 name 属性。这通常表示要上传的文件的名称。
      size: file.size, //是从传入的 file 对象中获取的 size 属性。这表示要上传的文件的大小，通常以字节为单位。
      percent: 0, //表示文件上传的进度。在这里，它被初始化为 0
      raw: file, //是 UploadFile 对象的一个属性，这里它被赋值为传入的 file 对象。这允许你在 _file 对象中直接访问原始文件对象，
    };
    // setFileList([_file, ...fileList]);
    /**
     * _file 被添加到文件列表的开头。这里使用了数组解构（...prevList）来保留原有的文件列表，并将新文件 _file 添加到列表的开头。
     * prevList 很可能代表 fileList 的前一个状态值。
     * 最终，这段代码创建了一个新的文件上传实例 _file，并将其添加到现有的文件列表 fileList 的开头，然后更新这个列表的状态。
     */
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    //主要功能是将数据添加到 FormData 对象中，通常用于发送表单数据或文件到服务器。
    //FormData 接口提供了一种表示表单数据（键值对）的方式，特别适用于使用 XMLHttpRequest 或 Fetch API 发送数据。
    const formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      //如果 data 存在，它将遍历 data 的所有键，并将这些键及其对应的值添加到 formData 对象中。
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        /**
         * * `action`: 这是请求的目标 URL。
         * `formData`: 这是要发送的数据，通常是一个 `FormData` 实例，用于上传文件。
         * `headers`: 设置请求的头部信息。这里使用了展开语法 (`...headers`) 来合并默认头部和特定的 `"Content-Type": "multipart/form-data"` 头部，后者是用于文件上传的。
         */
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        //  * `withCredentials`: 这是一个布尔值，如果为 `true`，则跨站点请求将包含凭证（如 cookies）。
        withCredentials,
        //* `onUploadProgress`: 这是一个回调函数，用于处理上传进度事件。
        onUploadProgress: (e: any) => {
          /**
           * 当文件上传过程中，这个回调函数会被调用。`e.loaded` 表示已上传的字节数，`e.total` 表示文件总字节数。
           * 计算上传的百分比，并四舍五入。
           * 如果上传还没有完成（即百分比小于 100%），则调用 `updateFileList` 函数更新文件列表的状态和百分比。同时，如果提供了 `onProgress` 回调，也调用它。
           */
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((res) => {
        console.log(res);
        updateFileList(_file, { status: "success", response: res.data });
        if (onSuccess) {
          onSuccess(res.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        console.error(err);
        updateFileList(_file, { status: "error", error: err });

        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };
  return (
    <div className="nebula-upload-component">
      <div
        className="nebula-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {/* 
        如果 drag 为 true，则显示一个 <Dragger> 组件，并传入一个回调函数 onFile
        ，当用户拖拽文件到 <Dragger> 上时，这个回调函数会被触发，并调用 uploadFiles(files) 函数。
        */}
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="nebula-file-input"
          style={{ display: "none" }}
          ref={fileInput}
          type="file"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      {/*
          总体来说，这个组件提供了两种文件上传的方式：通过拖拽（如果 drag 为 true）或点击隐藏的 <input> 元素。
          同时，它还显示了一个文件列表，用户可以从这个列表中移除已上传的文件。
          */}
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};

Upload.defaultProps = {
  name: "file",
};

export default Upload;

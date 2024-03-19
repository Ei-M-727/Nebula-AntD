import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      /**
       * React.RefObject 是一个特殊的对象，它包含一个名为 current 的属性，该属性用于存储对 DOM 元素或组件实例的引用。
       * event.target 属性指向了触发该事件的元素。
       * 例如，如果你有一个按钮，点击它会触发一个事件，那么 event.target 就会指向这个按钮元素。
       * 这行代码的目的是确定触发事件的元素（event.target）是否位于 ref.current 所引用的元素内部。
       */
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    // document.addEventListener("click", listener); 为全局文档添加了一个 click 事件监听器。
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;

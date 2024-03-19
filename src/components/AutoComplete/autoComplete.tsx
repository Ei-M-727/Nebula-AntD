import {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";

//适应更复杂的数据类型
interface DataSourceObject {
  value: string;
}
/**
 //* 泛型参数 T = {}: 
 * T 是一个泛型参数，它代表任何类型。
    = {} 表示如果在使用DataSourceType时没有提供T的类型，那么它的默认值将是一个空的对象类型。
    //*T & DataSourceObject:
    * T & DataSourceObject 表示将T与DataSourceObject合并，最终得到一个新类型。
 */
export type DataSourceType<T = {}> = T & DataSourceObject;

/**
 *这里使用了 extends 关键字来继承另一个接口（可能是 InputProps）的属性。
 同时，Omit 是一个 TypeScript 的工具类型，用于从原始类型（在这里是 InputProps）中排除某些属性。
 在这里，它排除了 onSelect 和 onChange 这两个属性。
 这意味着 AutoCompleteProps 会继承 InputProps 的所有属性，除了 onSelect 和 onChange。
 */
export interface AutoCompleteProps
  extends Omit<InputProps, "onSelect" | "onChange"> {
  /**
   * 这是一个函数，接收一个字符串参数 str，
   * 并返回一个 DataSourceType[] 数组或一个解析为 DataSourceType[] 的 Promise。
   * 这个函数的主要目的是基于输入的字符串 str 来获取建议或自动完成的选项。
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  onChange?: (value: string) => void;
  /**
   * 这是一个可选的函数，用于自定义如何渲染每个建议或自动完成的选项。
   * 它接收一个 DataSourceType 类型的参数 item，
   * 并返回一个 ReactElement，这是 React 组件的一个基本类型。
   */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    onChange,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string); //*当前输入框的值。
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]); //*根据输入值获取的建议列表。
  const [loading, setLoading] = useState(false); //*是否正在加载建议。
  const [highlightIndex, setHighlightIndex] = useState(-1); //*当前高亮显示的建议的索引。
  /**
   * 保持可变的值：虽然 useRef 主要用于访问 DOM 元素，
   * 但它的 .current 属性也可以用来存储一个可变的值，
   * 这个值不会在组件重新渲染时改变。
   * 这使得 useRef 在某些情况下比 useState 更适合，
   * 比如你想在回调中使用最新的值，但不想触发组件重新渲染。
   */
  const triggerSearch = useRef(false); //*一个引用，用于控制是否触发搜索。
  const componentRef = useRef<HTMLDivElement>(null); //*个引用，指向自动完成组件的DOM元素。

  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  //依赖于inputValue（即输入值的改变）而改变
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((value) => {
          setLoading(false);
          setSuggestions(value);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]);

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      //回车
      case 13:
        //刚开始可能没有选择数据
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      //上
      case 38:
        highlight(highlightIndex - 1);
        break;
      //下
      case 40:
        highlight(highlightIndex + 1);

        break;
      //esc
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  //输入框内容
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
    if (onChange) {
      onChange(value);
    }
  };
  //选择
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  //
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  //展示内容
  const generateDropDown = () => {
    return (
      <ul className="nebula-suggestion-list">
        {loading && (
          <div className="suggstions-loading-icon">
            <Icon icon="spinner" spin />
          </div>
        )}
        {suggestions.map((item, index) => {
          const cnames = classNames("suggestion-item", {
            "is-active": index === highlightIndex,
          });
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <div className="nebula-auto-complete" ref={componentRef}>
        <Input
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          {...restProps}
        />

        {loading && (
          <ul>
            <Icon icon="spinner" spin></Icon>
          </ul>
        )}
        {suggestions.length > 0 && generateDropDown()}
      </div>
    </>
  );
};

export default AutoComplete;

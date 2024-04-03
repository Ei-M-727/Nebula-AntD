import React, {
  FC,
  useState,
  useMemo,
  useCallback,
  useRef,
  KeyboardEvent,
} from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import useClickOutside from "../../hooks/useClickOutside";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
import { defaultAlert } from "../Alert/alert.stories";

type SelectMode = "single" | "multiple";

export interface SelectData {
  label: string; // 选项显示的文字
  value: string | number; // 选项的值
  disabled?: boolean; // 是否禁用
}

export interface SelectProps extends Omit<InputProps, "onChange"> {
  data: SelectData[]; // 选项列表
  mode?: SelectMode; // 选择模式，single 单选，multiple 多选
  /** 默认选中了的值，单选下只能一项，如果传递了数组，也直选中一个 */
  defaultSelect?: Array<string | number> | string | number;
  /** 在下拉菜单显示、隐藏调用 */
  onVisibleChange?: (isVisible: boolean) => void;
  /** 选中值发生变化的时候被触发，参数是选中的下标，选中的那项对象 */
  onChange?: (optionIndexArr: number[]) => void;
}

const Select: FC<SelectProps> = (props) => {
  const { data, mode, defaultSelect, onVisibleChange, onChange, ...restprops } =
    props;
  //存放选中的索引
  const [selectIndexArr, setSelectIndexArr] = useState<number[]>([]);
  // 是否展示列表
  const [isVisible, setIsVisible] = useState(false);
  // 高亮显示当前选中
  const [highLightIndex, setHighLightIndex] = useState(-1);
  const selectComponentRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectComponentRef, () => setIsVisible(false));

  //初始化选择列表（排除用户随意添加默认值）
  const defaultSelectValue = useMemo(() => {
    const indexArr: number[] = [];
    if (Array.isArray(defaultSelect)) {
      const values = data
        .filter((item, index) => {
          const isSelect = defaultSelect.includes(item.value);
          if (isSelect) {
            indexArr.push(index);
          }
          return isSelect;
        })
        .map((item) => item.label);
      if (mode === "multiple") {
        setSelectIndexArr(indexArr);
        return values.join(",");
      } else {
        setSelectIndexArr([indexArr[0]]);
        return values[0];
      }
    } else if (defaultSelect) {
      const values = data.filter((item, index) => {
        const isSelect = defaultSelect == item.value;
        if (isSelect) {
          indexArr.push(index);
        }
        return isSelect;
      });
      setSelectIndexArr([indexArr[0]]);
      return values[0].label;
    }
    return "";
  }, [defaultSelect, data, mode]);
  // 当前选中的值，单选情况下
  const [selectValue, setSelectValue] = useState<string | number>(
    defaultSelectValue
  );

  const handleVisible = useCallback(
    (isVisible: boolean) => {
      setIsVisible(isVisible);
      /**
       //*  ?. 可选链是 TypeScript 中的一个特性，它允许你在尝试访问深层嵌套的对象属性时，
       //* 如果中间的某个属性不存在（即值为 null 或 undefined），则整个表达式立即返回 undefined，而不是抛出错误。
       * 如果 onVisibleChange 是一个函数，则调用它并传递 isVisible 作为参数；
       * 如果 onVisibleChange 不存在或为 null 或 undefined，则整个表达式返回 undefined 并且不会执行任何操作。
       */
      onVisibleChange?.(isVisible);
    },
    [onVisibleChange, isVisible, setIsVisible]
  );

  const handleClick = useCallback(
    (item: SelectData, selectIndex: number) => {
      if (item.disabled) return; // 如果禁用 点击无效
      // 然后需要对选中的放入选中数组当中
      setSelectIndexArr((selectIndexArr) => {
        // 判断是否已经存在
        const index = selectIndexArr.indexOf(selectIndex);
        if (index === -1) {
          // 没有就放入
          // 如果是多选，就放入数组
          if (mode === "multiple") {
            onChange?.([...selectIndexArr, selectIndex]); // 选中的索引
            // 选中的数据
            //val其实就是SelectValue的值，如果存在就拼接，不存在就赋值
            setSelectValue((val) =>
              // 拼接字符串，如果存在就拼接，不存在就赋值
              val ? [val, item.label].join(",") : item.label
            );
            // 多选，直接返回咯
            return [...selectIndexArr, selectIndex];
            // 如果是单选，就放入数组
          } else {
            onChange?.([selectIndex]); // 选中的索引
            setSelectValue(item.label); // 选中的数据
            // 单选，直接返回咯
            return [selectIndex];
          }
          // 如果存在，就删除
        } else {
          //如果 selectIndex 已经在 selectIndexArr 中，则清空 selectValue。
          // 先slice生成一个新的数组，然后进行操作
          //多选情况下，已经有数据，那么当前点击就应该删除
          const indexArr = selectIndexArr.slice().splice(index, 1);
          // 重新设置高亮索引
          setHighLightIndex(-1); // 设置没高亮了
          if (mode === "multiple") {
            // 重新过滤，只保留indexArr
            //`filterData` 将是一个新数组，只包含那些其索引在 `indexArr` 中的 `data` 元素。
            const filterData = data.filter((_, index) =>
              indexArr.includes(index)
            );
            // 重新设置
            setSelectValue(filterData.map((item) => item.label).join(","));
          } else {
            // 有则去掉
            setSelectValue(""); // 清空
          }
          // 改变，传递-1，没有
          onChange?.(indexArr);
          return [...indexArr];
        }
      });
      handleVisible(false);
    },
    [onChange, handleVisible, mode, data]
  );

  // 移动索引，让高亮现实位置改变, 但是有时候禁用了那个 就没办法选中，需要跳过
  const highlight = useCallback(
    //currentIndex（当前的高亮索引）和 selectNumber（要移动的数量，正数表示向前移动，负数表示向后移动）。
    (currentIndex: number, selectNumber: number) => {
      // 拿到当前索引
      let targetIndex: number = currentIndex; // 目标值
      let item: SelectData;
      // 不是最后一个也不是第一个，并且是禁止情况下，继续循环
      /**
       * 这段代码的目的是在 data 数组中找到一个非禁用的元素。
       * 它从当前 targetIndex 开始，根据 selectNumber 的值向前或向后遍历数组。
       * 如果遍历到了数组的边界（第一个或最后一个元素）并且仍然没有找到非禁用的元素，则循环终止。
       * 一旦找到非禁用的元素，循环也会终止，并将该元素存储在 item 变量中。
       */
      do {
        // 每次判断之后加减法，用原本的+selectNumber
        targetIndex += selectNumber;
        if (targetIndex < 0) {
          targetIndex = 0;
        }
        // 如果大于等于总长度，那就最后一项
        if (targetIndex >= data.length) {
          targetIndex = data.length - 1;
        }
        item = data[targetIndex];
      } while (
        /**
         * 循环将继续执行，直到满足以下两个条件之一：
         * item.disabled 为 false：这意味着找到了一个非禁用的元素，循环可以终止。
         * targetIndex 等于 0 或 data.length - 1：这意味着已经遍历到了数组的第一个或最后一个元素，
         * 但仍然没有找到非禁用的元素。在这种情况下，循环也会终止。
         */
        item.disabled &&
        (targetIndex !== 0 || targetIndex !== data.length - 1)
      );
      //检查是否找到非禁用的项，如果没有找到，则将targetIndex重置为当前索引。
      if (data[targetIndex].disabled) {
        //如果循环结束后，targetIndex 仍然指向一个禁用的项，则将其重置为当前的 currentIndex。
        targetIndex = currentIndex;
      }
      if (targetIndex < 0) {
        targetIndex = 0;
      }
      if (targetIndex >= data.length) {
        targetIndex = data.length - 1;
      }
      setHighLightIndex(targetIndex); // 重新设置高亮索引
    },
    [data]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.keyCode) {
        case 13: // 回车 找到那个直接调用选择方法
          // 需要存在这个才能按回车
          handleClick(data[highLightIndex], highLightIndex);
          break;
        case 38: // 向上的箭头
          // 如果没有显示列表，则展示，不移动
          if (!isVisible) return handleVisible(true);
          highlight(highLightIndex, -1);
          break;
        case 40: // 向下的箭头
          // 如果没有显示列表，则展示，不移动
          if (!isVisible) return handleVisible(true);
          highlight(highLightIndex, 1);
          break;
        case 27: // esc 隐藏下拉菜单
          handleVisible(false);
          setHighLightIndex(-1); // 直接变回去-1
          break;
        default:
          break;
      }
    },
    [highlight, highLightIndex, isVisible, handleClick, data, handleVisible]
  );

  //data
  const generateOptions = useMemo(
    () => (
      <ul className="select-list">
        {data.map((item, index) => {
          const classes = classNames("select-item", {
            "item-highlighted": index === highLightIndex,
            "is-active": selectIndexArr.includes(index), // 选中的样式
            // 禁用的样式
            "is-disabled": item.disabled,
          });
          return (
            <li
              key={`${item.value}-${index}`}
              className={classes}
              onClick={() => handleClick(item, index)}
            >
              {/* 渲染数据，同时先判断有没有设置了用户自定义模板 */}
              {item.label}
              {selectIndexArr.includes(index) && (
                <span className="is-select">
                  <Icon icon="check" />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    ),
    [data, handleClick, selectIndexArr, highLightIndex]
  );
  return (
    <>
      <div
        className="select"
        style={{
          width: "350px",
        }}
        ref={selectComponentRef}
      >
        <Input
          onClick={() => {
            handleVisible(!isVisible);
          }}
          icon={isVisible ? "angle-down" : "angle-up"}
          onChange={() => {}}
          value={selectValue}
          onKeyDown={handleKeyDown}
          {...restprops}
        ></Input>
        {isVisible && generateOptions}
      </div>
    </>
  );
};

Select.defaultProps = {
  mode: "single",
  data: [],
};
export default Select;

import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";
//创建一个被监控的函数
//jest.fn() 返回一个函数，这个函数可以用来监控函数的调用情况
//jest.fn().mockReturnValue(value) 返回一个函数，这个函数可以用来监控函数的调用情况，并且可以设置函数的返回值
const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

/**
 * describe 是一个常用的函数，它用于对测试进行分组。describe 接受两个参数：一个字符串描述和一个回调函数。
 * 字符串描述通常用于给出测试组的名称或描述，而回调函数则包含了属于该组的所有测试。
 */
describe("test Button component", () => {
  // 每个用例都使用 it（或 test，它们是等价的）来定义一个测试用例。
  it("should render the correct default button", () => {
    //render 函数用于渲染组件，返回一个对象，其中包含了一些有用的方法。
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    //getByText 返回的是dom元素 找到了渲染后的组件中包含 "Nice" 文本的 DOM 元素。
    const element = wrapper.getByText("Nice");
    //expect 用于断言，如果断言失败，则测试用例会报错。确保找到的元素确实存在于渲染后的组件文档中。
    expect(element).toBeInTheDocument();
    //element 是dom元素 判断是否是button元素 可以使用tagName属性
    //注意：tagName 属性返回的是大写形式的标签名。
    expect(element.tagName).toEqual("BUTTON");
    //toHaveClass 判断元素是否包含class
    expect(element).toHaveClass("btn btn-default");
    //fireEvent 模拟用户事件
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg klass");
    expect(element.disabled).toBeFalsy();
  });
  it("should render a link when btnType equals link and href id provided", () => {
    const wrapper = render(
      <Button btnType="link" href="http://dummyurl">
        Link
      </Button>
    );
    const element = wrapper.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});

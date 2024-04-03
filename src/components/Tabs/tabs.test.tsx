import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Tabs, { TabsProps } from "./tabs";

let wrapper: RenderResult,
  tabsULElement: HTMLElement,
  activeElement: HTMLElement,
  renderChildrenElement: HTMLElement,
  disabledElement: HTMLElement;

const testTabsProps: TabsProps = {
  className: "test",
  onSelect: jest.fn(),
};

const testTabsCardProps: TabsProps = {
  mode: "card",
  defaultIndex: "2",
};

const renderTestTabs = (props: TabsProps) => {
  return (
    <Tabs {...props}>
      <Tabs.Item label="tab-1">this is tab one</Tabs.Item>
      <Tabs.Item label="tab-2" disabled>
        this is tab two
      </Tabs.Item>
      <Tabs.Item label="tab-3">this is tab three</Tabs.Item>
    </Tabs>
  );
};

describe("test Tabs and TabItem component", () => {
  beforeEach(() => {
    wrapper = render(renderTestTabs(testTabsProps));
    tabsULElement = wrapper.getByTestId("test-tab-ul");
    activeElement = wrapper.getByText("tab-1");
    renderChildrenElement = wrapper.getByText("this is tab one");
    disabledElement = wrapper.getByText("tab-2");
  });
  it("should render correct Tabs and TabItem based on default props", () => {
    expect(tabsULElement).toBeInTheDocument();
    expect(tabsULElement.querySelectorAll(":scope li").length).toBe(3);
    expect(tabsULElement).toHaveClass("tabs");
    expect(tabsULElement.tagName).toBe("UL");
    //渲染子节点的数据
    expect(renderChildrenElement).toBeInTheDocument();
    expect(renderChildrenElement.textContent).toBe("this is tab one");
    expect(renderChildrenElement.tagName).toBe("DIV");
    //选中的
    expect(activeElement).toHaveClass("is-active");
    expect(activeElement.tagName).toBe("LI");
    expect(activeElement.textContent).toBe("tab-1");
    expect(activeElement).toBeInTheDocument();
    //禁用的
    expect(disabledElement).toHaveClass("is-disabled");
    expect(disabledElement.tagName).toBe("LI");
    expect(disabledElement.textContent).toBe("tab-2");
  });
  it("click items should change active and call the right back", () => {
    const targetItem = wrapper.getByText("tab-3");
    expect(targetItem).toBeInTheDocument();
    fireEvent.click(targetItem);
    expect(targetItem).toHaveClass("is-active");
    expect(testTabsProps.onSelect).toHaveBeenCalledWith("2");
    expect(activeElement).not.toHaveClass("is-active");
    expect(renderChildrenElement.textContent).toBe("this is tab three");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testTabsProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render card mode when mode is set to tabs-card className", () => {
    cleanup();
    const wrapper = render(renderTestTabs(testTabsCardProps));
    tabsULElement = wrapper.getByTestId("test-tab-ul");
    activeElement = wrapper.getByText("tab-3");
    renderChildrenElement = wrapper.getByText("this is tab three");
    expect(tabsULElement).toHaveClass("tabs-card");
    expect(activeElement).toHaveClass("is-active");
    expect(renderChildrenElement.textContent).toBe("this is tab three");
  });
});

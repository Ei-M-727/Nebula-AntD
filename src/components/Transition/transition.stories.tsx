import React, { useState } from "react";
import type { Meta, StoryObj, StoryFn } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Transition from "./transition";
import Button from "../Button/button";

const meta: Meta<typeof Transition> = {
  title: "Transition Component",
  component: Transition,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Transition>;

export const DefaultTransition: Story = {
  render: function Render(args) {
    const [show, setShow] = useState<boolean>(true);
    return (
      <>
        <Button onClick={() => setShow(!show)}>点击显示隐藏</Button>
        <Transition in={show} timeout={300} animation="zoom-in-top">
          <div>
            <p>
              Edit <code> src/App.tsx </code> and save to reload.
            </p>
            <p>
              Edit <code> src/App.tsx </code> and save to reload.
            </p>
            <p>
              Edit <code> src/App.tsx </code> and save to reload.
            </p>
            <p>
              Edit <code> src/App.tsx </code> and save to reload.
            </p>
          </div>
        </Transition>
      </>
    );
  },
};

DefaultTransition.storyName = "默认Transition";

export const DifferentTransition: Story = {
  render: function Render(args) {
    const [show, setShow] = useState<boolean>(false);
    const [show2, setShow2] = useState<boolean>(false);
    const [show3, setShow3] = useState<boolean>(false);
    const [show4, setShow4] = useState<boolean>(false);
    return (
      <>
        <Button onClick={() => setShow(!show)}>top animation</Button>
        <Transition timeout={300} in={show} animation="zoom-in-top">
          <p>top show animation</p>
        </Transition>
        <br />
        <br />
        <Button onClick={() => setShow2(!show2)}>bottom animation</Button>
        <Transition timeout={300} in={show2} animation="zoom-in-bottom">
          <p>bottom show animation</p>
        </Transition>
        <br />
        <br />
        <Button onClick={() => setShow3(!show3)}>left animation</Button>
        <Transition timeout={300} in={show3} animation="zoom-in-left">
          <p>left show animation</p>
        </Transition>
        <br />
        <br />
        <Button onClick={() => setShow4(!show4)}>right animation</Button>
        <Transition timeout={300} in={show4} animation="zoom-in-right">
          <p>right show animation</p>
        </Transition>
      </>
    );
  },
};

DifferentTransition.storyName = "不同的Transition";

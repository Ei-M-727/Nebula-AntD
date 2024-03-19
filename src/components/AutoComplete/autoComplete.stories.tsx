import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import AutoComplete, { DataSourceType } from "./autoComplete";

const meta: Meta<typeof AutoComplete> = {
  title: "AutoComplete Component",
  component: AutoComplete,
  tags: ["autodocs"],
};

interface LakerPlayerProps {
  value: string;
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}

export default meta;
type Story = StoryObj<typeof AutoComplete>;

export const DefaultAutoComplete: Story = {
  render: function Render(args) {
    const lakers = [
      "bradley",
      "pope",
      "caruso",
      "cook",
      "cousins",
      "james",
      "AD",
      "green",
      "howard",
      "kuzma",
      "McGee",
      "rando",
    ];

    const handleFetch = (val: string): DataSourceType[] => {
      return lakers
        .filter((item) => item.includes(val))
        .map((item) => ({ value: item }));
    };
    return (
      <>
        <AutoComplete
          placeholder="输入湖人队球员英文名"
          fetchSuggestions={handleFetch}
          onSelect={action("change select to value")}
        ></AutoComplete>
      </>
    );
  },
};

DefaultAutoComplete.storyName = "默认AutoComplete";

export const CustomTempleteAutoComplete: Story = {
  render: function Render(args) {
    const lakersWithNumber = [
      { value: "bradley", number: 11 },
      { value: "pope", number: 1 },
      { value: "caruso", number: 4 },
      { value: "cook", number: 2 },
      { value: "cousins", number: 15 },
      { value: "james", number: 23 },
      { value: "AD", number: 3 },
      { value: "green", number: 14 },
      { value: "howard", number: 39 },
      { value: "kuzma", number: 0 },
    ];

    const handleFetch = (val: string): DataSourceType[] => {
      return lakersWithNumber.filter((item) => item.value.includes(val));
    };
    const renderOption = (item: DataSourceType) => {
      const itemwithnumber = item as DataSourceType<LakerPlayerProps>;
      return (
        <>
          <b>名字：{itemwithnumber.value}</b>
          <span>球衣号码：{itemwithnumber.number}</span>
        </>
      );
    };
    return (
      <>
        <AutoComplete
          placeholder="输入湖人队球员英文，自定义下拉模版"
          fetchSuggestions={handleFetch}
          renderOption={renderOption}
        ></AutoComplete>
      </>
    );
  },
};

CustomTempleteAutoComplete.storyName = "自定义模版AutoComplete";

export const AsyncAutoComplete: Story = {
  render: function Render(args) {
    const handleFetch = (val: string) => {
      return fetch(`https://api.github.com/search/users?q=${val}`).then((res) =>
        res.json().then(({ items }) => {
          return items
            .slice(0, 10)
            .map((item: any) => ({ value: item.login, ...item }));
        })
      );
    };

    const renderOption = (item: DataSourceType) => {
      const itemWithGithub = item as DataSourceType<GithubUserProps>;

      return (
        <>
          <b>Name: {itemWithGithub.value} </b>
          <span>url: {itemWithGithub.url}</span>
        </>
      );
    };
    return (
      <>
        <AutoComplete
          placeholder="输入Github用户名"
          fetchSuggestions={handleFetch}
          renderOption={renderOption}
        ></AutoComplete>
      </>
    );
  },
};

AsyncAutoComplete.storyName = "异步AutoComplete";

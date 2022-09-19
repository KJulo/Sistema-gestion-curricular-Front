//react
import React from "react";

//antd
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

const SearchContent = ({ placeHolder }) => {

  const manageInput = (value) => {
  }

  return (
    <Search
      placeholder={placeHolder}
      onSearch={manageInput}
      onChange={(e) => manageInput(e.target.value)}
      enterButton
      size="large"
    />

  );

}


export default SearchContent;

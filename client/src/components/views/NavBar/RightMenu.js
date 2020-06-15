import React from "react";
import { Menu } from "antd";
import "./NavBar.css";
import { UploadOutlined } from "@ant-design/icons";

function RightMenu() {
  return (
    <Menu theme="dark" mode="horizontal" className="menu_header menu_user">
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
  );
}

export default RightMenu;

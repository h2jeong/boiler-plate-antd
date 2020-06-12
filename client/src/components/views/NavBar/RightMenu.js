import React from "react";
import { Menu } from "antd";
import "./NavBar.css";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";

function RightMenu(props) {
  let user = useSelector(state => state.user);

  const logoutHandler = () => {
    Axios.get("/api/users/logout").then(res => {
      if (res.data.success) props.history.push("/login");
      else alert("Log out Failed");
    });
  };

  if (user.userData && !user.userData.isAuth) {
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
  } else {
    return (
      <Menu theme="dark" mode="horizontal" className="menu_header menu_user">
        <Menu.Item key="create">
          <a href="/video/upload">
            <UploadOutlined />
          </a>
        </Menu.Item>
        <Menu.Item key="logout">
          <span onClick={logoutHandler}>Logout</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);

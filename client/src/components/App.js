import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <a href="/">Home</a>
          </Menu.Item>
          <Menu.Item key="2">Subscription</Menu.Item>

          <Menu.Item key="3">
            <a href="/login">Sign in</a>
          </Menu.Item>
          <Menu.Item key="4">
            <a href="/register">Sign up</a>
          </Menu.Item>
        </Menu>
      </Header>

      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 114 }}
      >
        <div
          className="site-layout-background"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 24,
            minHeight: "calc(100vh - 178px)",
            backgroundColor: "#fff"
          }}
        >
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;

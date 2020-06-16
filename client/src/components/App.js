import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import NavBar from "./views/NavBar/NavBar";
import Auth from "../hoc/auth";

const { Content, Footer } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <NavBar />
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
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route path="/register" component={Auth(RegisterPage, false)} />
              <Route path="/login" component={Auth(LoginPage, false)} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

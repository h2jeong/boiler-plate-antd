import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Auth from "../hoc/auth";
import { Layout } from "antd";

import NavBar from "./views/NavBar/NavBar";
import SideBar from "./views/SideBar/SideBar";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";

const { Content } = Layout;

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Layout>
          <NavBar />
          <Layout style={{ padding: "24px", height: "calc(100vh - 64px)" }}>
            <SideBar />
            <Layout style={{ paddingLeft: "24px" }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  backgroundColor: "#fff",
                  overflow: "auto"
                }}
              >
                <Switch>
                  <Route exact path="/" component={Auth(LandingPage, null)} />
                  <Route
                    exact
                    path="/login"
                    component={Auth(LoginPage, false)}
                  />
                  <Route
                    exact
                    path="/register"
                    component={Auth(RegisterPage, false)}
                  />
                  <Route
                    exact
                    path="/video/upload"
                    component={Auth(VideoUploadPage, true)}
                  />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

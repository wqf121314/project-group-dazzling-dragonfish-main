import React from "react";
import ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import { HashRouter } from "react-router-dom";
import { Layout } from "antd";
import HeaderElement from "./pages/components/HeaderElement";
import FooterElement from "./pages/components/FooterElement";
import routes from "./router/routes";
import "./test/mock.js";
import "./css/main.css";
import "antd";
const { Header, Content, Footer } = Layout;

ReactDOM.render(
  <div>
    <Layout>
      <Header className="header">
        <HashRouter><HeaderElement/></HashRouter>
      </Header>
      <Content>
        <HashRouter>{renderRoutes(routes)}</HashRouter>
      </Content>
      <Footer className="footer">
        <FooterElement />
      </Footer>
    </Layout>
  </div>,
  document.getElementById("root")
);

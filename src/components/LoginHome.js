import React from "react";
import FooterBar from "./FooterBar";
import {Layout, Menu, Image} from "antd";
import {Link} from "react-router-dom";
import {
  HomeFilled,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import logo from "./logo.png";
import {v4 as uuidv4} from "uuid";

const {Header, Content} = Layout;
class LoginHome extends React.Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header
            className="header"
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: "white",
            }}
          >
            <div
              className="logo"
              style={{
                float: "left",
                marginTop: "10px",
                display: "inline-block",
              }}
            >
              <Link to="/loginhome">
                <Image preview={false} src={logo} width={"150px"} />
              </Link>
            </div>
            <Menu mode="horizontal" style={{float: "right"}}>
              <Menu.Item key="1" icon={<HomeFilled />}>
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<HomeFilled />}>
                Category
              </Menu.Item>
              <Menu.Item key="3" icon={<HomeFilled />}>
                Admin
              </Menu.Item>
              <Menu.Item key="4">Cart</Menu.Item>
              <Menu.Item key="5">Logout</Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <FooterBar />
      </div>
    );
  }
}

export default LoginHome;

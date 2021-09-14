import React from "react";
import {Link} from "react-router-dom";
import logo from "./logo.png";
import Footerbar from "./FooterBar";
import {
  // Input,
  Layout,
  Menu,
  // Form, Modal,
  Image,
  //  Table,
  message,
} from "antd";
import "antd/dist/antd.css";
import {
  AppstoreAddOutlined,
  FileAddOutlined,
  HomeFilled,
  LogoutOutlined,
} from "@ant-design/icons";
import {connect} from "react-redux";
import history from "../history";

const {Header, Content, Sider} = Layout;

class Admin extends React.Component {
  state = {
    collapsed: false,
    isModalVisible: false,
  };
  redirectLoginHome = () => {
    history.push("/loginhome");
  };
  redirectLogout = () => {
    const success = () => {
      message.success("Log out successfully");
    };
    success();
    history.push("/");
  };
  onCollapse = (collapsed) => {
    this.setState({collapsed});
  };
  //add category modal
  handleCategory = () => {
    history.push("/loginhome/admin/category");
  };

  //add product modal
  handleProduct = () => {
    history.push("/loginhome/admin/product");
  };
  //handle ok
  handleOk = (data) => {
    // console.log("data", data);
    this.setState({isModalVisible: false});
  };
  //handle calcel
  handleCancel = () => {
    this.setState({isModalVisible: false});
  };
  //field change and store

  //finish
  handleOnFinish = (value) => {
    console.log("value", value);
  };

  render() {
    const {collapsed} = this.state;

    return (
      <div>
        <Layout>
          <Header
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
                <Image src={logo} width={"150px"} preview={false} />
              </Link>
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{background: "white", float: "right"}}
            >
              <Menu.Item
                key="1"
                onClick={this.redirectLoginHome}
                icon={<HomeFilled />}
              >
                Home
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={this.redirectLogout}
                icon={<LogoutOutlined />}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
        <Layout
          style={{
            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            marginTop: "65px",
            // display: "flex",
            // flexWrap: "wrap",
            // flexDirection: "row",
            height: "94vh",
            // maxWidth: "100%",
          }}
        >
          <Sider
            style={{}}
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <Menu theme="dark">
              <Menu.Item
                key="1"
                id={1}
                icon={<AppstoreAddOutlined />}
                onClick={this.handleCategory}
              >
                Categories
              </Menu.Item>
              <Menu.Item
                key="2"
                id={2}
                icon={<FileAddOutlined />}
                onClick={this.handleProduct}
              >
                Products
              </Menu.Item>
            </Menu>
          </Sider>

          <Content></Content>
        </Layout>

        <Footerbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.category,
    items: state.items,
  };
};

export default connect(mapStateToProps)(Admin);

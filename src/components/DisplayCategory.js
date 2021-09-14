import React from "react";
import {
  Layout,
  Menu,
  Image,
  message,
  Table,
  Button,
  Input,
  Modal,
  Form,
  Popconfirm,
  Tooltip,
} from "antd";
import logo from "./logo.png";
// import { Link } from "react-router-dom";
import {
  HomeFilled,
  LogoutOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import Footerbar from "./FooterBar";
import {connect} from "react-redux";
import history from "../history";
import {removeCategory, addCategory} from "../actions/index";
import {fetchCategory} from "../actions/index";

const {Header, Content, Sider} = Layout;

class DisplayCategory extends React.Component {
  state = {
    cat_name: "",
    id: 0,
    collapsed: false,
    isModalVisible: false,
  };
  componentDidMount() {
    // const category = this.props.category;
    // console.log("cates", category);
    this.props.fetchCategory();
  }
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
  redirectAdmin = () => {
    history.push("/loginhome/admin");
  };
  redirecctCategory = () => {
    history.push("/loginhome/admin/category");
  };
  redirecctProduct = () => {
    history.push("/loginhome/admin/product");
  };

  handleOnChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  };
  handleCategory = () => {
    history.push("/loginhome/admin/category");
  };

  handleProduct = () => {
    history.push("/loginhome/admin/product");
  };
  //for modal
  addCategory = () => {
    this.setState({isModalVisible: true});
  };
  handleOk = (value) => {
    // console.log(" okvalue", value);
    // this.props.addCategory(value);
    // console.log("to send reducer", this.props.state);
    const {cat_name, id} = this.state;
    // const category = this.props.category;
    // category.push(data);
    // console.log("to send reducer after push", this.props.state);

    // loadFromLocalStorage();
    // saveToLocalStorage().category.push(data);

    // category.push(data);
    const data = {cat_name, id};
    this.props.addCategory(data);
    // localStorage.setItem("cartState", JSON.stringify(this.props.state));

    this.setState({isModalVisible: false});
  };

  handleCancel = () => {
    this.setState({isModalVisible: false});
  };
  //remove category
  handleRemove = (id) => {
    console.log("click for remove", id);
    this.props.removeCategory(id);
  };
  //edit category
  handleEdit = (id) => {
    this.setState({isModalVisible: true});
    const category = this.props.category;
    const toEdit = category.find((item) => item.id === id);
    console.log("toedit", toEdit);
    const response = {};
    this.props.editCategory();
  };
  render() {
    const collapsed = this.state.collapsed;
    const category = this.props.category;
    // console.log(
    //   "Display category log",
    //   category.map((item) => item.id)
    // );
    const columns = [
      {
        title: "Category Name",
        key: "cat_name",
        dataIndex: "cat_name",
      },
      {
        title: "Category ID",
        key: "id",
        dataIndex: "id",
      },
      {
        title: "Action",
        key: "remove",
        dataIndex: "",
        children: [
          {
            title: "Delete",
            key: "delete",
            dataIndex: "delete",
            render: (category) => (
              <Popconfirm
                title="Sure to remove?"
                onConfirm={() => this.handleRemove(category.id)}
              >
                <Button danger>Remove</Button>
              </Popconfirm>
            ),
          },
          {
            title: "Edit",
            key: "edit",
            dataIndex: "edit",
            render: (category) => (
              <Tooltip title="Edit category">
                <EditTwoTone
                  style={{fontSize: "20px"}}
                  onClick={() => this.handleEdit(category.id)}
                />
              </Tooltip>
            ),
          },
        ],
      },
    ];
    return (
      <div>
        <Layout>
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
              <Image
                src={logo}
                width={"150px"}
                preview={false}
                onClick={this.redirectLoginHome}
              />
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{background: "white", float: "right"}}
            >
              <Menu.Item
                key="801"
                onClick={this.redirectLoginHome}
                icon={<HomeFilled />}
              >
                Home
              </Menu.Item>
              <Menu.Item key="802" onClick={this.redirectAdmin}>
                Admin
              </Menu.Item>
              <Menu.Item
                key="803"
                onClick={this.redirectLogout}
                icon={<LogoutOutlined />}
              >
                Log out
              </Menu.Item>
            </Menu>
          </Header>
          <Layout
            style={{
              background:
                "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
              filter:
                "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
              marginTop: "65px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              height: "690px",
              maxWidth: "100%",
              marginBottom: "30px",
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
                  key="901"
                  id={1}
                  icon={<AppstoreAddOutlined />}
                  onClick={this.redirecctCategory}
                >
                  Categories
                </Menu.Item>
                <Menu.Item
                  key="902"
                  id={2}
                  icon={<FileAddOutlined />}
                  onClick={this.redirecctProduct}
                >
                  Products
                </Menu.Item>{" "}
              </Menu>
            </Sider>

            <Content
              style={{
                padding: "20px",
                alignContent: "center",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              <div style={{float: "right", marginBottom: "10px"}}>
                <Button type="primary" onClick={this.addCategory}>
                  Add Category
                </Button>
              </div>
              <Modal
                title="Add Category"
                visible={this.state.isModalVisible}
                onCancel={this.handleCancel}
                onOk={this.handleOk}
              >
                <Form>
                  <Form.Item
                    label="Category Name"
                    value={this.state.cat_name}
                    name="cat_name"
                    rules={[
                      {
                        required: true,
                        message: "Please input category name!",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      name="cat_name"
                      onChange={this.handleOnChange}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Category Id"
                    value={this.state.id}
                    name="id"
                    rules={[
                      {
                        required: true,
                        message: "Please input category Id!",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      name="id"
                      onChange={this.handleOnChange}
                    />
                  </Form.Item>
                </Form>
              </Modal>
              <Table
                rowKey="id"
                columns={columns}
                dataSource={category}
                style={{overflowX: "auto", height: "600px"}}
                pagination={{defaultPageSize: 10}}
              />
            </Content>
          </Layout>
          <Footerbar />
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {category: Object.values(state.category)};
};

export default connect(mapStateToProps, {
  removeCategory,
  addCategory,
  fetchCategory,
})(DisplayCategory);

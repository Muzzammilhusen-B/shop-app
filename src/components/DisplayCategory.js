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
  Space,
} from "antd";
import logo from "./logo.png";
// import { Link } from "react-router-dom";
import {
  HomeFilled,
  LogoutOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
  EditTwoTone,
  DeleteOutlined,
} from "@ant-design/icons";
import Footerbar from "./FooterBar";
import {connect} from "react-redux";
import history from "../history";
import {removeCategory, addCategory, editCategory} from "../actions/index";
import {fetchCategory} from "../actions/index";
import {v4 as uuidv4} from "uuid";

const {Header, Content, Sider} = Layout;

class DisplayCategory extends React.Component {
  state = {
    cat_name: "",
    id: 0,
    collapsed: false,
    isModal1Visible: false,
    isModal2Visible: false,
    toEdit: [],
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
    this.setState({isModal1Visible: true});
  };
  handleOk1 = () => {
    const {cat_name} = this.state;
    const data = {cat_name, id: parseInt(uuidv4())};
    this.props.addCategory(data);
    this.setState({isModal1Visible: false});
  };

  handleCancel1 = () => {
    this.setState({isModal1Visible: false});
  };
  //remove category
  handleRemove = (id) => {
    console.log("click for remove", id);
    this.props.removeCategory(id);
  };
  //edit category
  handleEdit = (id) => {
    const category = this.props.category;
    let selected = category.find((item) => item.id === id);
    console.log("selected caat id", selected);
    this.setState({isModal2Visible: true, id, toEdit: selected});
  };
  handleOk2 = () => {
    const {cat_name, id} = this.state;
    const category = this.props.category;
    const toEdit = category.find((item) => item.id === id);
    console.log("toedit", toEdit, cat_name);
    const newName =
      cat_name !== toEdit.cat_name
        ? (toEdit.cat_name = cat_name)
        : toEdit.cat_name;
    const response = {cat_name: newName, id};
    console.log("toedit 2", response);
    this.props.editCategory(response);

    this.setState({isModal2Visible: false});
  };

  handleCancel2 = () => {
    this.setState({isModal2Visible: false});
  };
  render() {
    const collapsed = this.state.collapsed;
    const category = this.props.category;
    const {cat_name} = this.state.toEdit;
    // console.log("category for action", category);
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
        title: "Action",
        key: "remove",
        dataIndex: "",
        render: (category) => (
          <Space>
            <Tooltip title="Edit category">
              <EditTwoTone
                style={{fontSize: "20px"}}
                onClick={() => this.handleEdit(category.id)}
              />
            </Tooltip>
            <Popconfirm
              title="Sure to remove?"
              onConfirm={() => this.handleRemove(category.id)}
            >
              <DeleteOutlined style={{color: "red", fontSize: "20px"}} />
            </Popconfirm>
          </Space>
        ),
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
              {/* modal 1 start */}
              <div>
                <Modal
                  title="Add Category"
                  visible={this.state.isModal1Visible}
                  onCancel={this.handleCancel1}
                  onOk={this.handleOk1}
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
                    {/* <Form.Item
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
                  </Form.Item> */}
                  </Form>
                </Modal>
              </div>
              {/* modal 1 end */}
              {/* modal 2 start */}
              <div>
                <Modal
                  title="Edit Category"
                  visible={this.state.isModal2Visible}
                  onCancel={this.handleCancel2}
                  onOk={this.handleOk2}
                >
                  <Form>
                    <Form.Item
                      label="Category Name"
                      initialValue={cat_name}
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
                    {/* <Form.Item
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
                  </Form.Item> */}
                  </Form>
                </Modal>
              </div>

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
  console.log("category", state);
  return {category: Object.values(state.category)};
};

export default connect(mapStateToProps, {
  removeCategory,
  addCategory,
  fetchCategory,
  editCategory,
})(DisplayCategory);

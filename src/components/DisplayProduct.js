import React from "react";
import {
  Layout,
  Menu,
  Image,
  message,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  Table,
  Tooltip,
  Popconfirm,
} from "antd";
import logo from "./logo.png";
// import { Link } from "react-router-dom";
import {
  HomeFilled,
  LogoutOutlined,
  AppstoreAddOutlined,
  FileAddOutlined,
  // InfoCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Footerbar from "./FooterBar";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import history from "../history";
import {fetchItems, addProduct, removeProduct} from "../actions";
import {v4 as uuidv4} from "uuid";

const {TextArea} = Input;
const {Header, Content, Sider} = Layout;
// const { Meta } = Card;
class DisplayProduct extends React.Component {
  state = {
    categoryName: "",
    id: 0,
    name: "",
    company: "",
    price: 0,
    amount: 1,
    description: "",
    image: "",
    collapsed: false,
    isModalVisible: false,
  };
  componentDidMount() {
    this.props.fetchItems();
  }
  componentDidUpdate() {
    // console.log("delete stat", this.props.state);
    // localStorage.setItem("cartState", JSON.stringify(this.props.state));
  }

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
    // console.log("this dot state", this.state);
  };
  handleCategory = () => {
    history.push("/loginhome/admin/category");
  };

  handleProduct = () => {
    history.push("/loginhome/admin/product");
  };
  //add product
  addProduct = () => {
    this.setState({isModalVisible: true});
  };
  handleOk = (value) => {
    console.log("value", value);
    const {categoryName, name, company, price, amount, description, image} =
      this.state;
    const data = {
      categoryName,
      id: parseInt(uuidv4()),
      name,
      company,
      price: parseInt(price),
      amount: parseInt(amount),
      description,
      image,
    };
    this.props.addProduct(data);

    // localStorage.setItem("cartState", JSON.stringify(this.props.state));

    // this.props.addCategory(id);
    this.setState({isModalVisible: false});
  };

  handleCancel = () => {
    this.setState({isModalVisible: false});
  };
  //remove product
  handleRemove = (id) => {
    console.log("product id to remove", id);
    this.props.removeProduct(id);
  };

  render() {
    const {
      collapsed,
      categoryName,
      // id,
      company,
      price,
      amount,
      description,
      name,
      image,
    } = this.state;
    const items = this.props.items;
    const columns = [
      {
        title: "Category Name",
        key: "categoryName",
        dataIndex: "categoryName",
        width: 100,
        fixed: "left",
      },
      // {
      //   title: "ID",
      //   key: "id",
      //   dataIndex: "id",
      //   width: 50,
      // },
      {
        title: "Name",
        key: "name",
        dataIndex: "name",
        width: 100,
      },
      {
        title: "Company",
        key: "company",
        dataIndex: "company",
        width: 130,
      },
      {
        title: "Price(₹).",
        key: "price",
        dataIndex: "price",
        width: 120,
      },
      {
        title: "Qty.",
        key: "amount",
        dataIndex: "amount",
        width: 60,
      },
      {
        title: "Description",
        key: "description",
        width: 200,

        dataIndex: "description",
        ellipsis: {showTitle: false},
        render: (description) => (
          <Tooltip title={description} placement="topLeft">
            {description}
          </Tooltip>
        ),
      },
      {
        title: "Image",
        key: "image",
        dataIndex: "image",
        width: 150,
        ellipsis: {showTitle: false},
        render: (image) => (
          <Tooltip title={image} placement="topLeft">
            {image}
          </Tooltip>
        ),
      },
      {
        title: "Action",
        key: "remove",
        width: 100,

        dataIndex: "",
        render: (items) => (
          <Popconfirm
            title="Sure to remove?"
            onConfirm={() => this.handleRemove(items.id)}
          >
            <Button danger>Remove</Button>
          </Popconfirm>
          // <Button onClick={() => this.handleRemove(items.id)}>Remove</Button>
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
                key="701"
                // onClick={this.redirectLoginHome}
                icon={<HomeFilled />}
              >
                <Link to="/loginhome">Home</Link>
              </Menu.Item>
              <Menu.Item key="702" onClick={this.redirectAdmin}>
                Admin
              </Menu.Item>
              <Menu.Item
                key="703"
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
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            height: "94vh",
            maxWidth: "100%",
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
                key="704"
                id={1}
                icon={<AppstoreAddOutlined />}
                onClick={this.redirecctCategory}
              >
                Categories
              </Menu.Item>
              <Menu.Item
                key="705"
                id={2}
                icon={<FileAddOutlined />}
                onClick={this.redirecctProduct}
              >
                Products
              </Menu.Item>
            </Menu>
          </Sider>

          <Content
            style={{
              padding: "20px",
              alignContent: "center",
              maxWidth: "100%",
            }}
          >
            <div style={{float: "right", marginBottom: "20px"}}>
              <Button type="primary" onClick={this.addProduct}>
                Add Product
              </Button>
            </div>

            <Modal
              title="Add Product"
              visible={this.state.isModalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Form>
                <Form.Item
                  label="Category Name"
                  value={categoryName}
                  name="categoryName"
                  rules={[
                    {
                      required: true,
                      message: "Please input category name!",
                    },
                  ]}
                >
                  <Input name="categoryName" onChange={this.handleOnChange} />
                </Form.Item>
                {/* <Form.Item
                  label="Category ID"
                  value={id}
                  name="id"
                  rules={[
                    {
                      required: true,
                      message: "Please input category id!",
                    },
                  ]}
                >
                  <Input name="id" onChange={this.handleOnChange} />
                </Form.Item> */}
                <Form.Item
                  label="Product Name"
                  name="name"
                  value={name}
                  rules={[
                    {
                      required: true,
                      message: "Please input product name!",
                    },
                  ]}
                >
                  <Input name="name" onChange={this.handleOnChange} />
                </Form.Item>{" "}
                <Form.Item
                  label="Product Company"
                  name="company"
                  value={company}
                  rules={[
                    {
                      required: true,
                      message: "Please input company name!",
                    },
                  ]}
                >
                  <Input name="company" onChange={this.handleOnChange} />
                </Form.Item>{" "}
                <Form.Item
                  initialValue="1"
                  label="Product Amount"
                  name="amount"
                  value={amount}
                  rules={[
                    {
                      required: true,
                      message: "Please input product amount",
                    },
                  ]}
                >
                  <Input
                    name="amount"
                    type="number"
                    onChange={this.handleOnChange}
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Product Price in ₹."
                  name="price"
                  value={price}
                  rules={[
                    {
                      required: true,
                      message: "Please input product price!",
                    },
                  ]}
                >
                  <Input
                    name="price"
                    type="number"
                    onChange={this.handleOnChange}
                  />
                </Form.Item>{" "}
                <Form.Item
                  label="Product Description"
                  name="description"
                  value={description}
                  rules={[
                    {
                      required: true,
                      message: "Please input product description!",
                    },
                  ]}
                >
                  <TextArea
                    rows={6}
                    name="description"
                    onChange={this.handleOnChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Image"
                  name="image"
                  value={image}
                  rules={[
                    {
                      required: true,
                      message: "Please upload Image",
                    },
                  ]}
                >
                  <Input
                    name="image"
                    type="text"
                    onChange={this.handleOnChange}
                  />
                  <p>Or</p>
                  <Upload name="image" onChange={this.handleOnChange}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Modal>
            <Table
              rowKey="id"
              // bordered
              // scroll={{ x: 1500, y: 300 }}
              scroll={{y: 450, x: 1000}}
              columns={columns}
              dataSource={items}
              style={{overflowX: "auto", height: "600px"}}
              pagination={{pageSize: 10}}
            />
          </Content>
        </Layout>
        <Footerbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {state: state.products, items: Object.values(state.items)};
};

export default connect(mapStateToProps, {
  fetchItems,
  addProduct,
  removeProduct,
})(DisplayProduct);

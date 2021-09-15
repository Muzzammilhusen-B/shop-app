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
  UploadOutlined,
} from "@ant-design/icons";
import Footerbar from "./FooterBar";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import history from "../history";
import {fetchItems, addProduct, removeProduct, editProduct} from "../actions";
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
    isModal1Visible: false,
    isModal2Visible: false,
    selectedItem: [],
  };
  componentDidMount() {
    this.props.fetchItems();
    console.log("selected item mount", this.state.selectedItem);

    this.setState({selectedItem: this.state.selectedItem});
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
    this.setState({isModal1Visible: true});
  };
  handleOk1 = (value) => {
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
    const success = () => {
      message.success("Product Added.");
    };
    success();

    // localStorage.setItem("cartState", JSON.stringify(this.props.state));

    // this.props.addCategory(id);
    this.setState({isModal1Visible: false});
  };

  handleCancel1 = () => {
    this.setState({isModal1Visible: false});
  };
  //remove product
  handleRemove = (id) => {
    console.log("product id to remove", id);
    this.props.removeProduct(id);
    const success = () => {
      message.success("Product removed.");
    };
    success();
  };
  //handle edit product
  handleEdit = (id) => {
    this.setState({isModal2Visible: true, id});
    const items = this.props.items;
    const toEdit = items.find((item) => item.id === id);
    console.log("selected item", toEdit);
    this.setState({selectedItem: toEdit});
    console.log("selected item in state", this.state.selectedItem);
  };
  handleCancel2 = () => {
    this.setState({isModal2Visible: false, selectedItem: []});
  };
  handleOk2 = () => {
    const items = this.props.items;
    const {categoryName, id, price, amount, image, company, description} =
      this.state;
    const toEdit = items.find((item) => item.id === id);
    // console.log("toedit,item", toEdit);
    const response = {
      categoryName:
        categoryName !== toEdit.categoryName
          ? (toEdit.categoryName = categoryName)
          : toEdit.categoryName,
      id,
      price: price !== toEdit.price ? (toEdit.price = price) : toEdit.price,
      amount:
        amount !== toEdit.amount ? (toEdit.amount = amount) : toEdit.amount,
      image: image !== toEdit.image ? (toEdit.image = image) : toEdit.image,
      company:
        company !== toEdit.company
          ? (toEdit.company = company)
          : toEdit.company,
      description:
        description !== toEdit.description
          ? (toEdit.description = description)
          : toEdit.description,
    };
    this.props.editProduct(response);
    const success = () => {
      message.success("Product Edited.");
    };
    success();
    // const {cat_name, id} = this.state;
    // const category = this.props.category;
    // const toEdit = category.find((item) => item.id === id);
    // console.log("toedit", toEdit, cat_name);
    // const newName =
    //   cat_name !== toEdit.cat_name
    //     ? (toEdit.cat_name = cat_name)
    //     : toEdit.cat_name;
    // const response = {cat_name: newName, id};
    // console.log("toedit 2", response);
    // this.props.editCategory(response);
    this.setState({isModal2Visible: false, selectedItem: []});
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
      selectedItem,
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
          <Space>
            <Tooltip title="Edit Product">
              <EditTwoTone
                style={{fontSize: "20px"}}
                onClick={() => this.handleEdit(items.id)}
              />
            </Tooltip>
            <Popconfirm
              title="Sure to remove?"
              onConfirm={() => this.handleRemove(items.id)}
            >
              <DeleteOutlined style={{color: "red", fontSize: "20px"}} />
            </Popconfirm>
          </Space>
        ),
        // render: (items) => (
        //   <Popconfirm
        //     title="Sure to remove?"
        //     onConfirm={() => this.handleRemove(items.id)}
        //   >
        //     <Button danger>Remove</Button>
        //   </Popconfirm>
        //   // <Button onClick={() => this.handleRemove(items.id)}>Remove</Button>
        // ),
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
            {/* Modal 1 start */}
            <Modal
              title="Add Product"
              visible={this.state.isModal1Visible}
              onOk={this.handleOk1}
              onCancel={this.handleCancel1}
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
            {/* modal 1 end */}
            {/* modal 2 start */}
            <Modal
              title="Edit Product"
              visible={this.state.isModal2Visible}
              onOk={this.handleOk2}
              onCancel={this.handleCancel2}
            >
              <Form>
                <Form.Item
                  label="Category Name"
                  initialValue={
                    selectedItem === undefined ? "" : selectedItem.categoryName
                  }
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
                <Form.Item
                  label="Product Name"
                  name="name"
                  initialValue={
                    selectedItem === undefined ? "" : selectedItem.name
                  }
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
                  initialValue={
                    selectedItem === undefined ? "" : selectedItem.company
                  }
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
                  label="Product Amount"
                  name="amount"
                  initialValue={
                    selectedItem === undefined ? "" : selectedItem.amount
                  }
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
                  initialValue={
                    selectedItem === undefined ? "" : selectedItem.price
                  }
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
                  initialValue={
                    selectedItem === undefined ? "" : selectedItem.description
                  }
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
                  initialValue={
                    selectedItem === undefined ? "" : selectedItem.image
                  }
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
            {/* Modal 2 end */}
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
  editProduct,
})(DisplayProduct);

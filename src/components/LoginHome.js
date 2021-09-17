import React from "react";
import FooterBar from "./FooterBar";
import {
  Layout,
  Menu,
  Image,
  Divider,
  Space,
  Tag,
  Card,
  Button,
  Popover,
  Drawer,
  Input,
  Spin,
  message,
  Badge,
  Tooltip,
} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  HomeFilled,
  DashboardOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  PlusCircleTwoTone,
  InfoCircleOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import logo from "./logo.png";
import {
  fetchItems,
  addToCart,
  fetchCategory,
  allCategory,
  home,
  searchItem,
} from "../actions/index";
import history from "../history";

const {Header, Content} = Layout;
const {Search} = Input;
const {Meta} = Card;
class LoginHome extends React.Component {
  state = {visible: false, placement: "left", term: ""};
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchCategory();
  }
  //on change
  handleOnChange = (e) => {
    const {value} = e.target.value;
    if (value === "") {
      this.props.home();
    }
    this.setState({term: value});
  };
  //drawer
  showDrawer = () => {
    this.setState({visible: true});
  };
  //on drawer close
  onClose = () => {
    this.setState({visible: false});
  };
  //on serach bar
  onSearch = (value) => {
    console.log("search value", value);
    this.props.searchItem(value);
  };
  //logout
  handleLogOut = () => {
    history.push("/");
  };
  //redirect cart page
  rediredtCartPage = () => {
    history.push("/loginhome/cart");
  };
  //add to cart
  handleAddToCart = (id) => {
    this.props.addToCart(id);
    const success = () => {
      message.success("Added to cart");
    };
    success();
  };
  //admin page
  redirectAdminPage = () => {
    history.push("/loginhome/admin");
  };
  //handle all category
  handleAllCategory = (id) => {
    console.log("cat clicked", id);
    this.props.allCategory(id);
    this.setState({visible: false});
  };

  //render category
  renderCategory() {
    return this.props.category.map((item) => {
      return (
        <div key={item.id}>
          <Menu key={item.id}>
            <Menu.Item
              key={item.id}
              id={item.id}
              onClick={() => this.handleAllCategory(item.id)}
            >
              {item.cat_name}
            </Menu.Item>
          </Menu>
        </div>
      );
    });
  }
  //render items
  renderItems() {
    return this.props.items.map((item) => {
      return (
        <Content key={item.id} style={{}}>
          <Card
            value={item}
            id={item.id}
            hoverable
            alt={item.name}
            style={{
              alignItems: "center",
              justifyContent: "space-around",
              maxHeight: "400px",
              padding: "2%",
              flex: "0 0 200px",
              marginTop: "10px",
              maxWidth: "200px",
              marginBottom: "10px",
            }}
            cover={
              <Image
                id={item.id}
                alt={item.name}
                src={item.image}
                value={item}
                style={{height: "200px"}}
              />
            }
          >
            <Meta
              id={item.id}
              title={`${item.name} (${item.company})`}
              description={`Price :${item.price} ₹.`}
              style={{justifyContent: "center"}}
            />
            <Divider orientation="center" style={{color: "black"}}>
              <Tooltip title="Add To Cart" placement="right">
                <Button
                  style={{float: "left"}}
                  value={item.quantity}
                  onClick={() => this.handleAddToCart(item.id)}
                  disabled={item.quantity === 5 ? true : ""}
                >
                  <PlusCircleTwoTone style={{fontSize: "20px"}} />
                </Button>
              </Tooltip>
            </Divider>

            <Popover
              placement="bottomRight"
              title={item.name}
              content={item.description}
            >
              <Tag
                color="blue"
                icon={<InfoCircleOutlined />}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Description
              </Tag>
            </Popover>
          </Card>
        </Content>
      );
    });
  }
  //home
  handleHome = () => {
    this.props.home();
  };
  render() {
    const {placement, visible} = this.state;
    const items = this.props.items;
    const category = this.props.category;
    const loading = async () => {
      return await this.props.state;
    };
    if (loading === undefined) return <div>Loading...</div>;
    // if (items === undefined) <div>Loading...</div>;
    const addedItems = this.props.addedItems;
    // console.log("addeditems", addedItems.length);

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
            <div style={{float: "right"}}>
              <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item
                  key="1"
                  icon={<HomeFilled />}
                  onClick={this.handleHome}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  key="2"
                  icon={<ShoppingCartOutlined />}
                  onClick={this.rediredtCartPage}
                >
                  <Badge count={addedItems.length} className="head-example">
                    Cart{" "}
                  </Badge>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  icon={<DashboardOutlined />}
                  onClick={this.redirectAdminPage}
                >
                  Admin
                </Menu.Item>

                <Menu.Item
                  key="4"
                  icon={<LogoutOutlined />}
                  onClick={this.handleLogOut}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </div>
          </Header>
          <Layout
            style={{
              marginTop: "50px",
              height: "relative",
              background:
                "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
              filter:
                "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            }}
          >
            {/* drawer code start */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Space align="end" style={{padding: "20px", float: "right"}}>
                <Button
                  icon={<FilterOutlined style={{fontSize: "15px"}} />}
                  type="link"
                  onClick={this.showDrawer}
                >
                  Categories
                </Button>
                <Drawer
                  title="Filter Categories"
                  placement={placement}
                  key={placement}
                  visible={visible}
                  closable={false}
                  onClose={this.onClose}
                >
                  {category !== undefined ? (
                    this.renderCategory()
                  ) : (
                    <Spin tip="Loading..." />
                  )}
                </Drawer>
                <Search
                  suffix={<SearchOutlined />}
                  style={{
                    width: "450px",
                  }}
                  maxLength={20}
                  placeholder="Input Search Item Name"
                  allowClear
                  enterButton="Search"
                  size="middle"
                  onSearch={this.onSearch}
                  onChange={this.handleOnChange}
                />
              </Space>
            </div>
            {/* //drawer code end */}
            <div
              style={{
                background:
                  "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
                filter:
                  "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",

                maxWidth: "100%",
                justifyContent: "space-around",
                alignItems: "center",

                padding: "20px",
                marginBottom: "30px",
              }}
            >
              {items !== undefined ? (
                this.renderItems()
              ) : (
                <Spin tip="Loading..." />
              )}
            </div>
            <FooterBar />
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    state: state,
    items: Object.values(state.items),
    category: Object.values(state.category),
    addedItems: state.addedItems,
  };
};

export default connect(mapStateToProps, {
  fetchItems,
  addToCart,
  fetchCategory,
  allCategory,
  home,
  searchItem,
})(LoginHome);

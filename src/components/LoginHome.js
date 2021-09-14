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
  UnorderedListOutlined,
  PlusCircleTwoTone,
  InfoCircleOutlined,
  FilterTwoTone,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import logo from "./logo.png";
import {fetchItems, addToCart, fetchCategory} from "../actions/index";
import history from "../history";

const {Header, Content} = Layout;
const {Search} = Input;
const {Meta} = Card;
const {SubMenu} = Menu;
class LoginHome extends React.Component {
  state = {visible: false, placement: "left"};
  componentDidMount() {
    this.props.fetchItems();
    this.props.fetchCategory();
    const items = this.props.items;
    console.log("items", items);
  }
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
  //render category
  renderCategory() {
    return this.props.category.map((item) => {
      return (
        <div>
          <Menu key={item.id}>
            <Menu.Item
              key={item.id}
              id={item.id}
              // onClick={() => this.handleAllCategory(item.id)}
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
  render() {
    const {placement, visible} = this.state;
    const items = this.props.items;
    const category = this.props.category;
    if (category === undefined) <div>Loading...</div>;
    if (items === undefined) <div>Loading...</div>;
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
            <Menu mode="horizontal" style={{float: "right"}}>
              <Menu.Item key="0" icon={<HomeFilled />}>
                Home
              </Menu.Item>
              <Menu.Item key="1">
                <SubMenu
                  key="2"
                  title="Categories"
                  icon={<UnorderedListOutlined />}
                >
                  {category !== undefined ? (
                    this.renderCategory()
                  ) : (
                    <div>
                      {" "}
                      <Spin tip="Loading..." />
                    </div>
                  )}
                </SubMenu>
              </Menu.Item>
              <Menu.Item
                key="10"
                icon={<ShoppingCartOutlined />}
                onClick={this.rediredtCartPage}
              >
                <Badge count={addedItems.length} className="head-example">
                  Cart{" "}
                </Badge>
              </Menu.Item>
              <Menu.Item
                key="11"
                icon={<DashboardOutlined />}
                onClick={this.redirectAdminPage}
              >
                Admin
              </Menu.Item>

              <Menu.Item
                key="12"
                icon={<LogoutOutlined />}
                onClick={this.handleLogOut}
              >
                Logout
              </Menu.Item>
            </Menu>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Space align="end" style={{padding: "20px", float: "right"}}>
                <Button
                  icon={<FilterTwoTone style={{fontSize: "15px"}} />}
                  type="primary"
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
                    <div>
                      {" "}
                      <Spin tip="Loading..." />
                    </div>
                  )}
                </Drawer>
                <Search
                  style={{
                    width: "450px",
                  }}
                  maxLength={20}
                  placeholder="Input Search Item Name"
                  allowClear
                  enterButton="Search"
                  size="middle"
                  // onSearch={this.onSearch}
                />
              </Space>
            </div>
            <div
              style={{
                background:
                  "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
                filter:
                  "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                // height: "relative",
                maxWidth: "100%",
                justifyContent: "space-around",
                alignItems: "center",

                padding: "20px",
                marginBottom: "10px",
              }}
            >
              {items !== undefined ? (
                this.renderItems()
              ) : (
                <div>
                  {" "}
                  <Spin tip="Loading..." />
                </div>
              )}
            </div>
          </Layout>
        </Layout>
        <FooterBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    items: Object.values(state.items),
    category: Object.values(state.category),
    addedItems: state.addedItems,
  };
};

export default connect(mapStateToProps, {fetchItems, addToCart, fetchCategory})(
  LoginHome
);

import React from "react";
import {connect} from "react-redux";
import "antd/dist/antd.css";
import Footerbar from "./FooterBar";
import logo from "./logo.png";
import {
  Layout,
  Image,
  Button,
  message,
  Empty,
  Card,
  Divider,
  Menu,
  Badge,
  Row,
  Col,
  notification,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
  HomeFilled,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {remove, addQuantity, subQuantity, fetchItems} from "../actions";
import history from "../history";

const {Meta} = Card;
const {Header, Content} = Layout;

class CartDetails extends React.Component {
  state = {
    amount: 0,
  };
  componentDidMount() {}
  redirectLoginHome = () => {
    history.push("/loginhome");
  };
  redirectLogout = () => {
    history.push("/");
  };
  handleIncrease = (id) => {
    const items = this.props.addedItems;
    let selectedId = items.find((item) => item.id === id);
    if (selectedId === undefined) {
      notification.error({message: "Go to Home"});
    }
    this.props.addQuantity(id);
  };
  handleDecrease = (id) => {
    this.props.subQuantity(id);
  };
  handleRemove = (id) => {
    this.props.remove(id);
    const success = () => {
      message.success("Item removed from cart");
    };
    success();
  };

  render() {
    let product =
      this.props.addedItems.length && this.props.total !== 0 ? (
        this.props.addedItems.map((item) => {
          if (item === undefined) return <div>Go To Home</div>;
          return (
            <Card
              key={item.id}
              value={item}
              id={item.id}
              hoverable
              alt={item.name}
              style={{
                alignItems: "center",
                maxHeight: "400px",
                padding: "5px",

                marginTop: "20px",
                maxWidth: "220px",
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
              <div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Meta
                    id={item.id}
                    title={`${item.name} (${item.company})`}
                    description={`Price :${item.price} `}
                  />
                </div>
                <Divider orientation="center" style={{color: "black"}}>
                  Quantity.
                  <Button
                    type="link"
                    disabled={item.quantity === 5 ? true : false}
                    icon={
                      <CaretUpOutlined
                        style={{fontSize: "25px"}}
                        onClick={() => this.handleIncrease(item.id)}
                      />
                    }
                  />
                  {`${item.quantity}`}
                  {item.quantity === 5
                    ? notification.warning({
                        message: "Information",
                        description:
                          "User can oreder 5(nos) of items per product.",
                        placement: "topLeft",
                        style: {background: "#F8EA8C"},
                      })
                    : ""}
                  <CaretDownOutlined
                    style={{fontSize: "25px"}}
                    onClick={() => this.handleDecrease(item.id)}
                  />
                </Divider>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    this.handleRemove(item.id);
                  }}
                  icon={<DeleteOutlined />}
                >
                  Remove
                </Button>{" "}
              </div>
            </Card>
          );
        })
      ) : (
        <Empty description={<span>Empty Cart! Add item from Home</span>} />
      );
    let total = this.props.total;
    const addedItems = this.props.addedItems;

    return (
      <div>
        <Layout className="content">
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
            <Row>
              <Col span={10} offset={16}>
                <Menu mode="horizontal">
                  <Menu.Item
                    key="1"
                    icon={<HomeFilled />}
                    onClick={this.redirectLoginHome}
                  >
                    Home
                  </Menu.Item>
                  <Menu.Item key="2" icon={<ShoppingCartOutlined />}>
                    <Badge count={addedItems.length} className="head-example">
                      Cart
                    </Badge>
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    icon={<LogoutOutlined />}
                    onClick={this.redirectLogout}
                  >
                    Logout
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              height: addedItems.length === 0 ? "97vh" : "relative",
              marginBottom: "20px",

              padding: "10px",
              background:
                "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
              filter:
                "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            }}
          >
            <div>
              <h1
                style={{
                  marginTop: "60px",
                  alignItems: "center",
                }}
              >
                You have ordered
              </h1>
              <div>
                <strong>Total price:</strong>{" "}
                {addedItems.length === 0 ? 0 : total} ₹.
                {addedItems.length === 0 ? (
                  ""
                ) : (
                  <div style={{float: "right"}}>
                    <Link to="/loginhome/cart/checkout">
                      <Button type="primary">Place Order</Button>
                    </Link>
                  </div>
                )}
              </div>

              <div
                style={{
                  maxHeight: addedItems.length === 0 ? "96vh" : "relative",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {product}
              </div>
            </div>
            <Footerbar />
          </Content>
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reduxState: state,
    items: state.items,
    total: state.total,
    addedItems: state.addedItems,
  };
};
export default connect(mapStateToProps, {
  remove,
  addQuantity,
  subQuantity,
  fetchItems,
})(CartDetails);

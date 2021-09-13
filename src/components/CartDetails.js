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
  Space,
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
import {remove, addQuantity, subQuantity} from "../actions";
import history from "../history";

const {Meta} = Card;
const {
  Header,
  Content,
  // Footer,
} = Layout;

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
                // flex: "0 0 200px",
                marginTop: "20px",
                maxWidth: "200px",
                // marginBottom: "10px",
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
                  <Button
                    icon={
                      <CaretUpOutlined
                        style={{fontSize: "20px"}}
                        onClick={() => this.handleIncrease(item.id)}
                      />
                    }
                  />
                  {`qty. ${item.quantity}`}
                  <Button
                    icon={
                      <CaretDownOutlined
                        style={{fontSize: "20px"}}
                        onClick={() => this.handleDecrease(item.id)}
                      />
                    }
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

    console.log("All total", total);
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
            <Menu mode="horizontal" style={{float: "right"}}>
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
                key="4"
                icon={<LogoutOutlined />}
                onClick={this.redirectLogout}
              >
                Logout
              </Menu.Item>
            </Menu>
          </Header>
          <Content
            style={{
              height: "relative",
              marginBottom: "50px",
              // alignItems: "center",
              padding: "10px",
              background:
                "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
              filter:
                "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            }}
          >
            <h1
              style={{
                marginTop: "60px",
                alignContent: "center",
              }}
            >
              You have ordered
            </h1>
            <div>
              <p>
                <strong>Total price:</strong> {total} ₹.
                {this.props.count === 0 ? (
                  ""
                ) : (
                  <Link to="/loginhome/checkout/">
                    <Button type="primary" style={{float: "right"}}>
                      Place Order
                    </Button>
                  </Link>
                )}
              </p>
            </div>

            <div
              style={{
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

            <div>
              <p>
                <strong>Total price:</strong> {total} ₹.
                {this.props.count === 0 ? (
                  ""
                ) : (
                  <Link to="/loginhome/checkout/">
                    <Button type="primary" style={{float: "right"}}>
                      Place Order
                    </Button>
                  </Link>
                )}
              </p>
            </div>
          </Content>
          {/* footer from reusable component */}
        </Layout>
        <Footerbar />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.products.items,
    total: state.total,
    addedItems: state.addedItems,
  };
};
export default connect(mapStateToProps, {remove, addQuantity, subQuantity})(
  CartDetails
);

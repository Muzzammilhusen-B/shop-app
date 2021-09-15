import React from "react";
import {Layout, Row, Col, Button, Image, Menu, Badge, Result} from "antd";
import {
  HomeFilled,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";
import logo from "./logo.png";
import Footerbar from "./FooterBar";
import {connect} from "react-redux";

const {Header, Content} = Layout;
class Success extends React.Component {
  handleBuy = () => {
    const {history} = this.props;
    if (history) history.push("/loginhome");
  };
  render() {
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
                  <Menu.Item
                    key="2"
                    icon={<ShoppingCartOutlined />}
                    onClick={this.redirectCart}
                  >
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
        </Layout>
        <Layout
          style={{
            height: "94vh",
            padding: "10px",
            background:
              "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
            filter:
              "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
          }}
        >
          <Content style={{padding: "20px", marginTop: "50px"}}>
            <Result
              status="success"
              title="Successfully purchased"
              subTitle={`Order number: ${Math.floor(
                Math.random() * 10000000 + 1
              )}`}
              extra={[
                <Button type="primary" onClick={this.handleBuy} key="buy">
                  Buy Again
                </Button>,
              ]}
            />
          </Content>
        </Layout>
        <Footerbar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
  };
};
export default connect(mapStateToProps)(Success);

import React from "react";
import "antd/dist/antd.css";
import {Layout, Space} from "antd";
import {ShoppingTwoTone} from "@ant-design/icons";

const {Footer} = Layout;
const Footerbar = () => {
  return (
    <Layout>
      <Footer
        style={{
          textAlign: "center",

          clear: "both",

          position: "fixed",
          bottom: "0",
          width: "100%",
          height: "20px",
          justifyContent: "center",
        }}
      >
        <Space>
          <ShoppingTwoTone style={{fontSize: "20px"}} />
          React practicle App ©2021.
        </Space>
      </Footer>
    </Layout>
  );
};

export default Footerbar;

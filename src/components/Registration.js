import React from "react";
import logo from "./logo.png";
import history from "../history";
import {
  Layout,
  Tooltip,
  Image,
  Menu,
  Button,
  Form,
  Input,
  message,
  Typography,
  Spin,
} from "antd";
import {Link} from "react-router-dom";
import {
  LoginOutlined,
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./signup.css";
import "antd/dist/antd.css";
import Footerbar from "./FooterBar";

const {Header, Content} = Layout;
const {Title} = Typography;
class Registration extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    spin: false,
    errors: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
    },
  };

  //onchange

  handleOnChange = (event) => {
    const {name, value} = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "first_name":
        errors.first_name = !value.match(
          /^(?=[a-zA-Z]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "*firstname must be at least 5 characters long and without special character!"
          : "";
        break;
      case "last_name":
        errors.last_name = !value.match(
          /^(?=[a-zA-Z]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        )
          ? "*lastname must be at least 3 characters long and without special character!"
          : "";
        break;
      case "email":
        let lastAtPos = value.lastIndexOf("@");
        let lastDotPos = value.lastIndexOf(".");
        errors.email = !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          value.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          value.length - lastDotPos > 2
        )
          ? "*Email is not valid"
          : "";
        break;
      case "password":
        errors.password = !value.match(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,1000}$"
        )
          ? "*Password should contain one smallcase, uppercase, symbol & number each and min 6 characters."
          : "";
        break;
      case "confirmpassword":
        let pass1 = this.state.password;
        errors.confirmpassword =
          value !== pass1 ? "*Password do not match." : "";
        break;

      case "phone":
        errors.phone = !value.match("^(?=.*?[0-9])(?=.*[+]).{13}$")
          ? "Please Enter valid mobile number!"
          : "";
        break;
      default:
        break;
    }
    this.setState({errors, [name]: value});
  };

  //handle validation
  handleValidation = () => {
    let formIsValid = true;
    const {first_name, last_name, email, password, confirmpassword, phone} =
      this.state.errors;

    let formerror =
      first_name === "" &&
      last_name === "" &&
      password === "" &&
      confirmpassword === "" &&
      email === "" &&
      phone === "";

    if (formerror) {
      const {first_name, last_name, email, password, confirmpassword, phone} =
        this.state;
      if (
        first_name === "" ||
        last_name === "" ||
        password === "" ||
        confirmpassword === "" ||
        email === "" ||
        phone === ""
      ) {
        return false;
      }
      return formIsValid;
    }
    return false;
  };

  //if valid form redirect to product home(dashboard) page
  redirectLoginPage = () => {
    const {history} = this.props;
    if (history) history.push("/loginpage");
  };

  //handle signup
  handleSignup = async (e) => {
    const {first_name, last_name, email, password, phone} = this.state;
    e.preventDefault();

    if (this.handleValidation(this.state.errors)) {
      this.setState({spin: true});
      const registration = {
        first_name,
        last_name,
        email,
        password,
        phone,
      };
      localStorage.setItem("registration", JSON.stringify(registration));
      history.push("/");
      const success = () => {
        message.success("User created successfully.");
      };
      success();
    } else if (!this.handleValidation(this.state.errors)) {
      this.setState({spin: false});
      const error = () => {
        message.error("Please input valid credentials!");
      };
      error();
    }
  };
  //login page
  loginPage = () => {
    history.push("/");
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmpassword,
      errors,
      phone,
    } = this.state;
    return (
      <Layout>
        <Spin spinning={this.state.spin} tip="Creating an account...">
          <Header
            style={{
              background: "white",
              zIndex: 1,
              width: "100%",
              position: "fixed",
            }}
          >
            <div style={{float: "left"}}>
              <Tooltip title="Home" placement="bottom">
                <Link to="/">
                  <Image
                    src={logo}
                    width={"150px"}
                    style={{
                      padding: "10px",
                    }}
                    preview={false}
                  />
                </Link>
              </Tooltip>
            </div>
            <Menu style={{float: "right"}} mode="horizontal" theme="light">
              <Menu.Item
                key="signin"
                onClick={this.loginPage}
                icon={<LoginOutlined />}
              >
                SignIn
              </Menu.Item>
            </Menu>
          </Header>
          <Layout
            className="layout"
            style={{
              background:
                "-webkit-linear-gradient(90deg, hsla(332, 53%, 82%, 1) 0%, hsla(176, 57%, 89%, 1) 100%)",
              filter:
                "progid:DXImageTransform.Microsoft.gradient( startColorstr=#E9B7CE, endColorstr=#D3F3F1, GradientType=1 )",
            }}
          >
            <Content
            // style={{ marginTop: "60px" }}
            >
              <div className="form-layout">
                <Title>Register</Title>
                <Form layout="vertical" style={{width: "400px"}}>
                  <Form.Item>
                    <Input
                      placeholder="First Name"
                      name="first_name"
                      value={first_name}
                      onChange={this.handleOnChange}
                      prefix={<UserOutlined />}
                      required
                    />
                    <h5 className="errors">{errors["first_name"]}</h5>
                  </Form.Item>

                  <Form.Item>
                    <Input
                      placeholder="Last Name"
                      name="last_name"
                      value={last_name}
                      onChange={this.handleOnChange}
                      required
                      prefix={<UserOutlined />}
                    />
                    <h5 className="errors">{errors["last_name"]}</h5>
                  </Form.Item>

                  <Form.Item>
                    <Input
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleOnChange}
                      required
                      prefix={<MailOutlined />}
                    />
                    <h5 className="errors">{errors["email"]}</h5>
                  </Form.Item>

                  <Form.Item>
                    <Input.Password
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleOnChange}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      required
                    />
                    <h5 className="errors">{errors["password"]}</h5>
                  </Form.Item>

                  <Form.Item>
                    <Input.Password
                      name="confirmpassword"
                      placeholder="ConfirmPassword"
                      value={confirmpassword}
                      onChange={this.handleOnChange}
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      required
                    />
                    <h5 className="errors">{errors["confirmpassword"]}</h5>
                  </Form.Item>

                  <Form.Item>
                    <Input
                      required
                      name="phone"
                      maxLength="13"
                      placeholder="+91 **********"
                      value={phone}
                      onChange={this.handleOnChange}
                      prefix={<PhoneOutlined />}
                    />
                    <h5 className="errors">{errors["phone"]}</h5>
                  </Form.Item>

                  <h5>
                    *By signing up, you agree to Shop App{" "}
                    <Link to="/signuppage">
                      <u>Terms of Service.</u>
                    </Link>
                  </h5>
                  <Button
                    type="primary"
                    style={{width: "100%"}}
                    onClick={this.handleSignup}
                    icon={<LoginOutlined />}
                  >
                    Sign up
                  </Button>
                  <h4>
                    Already have an account?{" "}
                    <Link to="/loginpage">
                      <u>
                        <LoginOutlined />
                        Login Here!
                      </u>
                    </Link>
                  </h4>
                </Form>
              </div>
            </Content>
          </Layout>
          <Footerbar />
        </Spin>
      </Layout>
    );
  }
}
export default Registration;

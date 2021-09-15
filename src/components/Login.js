import React from "react";
import history from "../history";
import {v4 as uuidv4} from "uuid";
import "antd/dist/antd.css";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Layout,
  Menu,
  Tooltip,
  Image,
  Typography,
  Spin,
  message,
} from "antd";
import {
  MailOutlined,
  LockOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import logo from "./logo.png";
import "./login.css";
import {Link} from "react-router-dom";
import FooterBar from "./FooterBar";

const {Header, Content} = Layout;
const {Title} = Typography;
class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
    remember: false,
    spin: false,
    errors: {
      email: "",
      password: "",
    },
  };

  async componentDidMount() {
    const {email, password, remember} = this.state;
    this.setState({
      email: email,
      password: password,
      remember: remember,
    });
  }

  //on change event
  handleOnChange = (event) => {
    const {name, value} = event.target;
    const checkbox = event.target.checked;

    const isChecked = checkbox ? true : false;

    //switch statement for validation
    let {errors} = this.state;
    switch (name) {
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
          ? "*Password should contain one smallcase, uppercase, symbol & number each and minimum 6 in length"
          : "";
        break;

      default:
        break;
    }
    this.setState({errors, [name]: value, remember: isChecked});
  };
  //handle validation
  handleValidation = () => {
    let formIsValid = true;
    if (this.state.errors.email === "" && this.state.errors.password === "") {
      const {email, password} = this.state;
      if (email === "" || password === "") {
        return false;
      }
      return formIsValid;
    }
    return false;
  };
  //handle login
  handleLogin = async (e) => {
    e.preventDefault();
    const {remember, email, password} = this.state;
    const registered = JSON.parse(localStorage.getItem("registration"));

    if (registered === null) {
      const warning = () => {
        message.warning("Email not found! Signup First...");
      };
      warning();
      return undefined;
    }
    const matched =
      registered.email === email && registered.password === password
        ? true
        : false;

    if (remember && this.handleValidation(this.state.errors) && matched) {
      this.setState({spin: true});
      const succcess = () => {
        message.success("Login Successfully.");
      };
      succcess();
      const response = {
        id: uuidv4(),
        email,
        password,
      };
      localStorage.setItem("user", JSON.stringify(response));
      history.push("/loginhome");
    } else if (this.handleValidation(this.state.errors) && matched) {
      this.setState({spin: true});
      const succcess = () => {
        message.success("Login Successfully.");
      };
      succcess();
      history.push("/loginhome");
    } else {
      const error = () => {
        message.error("Incorrect Email or Password !");
      };
      error();
    }
  };

  signupPage = () => {
    history.push("/registration");
  };

  render() {
    const {username, password, errors} = this.state;
    return (
      <Layout>
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
              key="signup"
              onClick={this.signupPage}
              icon={<UserAddOutlined />}
            >
              Signup
            </Menu.Item>
          </Menu>
        </Header>
        <Spin spinning={this.state.spin} tip="Logging in account...">
          <Content className="layout">
            <div className="login-form">
              <Title>LogIn</Title>
              <Form layout="vertical" style={{width: "400px"}}>
                <Form.Item label="Email" rules={[{required: true}]}>
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    value={username}
                    onChange={this.handleOnChange}
                    name="email"
                    placeholder="Email"
                  />
                  <h4 style={{color: "red"}}>{errors["email"]}</h4>
                </Form.Item>
                <Form.Item label="Password" rules={[{required: true}]}>
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    onChange={this.handleOnChange}
                    value={password}
                    name="password"
                    placeholder="Password"
                  />
                  <h4 style={{color: "red"}}>{errors["password"]}</h4>
                </Form.Item>

                <Checkbox onChange={this.handleOnChange} name="remember">
                  Remember Me
                </Checkbox>

                <Form.Item name="login">
                  <Button
                    type="primary"
                    style={{width: "100%", marginTop: "5px"}}
                    icon={<LoginOutlined />}
                    onClick={this.handleLogin}
                  >
                    Log In
                  </Button>
                </Form.Item>
                <h3>
                  Don't have an account?{" "}
                  <Link to="/registration">
                    Register <UserAddOutlined />
                  </Link>
                </h3>
              </Form>
            </div>
          </Content>
        </Spin>
        <FooterBar />
      </Layout>
    );
  }
}

export default LogIn;

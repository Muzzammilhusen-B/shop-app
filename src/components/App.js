import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import history from "../history";
import "antd/dist/antd.css";
import LogIn from "./Login";
import Registration from "./Registration";
import LoginHome from "./LoginHome";
import CartDetails from "./CartDetails";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/registration" exact component={Registration} />
          <Route path="/loginhome" exact component={LoginHome} />
          <Route path="/loginhome/cart" exact component={CartDetails} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import reducer from "./reducers/reducer";
import reduxThunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>,
  document.querySelector("#root")
);

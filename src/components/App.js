import React, {useState} from "react";
import {Button} from "antd";
import api from "../apis/api";

const App = () => {
  const [show, setShow] = useState([]);
  const showProduct = async (e) => {
    e.preventDefault();
    const {data} = await api.get("/products");
    console.log("response", data);
    setShow(data);
  };
  return (
    <div>
      App
      <Button onClick={showProduct}>Show</Button>
      {show.map((el) => (
        <p key={el.id}>{el.name}</p>
      ))}
    </div>
  );
};

export default App;

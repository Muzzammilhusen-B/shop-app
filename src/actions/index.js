import {
  ADD_QUANTITY,
  ADD_TO_CART,
  FETCH_DATA,
  REMOVE_ITEM,
  SUB_QUANTITY,
} from "./type";
import api from "../apis/api";

//fetch data
export const fetchData = () => async (dispatch) => {
  const response = await api.get("/products");
  console.log("resaction", response.data);
  dispatch({
    type: FETCH_DATA,
    payload: response.data,
  });
};

//add to cart
export const addToCart = (id) => async (dispatch) => {
  dispatch({type: ADD_TO_CART, id});
};
//remove from cart
export const remove = (id) => async (dispatch) => {
  dispatch({type: REMOVE_ITEM, id});
};
//add quantity
export const addQuantity = (id) => async (dispatch) => {
  dispatch({type: ADD_QUANTITY, id});
};
//sutract quantity
export const subQuantity = (id) => async (dispatch) => {
  dispatch({type: SUB_QUANTITY, id});
};

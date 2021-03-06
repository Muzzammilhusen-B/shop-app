import {
  ADD_QUANTITY,
  ADD_TO_CART,
  FETCH_ITEMS,
  FETCH_CATEGORY,
  REMOVE_ITEM,
  SUB_QUANTITY,
  REMOVE_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_PRODUCT,
  ADD_PRODUCT,
  ALLCATEGORY,
  HOME,
  EDIT_PRODUCT,
  SEARCH_ITEM,
  CHECKOUT,
  EMPTY,
} from "./type";
import api from "../apis/api";
import history from "../history";

//fetch items
export const fetchItems = () => async (dispatch) => {
  const response = await api.get("/items");
  // console.log("resaction", response.data);
  dispatch({
    type: FETCH_ITEMS,
    payload: response.data,
  });
};
//fetch category
export const fetchCategory = () => async (dispatch) => {
  const response = await api.get("/category");
  // console.log("resaction", response.data);
  dispatch({
    type: FETCH_CATEGORY,
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
//remove category
export const removeCategory = (id) => async (dispatch) => {
  await api.delete(`/category/${id}`);
  dispatch({type: REMOVE_CATEGORY, id});
  history.push("/loginhome/admin/category");
};
//add category
export const addCategory = (data) => async (dispatch) => {
  const response = await api.post("/category", data);
  dispatch({type: ADD_CATEGORY, payload: response.data});
  history.push("/loginhome/admin/category");
};
//edit category
export const editCategory = (data) => async (dispatch) => {
  const {id} = data;
  const response = await api.patch(`/category/${id}`, data);
  dispatch({type: EDIT_CATEGORY, payload: response.data});
};

//remove product
export const removeProduct = (id) => async (dispatch) => {
  await api.delete(`/items/${id}`);
  dispatch({type: REMOVE_PRODUCT, id});
  history.push("/loginhome/admin/product");
};
//add product
export const addProduct = (data) => async (dispatch) => {
  const response = await api.post("/items", data);
  dispatch({type: ADD_PRODUCT, payload: response.data});
  history.push("/loginhome/admin/product");
};
//edit product
export const editProduct = (data) => async (dispatch) => {
  const {id} = data;
  const response = await api.patch(`/items/${id}`, data);
  dispatch({type: EDIT_PRODUCT, payload: response.data});
  history.push("/loginhome/admin/product");
};
//handle all categorywise display
export const allCategory = (id) => async (dispatch) => {
  const response = await api.get(`/items/`);
  dispatch({type: ALLCATEGORY, payload: [response.data, id]});
  history.push("/loginhome");
};
//all items on click home display
export const home = () => async (dispatch) => {
  const response = await api.get("/items");
  dispatch({type: HOME, payload: response.data});
  history.push("/loginhome");
};
//search items
export const searchItem = (value) => async (dispatch) => {
  const response = await api.get("/items");
  dispatch({type: SEARCH_ITEM, payload: [response.data, value]});
};
//checkout
export const checkout = () => {
  return {type: CHECKOUT};
};
//EMPTY CART
export const empty = () => async (dispatch) => {
  dispatch({type: EMPTY});
};

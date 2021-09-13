// import _ from "lodash";

import {
  ADD_QUANTITY,
  ADD_TO_CART,
  FETCH_DATA,
  REMOVE_ITEM,
  SUB_QUANTITY,
} from "../actions/type";
import api from "../apis/api";

const initialState = {
  products: async () => {
    return await api.get("/products");
  },
  addedItems: [],
  total: 0,
};

const reducer = (state = initialState, action) => {
  //fetch data
  if (action.type === FETCH_DATA) {
    let data = action.payload;
    console.log("data", data);
    return {
      ...state,
      products: data,
    };
  }
  //ADD TO CART
  if (action.type === ADD_TO_CART) {
    let addedItem = state.products.items.find((item) => item.id === action.id);
    // console.log("addeditems", addedItems);
    let existedItem = state.addedItems.find((item) => action.id === item.id);
    if (existedItem) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: state.total + addedItem.price,
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  //remove from cart
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => item.id === action.id);
    let newItems = state.addedItems.filter((item) => item.id !== action.id);
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    return {
      ...state,
      total: newTotal,
      addedItems: newItems,
    };
  }
  //add quantity
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.products.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  //sutract quantity
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.products.items.find((item) => action.id === item.id);
    //if qty=0 then it should remove from cart
    if (addedItem.quantity === 1) {
      let newItems = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: newItems,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }
  //default state return
  return state;
};
export default reducer;

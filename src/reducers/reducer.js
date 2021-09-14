// import _ from "lodash";
import {responsiveArray} from "antd/lib/_util/responsiveObserve";
import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_QUANTITY,
  ADD_TO_CART,
  FETCH_CATEGORY,
  FETCH_ITEMS,
  REMOVE_CATEGORY,
  REMOVE_ITEM,
  REMOVE_PRODUCT,
  SUB_QUANTITY,
} from "../actions/type";
import api from "../apis/api";

const items = async () => {
  const response = await api.get("/items");
  return response.data;
};
const category = async () => {
  const response = await api.get("/category");
  return response.data;
};
const initialState = {
  items: items(),
  category: category(),
  addedItems: [],
  total: 0,
};

const reducer = (state = initialState, action) => {
  //fetch items
  if (action.type === FETCH_ITEMS) {
    console.log("initial state", state);
    let data = action.payload;
    console.log("redu items", data);
    return {
      ...state,
      items: data,
    };
  }
  //fetch CATEGORY
  if (action.type === FETCH_CATEGORY) {
    let data = action.payload;
    console.log("redu cate", data);
    return {
      ...state,
      category: data,
    };
  }
  //ADD TO CART
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item.id === action.id);
    // console.log("addeditems", addedItems);
    let existedItem = state.addedItems.find((item) => action.id === item.id);
    if (existedItem) {
      addedItem.quantity += 1;
      return {
        ...state,
        total: parseInt(state.total) + parseInt(addedItem.price),
      };
    } else {
      addedItem.quantity = 1;
      let newTotal = parseInt(state.total) + parseInt(addedItem.price);
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
    let newTotal =
      parseInt(state.total) -
      parseInt(itemToRemove.price * itemToRemove.quantity);
    return {
      ...state,
      total: newTotal,
      addedItems: newItems,
    };
  }
  //add quantity
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = parseInt(state.total) + parseInt(addedItem.price);
    return {
      ...state,
      total: newTotal,
    };
  }
  //sutract quantity
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => action.id === item.id);
    //if qty=0 then it should remove from cart
    if (addedItem.quantity === 1) {
      let newItems = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = parseInt(state.total) - parseInt(addedItem.price);
      return {
        ...state,
        addedItems: newItems,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = parseInt(state.total) - parseInt(addedItem.price);
      return {
        ...state,
        total: newTotal,
      };
    }
  }
  //remove category
  if (action.type === REMOVE_CATEGORY) {
    let newCategory = state.category.filter((item) => item.id !== action.id);
    console.log("todel cat", newCategory);

    return {
      ...state,
      category: newCategory,
    };
  }
  //add category
  if (action.type === ADD_CATEGORY) {
    let addedCat = action.payload;
    console.log("added cate", addedCat);
    return {
      ...state,
      category: [...state.category, addedCat],
    };
  }

  //remove product
  if (action.type === REMOVE_PRODUCT) {
    let newProduct = state.category.filter((item) => item.id !== action.id);
    console.log("todel cat", newProduct);

    return {
      ...state,
      items: newProduct,
    };
  }
  //add product
  if (action.type === ADD_PRODUCT) {
    let addedPro = action.payload;
    console.log("added cate", addedPro);
    return {
      ...state,
      items: [...state.items, addedPro],
    };
  }
  //default state return
  return state;
};
export default reducer;

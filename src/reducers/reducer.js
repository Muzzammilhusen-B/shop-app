// import _ from "lodash";
import {
  ADD_CATEGORY,
  ADD_PRODUCT,
  ADD_QUANTITY,
  ADD_TO_CART,
  ALLCATEGORY,
  CHECKOUT,
  EDIT_CATEGORY,
  EDIT_PRODUCT,
  FETCH_CATEGORY,
  FETCH_ITEMS,
  HOME,
  REMOVE_CATEGORY,
  REMOVE_ITEM,
  REMOVE_PRODUCT,
  SEARCH_ITEM,
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
    // console.log("initial state", state);
    let data = action.payload;
    // console.log("redu items", data);
    return {
      ...state,
      items: data,
    };
  }
  //fetch CATEGORY
  if (action.type === FETCH_CATEGORY) {
    let data = action.payload;
    // console.log("redu cate", data);
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
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let newItems = state.addedItems.filter((item) => action.id !== item.id);
    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    return {
      ...state,
      addedItems: newItems,
      total: newTotal,
    };
  }
  //add quantity
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.total + addedItem.price;
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
  //remove category
  if (action.type === REMOVE_CATEGORY) {
    let newCategory = state.category.filter((item) => item.id !== action.id);
    // console.log("todel cat", newCategory);

    return {
      ...state,
      category: newCategory,
    };
  }
  //add category
  if (action.type === ADD_CATEGORY) {
    let addedCat = action.payload;
    // console.log("added cate", addedCat);
    return {
      ...state,
      category: [...state.category, addedCat],
    };
  }
  //edit category
  if (action.type === EDIT_CATEGORY) {
    return {
      ...state,
    };
  }

  //remove product
  if (action.type === REMOVE_PRODUCT) {
    let newProduct = state.items.filter((item) => item.id !== action.id);
    // console.log("todel cat", newProduct);

    return {
      ...state,
      items: newProduct,
    };
  }
  //add product
  if (action.type === ADD_PRODUCT) {
    let addedPro = action.payload;
    // console.log("added cate", addedPro);
    return {
      ...state,
      items: [...state.items, addedPro],
    };
  }
  //edit product
  if (action.type === EDIT_PRODUCT) {
    return {
      ...state,
    };
  }
  //specific category display handle
  if (action.type === ALLCATEGORY) {
    let selectedCategory = action.payload;
    console.log("all cat data", selectedCategory[1]);
    let elCategory = state.category.find(
      (item) => item.id === selectedCategory[1]
    );
    localStorage.setItem("items", JSON.stringify(selectedCategory[0]));
    const allItems = JSON.parse(localStorage.getItem("items"));
    // console.log("all items", allItems);
    let itemsToDisplay = allItems.filter(
      (item) => item.categoryName === elCategory.cat_name
    );
    // console.log("items.display", itemsToDisplay);
    if (itemsToDisplay.length > 0) {
      return Object.assign({}, state, {items: itemsToDisplay});
    } else {
      return {state, items: allItems};
    }
  }
  //home cliick all items
  if (action.type === HOME) {
    const allItems = action.payload;
    return {...state, items: allItems};
  }
  //search items
  if (action.type === SEARCH_ITEM) {
    let terms = action.payload;
    let search = terms[1];
    console.log("searching", terms);
    let data = terms[0];
    let toDisplay = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    if (search === "") {
      return {
        ...state,
        items: data,
      };
    } else {
      return {
        ...state,
        items: toDisplay,
      };
    }
  }
  //checout process
  if (action.type === CHECKOUT) {
    let newItem = [];
    let newTotal = 0;
    return {
      ...state,
      addedItems: newItem,
      total: newTotal,
    };
  }
  //default state return
  return state;
};
export default reducer;

import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";

import commonStates from "./Reducers/Common";
import categoryState from "./Reducers/Category";
import productState from "./Reducers/Product";

const combinedReducer = {
  common: commonStates,
  category: categoryState,
  product: productState,
};

const store = createStore(combineReducers(combinedReducer), applyMiddleware(ReduxThunk));
export default store;

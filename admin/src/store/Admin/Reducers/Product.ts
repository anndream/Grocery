import { productActionTypes } from "../ActionCreators/Product";

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case productActionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
      };

    default:
      return state;
  }
};

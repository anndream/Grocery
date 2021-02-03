import { categoryActionTypes } from "../ActionCreators/Category";

const initialState = {
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case categoryActionTypes.GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories,
      };

    default:
      return state;
  }
};

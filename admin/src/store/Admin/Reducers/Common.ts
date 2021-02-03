import { commonActionTypes } from "store/Admin/ActionCreators/Common";

const initialState = {
  notificationMessage: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case commonActionTypes.SET_LOADER:
      return {
        ...state,
        loading: true,
      };

    case commonActionTypes.UNSET_LOADER:
      return {
        ...state,
        loading: false,
      };

    case commonActionTypes.ON_SUCCESS:
      return {
        ...state,
        notificationMessage: action.data.message || "Operation succeeded",
        error: null,
      };

    case commonActionTypes.ON_FAILURE:
      return {
        ...state,
        notificationMessage: action.data.message || "Operation failed",
        error: action.data.message || "Operation failed",
      };

    default:
      return state;
  }
};

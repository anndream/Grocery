import fetcher from "services/fetcher";
import { commonActionCreators } from "./Common";
import makeActionCreator from "./MakeActionCreator";

const productUrl = `/products`;

export const productActionTypes = {
  GET_PRODUCTS: "GET_PRODUCTS",
};

export const getProducts = () => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.get(productUrl);
    if (response.ok) {
      let { data } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(
        makeActionCreator(productActionTypes.GET_PRODUCTS, {
          products: data,
        })
      );
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(ex);
    dispatch(commonActionCreators.ON_FAILURE("Error on product fetch"));
  }
};

export const saveProduct = product => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.post(productUrl, product);
    if (response.ok) {
      let { message } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(commonActionCreators.ON_SUCCESS(message));
      dispatch(getProducts());
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(JSON.stringify(ex));
    dispatch(commonActionCreators.ON_FAILURE("Error on product create"));
  }
};

export const updateProduct = (product, id) => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.put(productUrl + "/" + id, product);
    if (response.ok) {
      let { message } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(commonActionCreators.ON_SUCCESS(message));
      dispatch(getProducts());
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(JSON.stringify(ex));
    dispatch(commonActionCreators.ON_FAILURE("Error on product update"));
  }
};

export const removeProduct = id => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.delete(productUrl + "/" + id);
    if (response.ok) {
      let { message } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(commonActionCreators.ON_SUCCESS(message));
      dispatch(getProducts());
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(JSON.stringify(ex));
    dispatch(commonActionCreators.ON_FAILURE("Error on product deletion"));
  }
};

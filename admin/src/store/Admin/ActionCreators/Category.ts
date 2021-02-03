import axios from "axios";
import fetcher from "services/fetcher";
import { commonActionCreators } from "./Common";
import makeActionCreator from "./MakeActionCreator";

const categoryUrl = `/categories`;
const subCategoryQUery = "?include=subCategories";

export const categoryActionTypes = {
  GET_CATEGORIES: "GET_CATEGORIES",
  CREATE_CATEGORY: "CREATE_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY",
  PLACED_BID: "DELETE_CATEGORY",

  DONE: "DONE",
  FAILED: "FAILED",
};

export const getCategories = () => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.get(categoryUrl);
    if (response.ok) {
      let { data } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(
        makeActionCreator(categoryActionTypes.GET_CATEGORIES, {
          categories: data,
        })
      );
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(ex);
    dispatch(commonActionCreators.ON_FAILURE("Error on category fetch"));
  }
};

export const saveCategory = category => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.post(categoryUrl, category);
    if (response.ok) {
      let { message } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(commonActionCreators.ON_SUCCESS(message));
      dispatch(getCategories());
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(JSON.stringify(ex));
    dispatch(commonActionCreators.ON_FAILURE("Error on category create"));
  }
};

export const updateCategory = (category, id) => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.put(categoryUrl + "/" + id, category);
    if (response.ok) {
      let { message } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(commonActionCreators.ON_SUCCESS(message));
      dispatch(getCategories());
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(JSON.stringify(ex));
    dispatch(commonActionCreators.ON_FAILURE("Error on category update"));
  }
};

export const removeCategory = id => async dispatch => {
  dispatch(commonActionCreators.SET_LOADER());

  try {
    let response = await fetcher.delete(categoryUrl + "/" + id);
    if (response.ok) {
      let { message } = await response.json();

      dispatch(commonActionCreators.UNSET_LOADER());
      dispatch(commonActionCreators.ON_SUCCESS(message));
      getCategories();
    } else {
      let msg = response.statusText;
      dispatch(commonActionCreators.ON_FAILURE(msg));
    }
  } catch (ex) {
    console.error(JSON.stringify(ex));
    dispatch(commonActionCreators.ON_FAILURE("Error on category deletion"));
  }
};

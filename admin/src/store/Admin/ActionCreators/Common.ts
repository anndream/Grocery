export const commonActionTypes = {
  SET_LOADER: "SET_LOADER",
  UNSET_LOADER: "UNSET_LOADER",

  ON_SUCCESS: "ON_SUCCESS",
  ON_FAILURE: "ON_FAILURE",
};

export const commonActionCreators = {
  SET_LOADER: () => ({ type: commonActionTypes.SET_LOADER }),
  UNSET_LOADER: () => ({ type: commonActionTypes.UNSET_LOADER }),
  ON_SUCCESS: (message?: string) => ({
    type: commonActionTypes.ON_SUCCESS,
    data: { message },
  }),
  ON_FAILURE: (message?: string) => ({ type: commonActionTypes.ON_FAILURE, data: { message } }),
};

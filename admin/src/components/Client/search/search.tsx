import React from "react";
import { SearchBox } from "../search-box/search-box";
import { useAppState, useAppDispatch } from "../../../context/Client/app/app.provider";

import { useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";

interface Props {
  minimal?: boolean;
  showButtonText?: boolean;
  onSubmit?: () => void;
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ onSubmit, ...props }) => {
  const searchTerm = useAppState("searchTerm");
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const handleOnChange = e => {
    const { value } = e.target;
    dispatch({ type: "SET_SEARCH_TERM", payload: value });
  };
  // const { pathname, query } = router;
  const history = useHistory();
  const location = useLocation();

  const onSearch = e => {
    e.preventDefault();
    history.push(location.pathname, {
      text: searchTerm,
    });
    // if (type) {
    //   router.push(
    //     {
    //       pathname,
    //       query: { ...rest, text: searchTerm },
    //     },
    //     {
    //       pathname: `/${type}`,
    //       query: { ...rest, text: searchTerm },
    //     }
    //   );
    // } else {
    //   router.push({
    //     pathname,
    //     query: { ...rest, text: searchTerm },
    //   });
    // }
    dispatch({ type: "SET_SEARCH_TERM", payload: "" });
    if (onSubmit) {
      onSubmit();
    }
  };
  return (
    <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      value={searchTerm}
      name="search"
      placeholder={intl.formatMessage({
        id: "searchPlaceholder",
        defaultMessage: "Search your products from here",
      })}
      categoryType={"grocery"}
      buttonText={intl.formatMessage({
        id: "searchButtonText",
        defaultMessage: "Search",
      })}
      {...props}
    />
  );
};

export default Search;

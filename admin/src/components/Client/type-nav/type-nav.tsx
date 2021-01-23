import React from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import { CATEGORY_MENU_ITEMS } from "utils/site-navigation";
import * as categoryMenuIcons from "assets/icons/category-menu-icons";
import IconNavCard from "./type-nav-card";
import { useHistory, useLocation } from "react-router-dom";

const CategoryWrapper = styled.div(
  css({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "white",
    // margin: '0 -7.5px',
  })
);

const Col = styled.div(
  css({
    width: "50%",
    padding: "0 7.5px",
    marginBottom: 15,

    "@media screen and (min-width: 768px)": {
      width: "33.333%",
    },
  })
);

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryIconNav = (props: any) => {
  const history = useHistory();
  const location = useLocation();

  const handleOnClick = item => {
    if (item.dynamic) {
      history.push("/[type]", `${item.href}`);
      return;
    }
    history.push(`${item.href}`);
  };

  return (
    <CategoryWrapper>
      {CATEGORY_MENU_ITEMS.map(item => (
        <Col key={item.id}>
          <IconNavCard
            onClick={() => handleOnClick(item)}
            icon={<CategoryIcon name={item.icon} />}
            intlId={item.id}
            defaultMessage={item.defaultMessage}
            active={location.pathname === item.href}
            {...props}
          />
        </Col>
      ))}
    </CategoryWrapper>
  );
};
export default CategoryIconNav;

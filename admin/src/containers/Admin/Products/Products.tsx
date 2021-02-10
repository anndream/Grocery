import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled, withStyle } from "baseui";
import Button from "components/Admin/Button/Button";
import { Grid, Row as Rows, Col as Column } from "components/Admin/FlexBox/FlexBox";
import Input from "components/Admin/Input/Input";
import Select from "components/Admin/Select/Select";
import { useQuery, gql } from "@apollo/client";
import { Header, Heading, Wrapper } from "components/Wrapper.style";

import Fade from "react-reveal/Fade";
import ProductCard from "components/Admin/ProductCard/ProductCard";
import NoResult from "components/Admin/NoResult/NoResult";
import { CURRENCY } from "utils/constants";
import Placeholder from "components/Admin/Placeholder/Placeholder";
import { isNullOrEmpty } from "utils/stringHelper";
import { getProducts, removeProduct } from "store/Admin/ActionCreators/Product";
import { useDrawerDispatch } from "context/Admin/DrawerContext";
import {
  Icon,
  ImageWrapper,
  StyledCell,
  StyledHeadCell,
  StyledTable,
  TableWrapper,
} from "../Category/Category.style";
import { Checkbox } from "baseui/checkbox";

export const ProductsRow = styled("div", ({ $theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "25px",
  backgroundColor: $theme.colors.backgroundF7,
  position: "relative",
  zIndex: "1",

  "@media only screen and (max-width: 767px)": {
    marginLeft: "-7.5px",
    marginRight: "-7.5px",
    marginTop: "15px",
  },
}));

export const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px) and (max-width: 991px)": {
    alignItems: "center",
  },
}));

export const ProductCardWrapper = styled("div", () => ({
  height: "100%",
}));

export const LoaderWrapper = styled("div", () => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexWrap: "wrap",
}));

export const LoaderItem = styled("div", () => ({
  width: "25%",
  padding: "0 15px",
  marginBottom: "30px",
}));

const GET_PRODUCTS = gql`
  query getProducts($type: String, $sortByPrice: String, $searchText: String, $offset: Int) {
    products(type: $type, sortByPrice: $sortByPrice, searchText: $searchText, offset: $offset) {
      items {
        id
        name
        description
        image
        type
        price
        unit
        salePrice
        discountInPercent
      }
      totalCount
      hasMore
    }
  }
`;

const typeSelectOptions = [
  { value: "grocery", label: "Grocery" },
  { value: "women-cloths", label: "Women Cloths" },
  { value: "bags", label: "Bags" },
  { value: "makeup", label: "Makeup" },
];
const priceSelectOptions = [
  { value: "highestToLowest", label: "Highest To Lowest" },
  { value: "lowestToHighest", label: "Lowest To Highest" },
];

export default function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.product);
  const { error } = useSelector(state => state.common);

  const drawerDispatch = useDrawerDispatch();
  const [loadingMore, toggleLoading] = useState(false);
  const [type, setType] = useState([]);
  const [priceOrder, setPriceOrder] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const newProductDrawer = React.useCallback(
    () => drawerDispatch({ type: "OPEN_DRAWER", drawerComponent: "PRODUCT_FORM" }),
    [drawerDispatch]
  );

  const editProduct = React.useCallback(
    item =>
      drawerDispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "PRODUCT_UPDATE_FORM",
        data: item,
      }),
    [drawerDispatch]
  );

  const deleteProduct = id => {
    let confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      dispatch(removeProduct(id));
    }
  };

  if (error) {
    return <div>Error! {error}</div>;
  }
  function loadMore() {
    // toggleLoading(true);
    // fetchMore({
    //   variables: {
    //     offset: data.products.items.length,
    //   },
    //   updateQuery: (prev, { fetchMoreResult }) => {
    //     toggleLoading(false);
    //     if (!fetchMoreResult) return prev;
    //     return Object.assign({}, prev, {
    //       products: {
    //         __typename: prev.products.__typename,
    //         items: [...prev.products.items, ...fetchMoreResult.products.items],
    //         hasMore: fetchMoreResult.products.hasMore,
    //       },
    //     });
    //   },
    // });
  }
  function handlePriceSort({ value }) {
    // setPriceOrder(value);
    // if (value.length) {
    //   refetch({
    //     sortByPrice: value[0].value,
    //   });
    // } else {
    //   refetch({
    //     sortByPrice: null,
    //   });
    // }
  }
  function handleCategoryType({ value }) {
    // setType(value);
    // if (value.length) {
    //   refetch({
    //     type: value[0].value,
    //   });
    // } else {
    //   refetch({
    //     type: null,
    //   });
    // }
  }
  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
    // refetch({ searchText: value });
  }

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header style={{ marginBottom: 15 }}>
            <Col md={2} xs={12}>
              <Heading>Products</Heading>
            </Col>

            <Col md={10} xs={12}>
              <Row>
                {/* <Col md={3} xs={12}>
                  <Select
                    options={typeSelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Category Type"
                    value={type}
                    searchable={false}
                    onChange={handleCategoryType}
                  />
                </Col> */}
                <Col md={6} xs={12}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={3} xs={12}>
                  <Button onClick={newProductDrawer}>Add Products</Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper style={{ height: "auto" }}>
              <StyledTable $gridTemplateColumns="auto auto auto auto auto auto auto auto auto auto">
                <StyledHeadCell>
                  <Checkbox
                    type="checkbox"
                    value="checkAll"
                    // checked={checked}
                    // onChange={onAllCheck}
                    overrides={{
                      Checkmark: {
                        style: {
                          borderTopWidth: "2px",
                          borderRightWidth: "2px",
                          borderBottomWidth: "2px",
                          borderLeftWidth: "2px",
                          borderTopLeftRadius: "4px",
                          borderTopRightRadius: "4px",
                          borderBottomRightRadius: "4px",
                          borderBottomLeftRadius: "4px",
                        },
                      },
                    }}
                  />
                </StyledHeadCell>
                <StyledHeadCell>Id</StyledHeadCell>
                <StyledHeadCell>Image</StyledHeadCell>
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Product unit</StyledHeadCell>
                <StyledHeadCell>Stock amount</StyledHeadCell>
                <StyledHeadCell>Unit price</StyledHeadCell>
                <StyledHeadCell>Discount percentage</StyledHeadCell>
                <StyledHeadCell>Discount amount</StyledHeadCell>
                <StyledHeadCell>Action</StyledHeadCell>

                {products ? (
                  products.length !== 0 ? (
                    products
                      .filter(
                        x =>
                          isNullOrEmpty(search) ||
                          x.name.includes(search) ||
                          x.description.includes(search)
                      )
                      .map((item, index) => (
                        <React.Fragment key={index}>
                          <StyledCell>
                            <Checkbox
                              name={item.id}
                              // checked={checkedId.includes(item.id)}
                              // onChange={handleCheckbox}
                              overrides={{
                                Checkmark: {
                                  style: {
                                    borderTopWidth: "2px",
                                    borderRightWidth: "2px",
                                    borderBottomWidth: "2px",
                                    borderLeftWidth: "2px",
                                    borderTopLeftRadius: "4px",
                                    borderTopRightRadius: "4px",
                                    borderBottomRightRadius: "4px",
                                    borderBottomLeftRadius: "4px",
                                  },
                                },
                              }}
                            />
                          </StyledCell>
                          <StyledCell>{item.id}</StyledCell>
                          <StyledCell>
                            <ImageWrapper>
                              <Icon name={item.bannerImage} />
                            </ImageWrapper>
                          </StyledCell>
                          <StyledCell>{item.name}</StyledCell>
                          <StyledCell>{item.product_unit}</StyledCell>
                          <StyledCell>{item.stock_amount}</StyledCell>
                          <StyledCell>{item.unit_price}</StyledCell>
                          <StyledCell>{item.discount_percentage}</StyledCell>
                          <StyledCell>{item.discount_amount}</StyledCell>
                          <StyledCell>
                            <Button
                              overrides={{
                                BaseButton: {
                                  style: ({}) => ({
                                    padding: "2px 7px",
                                    marginRight: "2px",
                                  }),
                                },
                              }}
                              onClick={() => editProduct(item)}
                            >
                              Edit
                            </Button>

                            <Button
                              overrides={{
                                BaseButton: {
                                  style: ({}) => ({
                                    padding: "2px 7px",
                                    backgroundColor: "#fe5960",
                                  }),
                                },
                              }}
                              onClick={() => deleteProduct(item.id)}
                            >
                              Delete
                            </Button>
                          </StyledCell>
                        </React.Fragment>
                      ))
                  ) : (
                    <NoResult
                      hideButton={false}
                      style={{
                        gridColumnStart: "1",
                        gridColumnEnd: "one",
                      }}
                    />
                  )
                ) : null}
              </StyledTable>
            </TableWrapper>
          </Wrapper>

          {products && products.hasMore && (
            <Row>
              <Col md={12} style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={loadMore} isLoading={loadingMore}>
                  Load More
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Grid>
  );
}

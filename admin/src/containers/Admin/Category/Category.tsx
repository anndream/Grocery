import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyle } from "baseui";
import { Grid, Row as Rows, Col as Column } from "components/Admin/FlexBox/FlexBox";
import { useDrawerDispatch } from "context/Admin/DrawerContext";
import Input from "components/Admin/Input/Input";
import Button from "components/Admin/Button/Button";
import Checkbox from "components/Admin/CheckBox/CheckBox";
import { gql } from "@apollo/client";
import { Wrapper, Header, Heading } from "components/Wrapper.style";
import { TableWrapper, StyledTable, StyledHeadCell, StyledCell } from "./Category.style";
import { Plus } from "assets/icons/Plus";
import * as icons from "assets/icons/category-icons";
import NoResult from "components/Admin/NoResult/NoResult";
import { getCategories, removeCategory } from "store/Admin/ActionCreators/Category";
import { InLineLoader } from "components/Admin/InlineLoader/InlineLoader";
import { isNullOrEmpty } from "utils/stringHelper";

const Col = withStyle(Column, () => ({
  "@media only screen and (max-width: 767px)": {
    marginBottom: "20px",

    ":last-child": {
      marginBottom: 0,
    },
  },
}));

const Row = withStyle(Rows, () => ({
  "@media only screen and (min-width: 768px)": {
    alignItems: "center",
  },
}));

export default function Category() {
  const [search, setSearch] = useState("");
  const drawerDispatch = useDrawerDispatch();
  const [checkedId, setCheckedId] = useState([]);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.common);
  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const openDrawer = useCallback(
    () =>
      drawerDispatch({
        type: "OPEN_DRAWER",
        drawerComponent: "CATEGORY_FORM",
      }),
    [drawerDispatch]
  );

  const editCategory = category => {
    drawerDispatch({
      type: "OPEN_DRAWER",
      drawerComponent: "CATEGORY_FORM",
      data: { category },
    });
  };

  const deleteCategory = async id => {
    let confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      dispatch(removeCategory(id));
    }
  };

  if (error) {
    return <div>Error! {error}</div>;
  }
  function handleSearch(event) {
    const value = event.currentTarget.value;
    setSearch(value);
  }

  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = categories.map(current => current.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }

  function handleCheckbox(event) {
    debugger;
    const { name } = event.currentTarget;
    if (!checkedId.includes(name)) {
      setCheckedId(prevState => [...prevState, name]);
    } else {
      setCheckedId(prevState => prevState.filter(id => id !== name));
    }
  }

  if (loading) return <InLineLoader />;

  return (
    <Grid fluid={true}>
      <Row>
        <Col md={12}>
          <Header
            style={{
              marginBottom: 30,
              boxShadow: "0 0 5px rgba(0, 0 ,0, 0.05)",
            }}
          >
            <Col md={2}>
              <Heading>Category</Heading>
            </Col>

            <Col md={10}>
              <Row>
                {/* <Col md={3} lg={3}>
                  <Select
                    options={categorySelectOptions}
                    labelKey="label"
                    valueKey="value"
                    placeholder="Category Type"
                    value={category}
                    searchable={false}
                    onChange={handleCategory}
                  />
                </Col> */}

                <Col md={5} lg={6}>
                  <Input
                    value={search}
                    placeholder="Ex: Search By Name"
                    onChange={handleSearch}
                    clearable
                  />
                </Col>

                <Col md={4} lg={3}>
                  <Button
                    onClick={openDrawer}
                    startEnhancer={() => <Plus />}
                    overrides={{
                      BaseButton: {
                        style: () => ({
                          width: "100%",
                          borderTopLeftRadius: "3px",
                          borderTopRightRadius: "3px",
                          borderBottomLeftRadius: "3px",
                          borderBottomRightRadius: "3px",
                        }),
                      },
                    }}
                  >
                    Add Category
                  </Button>
                </Col>
              </Row>
            </Col>
          </Header>

          <Wrapper style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}>
            <TableWrapper style={{ height: "auto" }}>
              <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(180px, 180px) auto minmax(135px, 135px)">
                <StyledHeadCell>
                  <Checkbox
                    type="checkbox"
                    value="checkAll"
                    checked={checked}
                    onChange={onAllCheck}
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
                {/* <StyledHeadCell>Image</StyledHeadCell> */}
                <StyledHeadCell>Name</StyledHeadCell>
                <StyledHeadCell>Description</StyledHeadCell>
                <StyledHeadCell>Action</StyledHeadCell>

                {categories ? (
                  categories.length ? (
                    categories
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
                              checked={checkedId.includes(item.id)}
                              onChange={handleCheckbox}
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
                          {/* <StyledCell>
                            <ImageWrapper>
                              <Icon name={row[2]} />
                            </ImageWrapper>
                          </StyledCell> */}
                          <StyledCell>{item.name}</StyledCell>
                          <StyledCell>{item.description}</StyledCell>
                          {/* <StyledCell>{row[5]}</StyledCell> */}
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
                              onClick={() => editCategory(item)}
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
                              onClick={() => deleteCategory(item.id)}
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
        </Col>
      </Row>
    </Grid>
  );
}

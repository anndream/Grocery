import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useMutation, gql } from "@apollo/client";
import { Scrollbars } from "react-custom-scrollbars";
import { useDrawerDispatch } from "context/Admin/DrawerContext";
import Uploader from "components/Admin/Uploader/Uploader";
import Button, { KIND } from "components/Admin/Button/Button";
import DrawerBox from "components/Admin/DrawerBox/DrawerBox";
import { Row, Col } from "components/Admin/FlexBox/FlexBox";
import Input from "components/Admin/Input/Input";
import { Textarea } from "components/Admin/Textarea/Textarea";
import Select from "components/Admin/Select/Select";
import { FormFields, FormLabel } from "components/Admin/FormFields/FormFields";

import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";
import { getCategories } from "store/Admin/ActionCreators/Category";
import { saveProduct } from "store/Admin/ActionCreators/Product";

type Props = any;

const AddProduct: React.FC<Props> = props => {
  const reduxDispatch = useDispatch();
  const dispatch = useDrawerDispatch();
  const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [dispatch]);
  const { register, handleSubmit, setValue } = useForm();

  const [description, setDescription] = useState("");
  const { categories } = useSelector(state => state.category);
  const [categorySli, setCategorySli] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  React.useEffect(() => {
    reduxDispatch(getCategories());
  }, []);
  React.useEffect(() => {
    if (categories)
      setCategorySli(categories.map(x => ({ value: x.name, id: x.id, name: x.name })));
  }, [categories]);

  React.useEffect(() => {
    register({ name: "type" });
    register({ name: "category" });
    register({ name: "image", required: true });
    register({ name: "description" });
  }, [register]);

  const handleDescriptionChange = e => {
    const value = e.target.value;
    setValue("description", value);
    setDescription(value);
  };
  const handleCategoryChange = ({ value }) => {
    setValue("category", value);
    setSelectedCategory(value);
  };
  const handleUploader = files => {
    setValue("image", files[0].path);
  };
  const onSubmit = data => {
    const newProduct = {
      name: data.name,
      category_id: data.category[0].id,
      description: data.description,
      image: data.image,
      product_unit: data.product_unit,
      stock_amount: Number(data.stock_amount),
      unit_price: Number(data.unit_price),
      discount_percentage: Number(data.discount_percentage),
      discount_amount: Number(data.discount_amount),
      max_purchase_limit: Number(data.max_purchase_limit),
    };

    reduxDispatch(saveProduct(newProduct));
    closeDrawer();
  };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Product</DrawerTitle>
      </DrawerTitleWrapper>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
        <Scrollbars
          autoHide
          renderView={props => <div {...props} style={{ ...props.style, overflowX: "hidden" }} />}
          renderTrackHorizontal={props => (
            <div {...props} style={{ display: "none" }} className="track-horizontal" />
          )}
        >
          <Row>
            <Col lg={4}>
              <FieldDetails>Upload your Product image here</FieldDetails>
            </Col>
            <Col lg={8}>
              <DrawerBox
                overrides={{
                  Block: {
                    style: {
                      width: "100%",
                      height: "auto",
                      padding: "30px",
                      borderRadius: "3px",
                      backgroundColor: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                }}
              >
                <Uploader onChange={handleUploader} />
              </DrawerBox>
            </Col>
          </Row>

          <Row>
            <Col lg={4}>
              <FieldDetails>
                Add your Product description and necessary information from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Name</FormLabel>
                  <Input inputRef={register({ required: true })} name="name" />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Textarea value={description} onChange={handleDescriptionChange} />
                </FormFields>

                <FormFields>
                  <FormLabel>Unit</FormLabel>
                  <Input type="number" inputRef={register} name="product_unit" />
                </FormFields>

                <FormFields>
                  <FormLabel>Stock</FormLabel>
                  <Input type="number" inputRef={register} name="stock_amount" />
                </FormFields>

                <FormFields>
                  <FormLabel>Sale Price</FormLabel>
                  <Input type="number" inputRef={register} name="unit_price" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount In Percent</FormLabel>
                  <Input type="number" inputRef={register} name="discount_percentage" />
                </FormFields>

                <FormFields>
                  <FormLabel>Discount Amount</FormLabel>
                  <Input type="number" inputRef={register} name="discount_amount" />
                </FormFields>

                <FormFields>
                  <FormLabel>Max purchase limit</FormLabel>
                  <Input type="number" inputRef={register} name="max_purchase_limit" />
                </FormFields>

                <FormFields>
                  <FormLabel>Category</FormLabel>
                  <Select
                    options={categorySli}
                    labelKey="name"
                    valueKey="value"
                    placeholder="Category"
                    value={selectedCategory}
                    searchable={false}
                    onChange={handleCategoryChange}
                    overrides={{
                      Placeholder: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      DropdownListItem: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      OptionContent: {
                        style: ({ $theme, $selected }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $selected ? $theme.colors.textDark : $theme.colors.textNormal,
                          };
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => {
                          return {
                            ...$theme.typography.fontBold14,
                            color: $theme.colors.textNormal,
                          };
                        },
                      },
                      Popover: {
                        props: {
                          overrides: {
                            Body: {
                              style: { zIndex: 5 },
                            },
                          },
                        },
                      },
                    }}
                  />
                </FormFields>
              </DrawerBox>
            </Col>
          </Row>
        </Scrollbars>

        <ButtonGroup>
          <Button
            kind={KIND.minimal}
            onClick={closeDrawer}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  marginRight: "15px",
                  color: $theme.colors.red400,
                }),
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "50%",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }),
              },
            }}
          >
            Create Product
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddProduct;

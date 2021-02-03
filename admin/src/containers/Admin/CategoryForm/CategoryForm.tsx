import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useDrawerDispatch, useDrawerState } from "context/Admin/DrawerContext";
import { Scrollbars } from "react-custom-scrollbars";
import DrawerBox from "components/Admin/DrawerBox/DrawerBox";
import { Row, Col } from "components/Admin/FlexBox/FlexBox";
import {
  Form,
  DrawerTitleWrapper,
  DrawerTitle,
  FieldDetails,
  ButtonGroup,
} from "../DrawerItems/DrawerItems.style";
import { FormFields, FormLabel } from "components/Admin/FormFields/FormFields";
import { Input } from "baseui/input";
import { Button, KIND } from "baseui/button";
import { saveCategory, updateCategory } from "store/Admin/ActionCreators/Category";

type Props = any;

const AddCategory: React.FC<Props> = props => {
  let drawerData = useDrawerState("data");
  let category = drawerData?.category;
  let refetch = drawerData?.mutate;

  const drawerDispatch = useDrawerDispatch();
  const dispatch = useDispatch();
  const closeDrawer = useCallback(() => drawerDispatch({ type: "CLOSE_DRAWER" }), [drawerDispatch]);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: category ? { ...category } : {},
  });

  const onSubmit = async ({ name, description }) => {
    const editedCategory = {
      name: name,
      description: description,
      creation_date: new Date(),
    };
    // call for create
    if (category) {
      dispatch(updateCategory(editedCategory, category.id));
    } else {
      dispatch(saveCategory(editedCategory));
    }
    closeDrawer();
  };
  // const handleChange = ({ value }) => {
  //   setValue("parent", value);
  //   setCategory(value);
  // };
  // const handleUploader = files => {
  //   setValue("image", files[0].path);
  // };

  return (
    <>
      <DrawerTitleWrapper>
        <DrawerTitle>Add Category</DrawerTitle>
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
              <FieldDetails>
                Add your category description and necessary informations from here
              </FieldDetails>
            </Col>

            <Col lg={8}>
              <DrawerBox>
                <FormFields>
                  <FormLabel>Category Name</FormLabel>
                  <Input inputRef={register({ required: true, maxLength: 20 })} name="name" />
                </FormFields>

                <FormFields>
                  <FormLabel>Description</FormLabel>
                  <Input inputRef={register({ required: true })} name="description" />
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
            Create Category
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
};

export default AddCategory;

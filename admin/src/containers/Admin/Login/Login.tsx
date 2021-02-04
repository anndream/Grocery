import React, { useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "context/Admin/auth";
import { FormFields, FormLabel, FormTitle, Error } from "components/Admin/FormFields/FormFields";
import { Wrapper, FormWrapper, LogoImage, LogoWrapper } from "./Login.style";
import Input from "components/Admin/Input/Input";
import Button from "components/Admin/Button/Button";
import Logoimage from "assets/image/PickBazar.png";
import { DASHBOARD } from "utils/constants";

export default () => {
  let history = useHistory();
  let location = useLocation();
  const { authenticate, isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) return <Redirect to={{ pathname: "/" }} />;

  const { register, errors, handleSubmit } = useForm();

  let { from } = (location.state as any) || { from: { pathname: DASHBOARD } };
  let login = ({ username, password }) => {
    authenticate({ email: username, password }, () => {
      history.replace(from);
    });
  };
  return (
    <Wrapper>
      <FormWrapper>
        <form onSubmit={handleSubmit(login)}>
          <FormFields>
            <LogoWrapper>
              <LogoImage src={Logoimage} alt="pickbazar-admin" />
            </LogoWrapper>
            <FormTitle>Log in to admin</FormTitle>
          </FormFields>

          <FormFields>
            <FormLabel>Username</FormLabel>
            <Input name="username" inputRef={register({ required: true })} />
            {/* {errors.username ? <Error>{errors.username}</Error> : null} */}
            {/* {errors.username} */}
          </FormFields>

          <FormFields>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              inputRef={register({
                required: true,
              })}
              placeholder="Ex: demo"
            />
            {/* {errors.password ? <Error>{errors.password}</Error> : null} */}
            {/* {errors.password} */}
          </FormFields>

          <Button
            type="submit"
            // disabled={errors.username == null && errors.password == null}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => ({
                  width: "100%",
                  marginLeft: "auto",
                  borderTopLeftRadius: "3px",
                  borderTopRightRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: "3px",
                }),
              },
            }}
          >
            Submit
          </Button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

import styled from "styled-components";
import React from "react";

export default function ErrorMessage({ message }) {
  return <StyledAside>{message}</StyledAside>;
}

const StyledAside = styled.aside({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  padding: "1.5rem",
  fontSize: "xl",
  color: "white",
  backgroundColor: "red",
});

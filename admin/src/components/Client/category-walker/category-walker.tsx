import React, { useState, lazy } from "react";
import { WalkerWrapper, Category, NoCategory, CategoryWrapper } from "./category-walker.style";
import { Button } from "components/Client/button/button";
// import { useRouter } from "next/router";
import startCase from "lodash/startCase";
import SpringModal from "components/Client/spring-modal/spring-modal";
// const SpringModal = lazy(() => import("components/Client/spring-modal/spring-modal"));

type WalkerProps = {
  parent?: string;
  child?: string;
  style?: any;
  // onClick: () => void;
};

const CategoryWalker: React.FunctionComponent<WalkerProps> = ({ children, style }) => {
  const [isOpen, setOpen] = useState(false);
  // const { query } = useRouter();
  const query = { category: "" };
  return (
    <WalkerWrapper style={style}>
      <CategoryWrapper>
        {query.category ? (
          <Category>{startCase(query.category as string)}</Category>
        ) : (
          <NoCategory>No Category Selected</NoCategory>
        )}
      </CategoryWrapper>

      <Button variant="text" onClick={() => setOpen(true)}>
        Filter
      </Button>
      <SpringModal isOpen={isOpen} onRequestClose={() => setOpen(false)}>
        {children}
      </SpringModal>
    </WalkerWrapper>
  );
};

export default CategoryWalker;

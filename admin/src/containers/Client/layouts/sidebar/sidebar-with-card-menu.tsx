import React from "react";
import { CardMenu } from "components/Client/card-menu";
import ErrorMessage from "components/Client/error-message/error-message";
import styled from "styled-components";
import Sticky from "react-stickynode";
import { Scrollbar } from "components/Client/scrollbar/scrollbar";
import CategoryWalker from "components/Client/category-walker/category-walker";
import useCategory from "services/use-category";

const Aside = styled.aside({
  width: "300px",
  position: "fixed",
  top: 110,
  left: 30,
  height: "calc(100% - 110px)",
});

const CardMenuWrapper = styled.div({
  display: "grid",
  gridGap: "10px",
  gridTemplateColumns: "1fr 1fr",
  gridAutoRows: "max-content",
  paddingBottom: 30,

  "@media (min-width: 550px) and (max-width: 990px)": {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
});

const MobileOnly = styled.div({
  display: "none",
  zIndex: 10,

  "@media (max-width: 990px)": {
    display: "block",
  },
});

const DesktopOnly = styled.div({
  display: "none",
  "@media (min-width: 991px)": {
    display: "block",
  },
});

interface Props {
  type: string;
}

export const SidebarWithCardMenu = ({ type }: Props) => {
  // const router = useRouter();
  const { categories, error } = useCategory({ type });

  if (error) return <ErrorMessage message={error.message} />;
  if (!categories) return null;
  // const { pathname, query } = router;
  // const selectedQueries = query.category;
  const selectedQueries = "query.category";

  const onCategoryClick = (slug: string) => {
    // router.push({
    //   pathname,
    //   query: { ...query, category: slug },
    // });
  };

  return (
    <React.Fragment>
      <MobileOnly>
        <Sticky top={67}>
          <CategoryWalker
            style={{
              backgroundColor: "#ffffff",
              paddingTop: "15px",
              boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            }}
          >
            <CardMenuWrapper>
              <CardMenu data={categories} onClick={onCategoryClick} active={selectedQueries} />
            </CardMenuWrapper>
          </CategoryWalker>
        </Sticky>
      </MobileOnly>

      <DesktopOnly>
        {/* <Sticky top={110}> */}
        <Aside>
          <Scrollbar
            style={{ height: "100%", maxHeight: "100%" }}
            options={{
              scrollbars: {
                visibility: "hidden",
              },
            }}
          >
            <CardMenuWrapper>
              <CardMenu data={categories} onClick={onCategoryClick} active={selectedQueries} />
            </CardMenuWrapper>
          </Scrollbar>
        </Aside>
        {/* </Sticky> */}
      </DesktopOnly>
    </React.Fragment>
  );
};

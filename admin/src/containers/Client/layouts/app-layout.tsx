import React, { lazy } from "react";
import { useLocation } from "react-router-dom";
import Sticky from "react-stickynode";
import { useAppState } from "context/Client/app/app.provider";
import Header from "./header/header";
import { LayoutWrapper } from "./layout.style";
import { isCategoryPage } from "./is-home-page";
import MobileHeader from "./header/mobile-header";
// const MobileHeader = lazy(() => import("./header/mobile-header"));

type LayoutProps = {
  className?: string;
  token?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({ className, children, token }) => {
  const { pathname } = useLocation();
  const isSticky =
    useAppState("isSticky") || pathname === "/furniture-two" || pathname === "/grocery-two";

  // const isHomePage = isCategoryPage(query.type) || true;
  const isHomePage = true;
  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <Sticky enabled={isSticky} innerZ={1001}>
        <MobileHeader
          className={`${isSticky ? "sticky" : "unSticky"} ${isHomePage ? "home" : ""} desktop`}
        />

        <Header className={`${isSticky ? "sticky" : "unSticky"} ${isHomePage ? "home" : ""}`} />
      </Sticky>
      {children}
    </LayoutWrapper>
  );
};

export default Layout;

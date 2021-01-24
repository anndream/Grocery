import React, { useContext } from "react";
import { AuthContext } from "context/Client/auth/auth.context";
import {
  SidebarWrapper,
  SidebarTop,
  SidebarBottom,
  SidebarMenu,
  LogoutButton,
} from "./sidebar.style";
import { FormattedMessage } from "react-intl";
import { PROFILE_SIDEBAR_TOP_MENU, PROFILE_SIDEBAR_BOTTOM_MENU } from "utils/site-navigation";
import { useHistory } from "react-router-dom";

const SidebarCategory: React.FC<{}> = () => {
  const { authDispatch } = useContext<any>(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };
  return (
    <>
      <SidebarWrapper>
        <SidebarTop>
          {PROFILE_SIDEBAR_TOP_MENU.map((item, index) => (
            <SidebarMenu href={item.href} key={index} intlId={item.id} />
          ))}
        </SidebarTop>

        <SidebarBottom>
          {PROFILE_SIDEBAR_BOTTOM_MENU.map((item, index) => (
            <SidebarMenu href={item.href} key={index} intlId={item.id} />
          ))}
          <LogoutButton type="button" onClick={handleLogout}>
            <FormattedMessage id="nav.logout" defaultMessage="Logout" />
          </LogoutButton>
        </SidebarBottom>
      </SidebarWrapper>
    </>
  );
};

export default SidebarCategory;

import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { openModal } from "@redq/reuse-modal";
import { AuthContext } from "../../../../context/Client/auth/auth.context";
import AuthenticationForm from "../../../../components/Client/authentication-form";
import { RightMenu } from "./menu/right-menu/right-menu";
import { LeftMenu } from "./menu/left-menu/left-menu";
import HeaderWrapper from "./header.style";
import LogoImage from "assets/image/logo.svg";
import UserImage from "assets/image/user.jpg";
import Search from "../../../../components/Client/search/search";
import { CHECKOUT } from "utils/constants";
type Props = {
  className?: string;
};

const Header: React.FC<Props> = ({ className }) => {
  const history = useHistory();
  const location = useLocation();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = React.useContext<any>(AuthContext);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };

  const handleJoin = () => {
    authDispatch({
      type: "SIGNIN",
    });

    openModal({
      show: true,
      overlayClassName: "quick-view-overlay",
      closeOnClickOutside: true,
      component: AuthenticationForm,
      closeComponent: "",
      config: {
        enableResizing: false,
        disableDragging: true,
        className: "quick-view-modal",
        width: 458,
        height: "auto",
      },
    });
  };

  return (
    <HeaderWrapper className={className} id="layout-header">
      <LeftMenu logo={LogoImage} />

      {location.pathname !== CHECKOUT && <Search minimal={true} className="headerSearch" />}

      <RightMenu
        isAuthenticated={isAuthenticated}
        onJoin={handleJoin}
        onLogout={handleLogout}
        avatar={UserImage}
      />
    </HeaderWrapper>
  );
};

export default Header;

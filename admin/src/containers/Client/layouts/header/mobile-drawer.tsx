import React, { useContext } from "react";
import { openModal } from "@redq/reuse-modal";
import { FormattedMessage } from "react-intl";
import { Scrollbar } from "components/Client/scrollbar/scrollbar";
import Drawer from "components/Client/drawer/drawer";
import { Button } from "components/Client/button/button";
import { CloseIcon } from "assets/icons/CloseIcon";
import { AuthContext } from "context/Client/auth/auth.context";
import AuthenticationForm from "components/Client/authentication-form";
import {
  DrawerBody,
  HamburgerIcon,
  DrawerContentWrapper,
  DrawerClose,
  DrawerProfile,
  LogoutView,
  LoginView,
  UserAvatar,
  UserDetails,
  DrawerMenu,
  DrawerMenuItem,
  UserOptionMenu,
} from "./header.style";
import UserImage from "assets/image/user.jpg";
import { MOBILE_DRAWER_MENU, PROFILE_PAGE } from "utils/site-navigation";
import { useAppState, useAppDispatch } from "context/Client/app/app.provider";
import { useHistory, useLocation } from "react-router-dom";
import NavLink from "components/Client/nav-link/nav-link";

const MobileDrawer: React.FunctionComponent = () => {
  const isDrawerOpen = useAppState("isDrawerOpen");
  const dispatch = useAppDispatch();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });
  }, [dispatch]);

  const history = useHistory();
  const location = useLocation();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      authDispatch({ type: "SIGN_OUT" });
      history.push("/");
    }
  };

  const signInOutForm = () => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });

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
    <Drawer
      width="316px"
      drawerHandler={
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      closeButton={
        <DrawerClose>
          <CloseIcon />
        </DrawerClose>
      }
    >
      <DrawerBody>
        <Scrollbar className="drawer-scrollbar">
          <DrawerContentWrapper>
            <DrawerProfile>
              {isAuthenticated ? (
                <LoginView>
                  <UserAvatar>
                    <img src={UserImage} alt="user_avatar" />
                  </UserAvatar>
                  <UserDetails>
                    <h3>David Kinderson</h3>
                    <span>+990 374 987</span>
                  </UserDetails>
                </LoginView>
              ) : (
                <LogoutView>
                  <Button variant="primary" onClick={signInOutForm}>
                    <FormattedMessage id="mobileSignInButtonText" defaultMessage="join" />
                  </Button>
                </LogoutView>
              )}
            </DrawerProfile>

            <DrawerMenu>
              {MOBILE_DRAWER_MENU.map(item => (
                <DrawerMenuItem key={item.id}>
                  <NavLink
                    onClick={toggleHandler}
                    href={item.href}
                    label={item.defaultMessage}
                    intlId={item.id}
                    className="drawer_menu_item"
                    pathname={location.pathname}
                  />
                </DrawerMenuItem>
              ))}
            </DrawerMenu>

            {isAuthenticated && (
              <UserOptionMenu>
                <DrawerMenuItem>
                  <NavLink
                    href={PROFILE_PAGE}
                    label="Your Account Settings"
                    className="drawer_menu_item"
                    intlId="navlinkAccountSettings"
                    pathname={location.pathname}
                  />
                </DrawerMenuItem>
                <DrawerMenuItem>
                  <div onClick={handleLogout} className="drawer_menu_item">
                    <span className="logoutBtn">
                      <FormattedMessage id="navlinkLogout" defaultMessage="Logout" />
                    </span>
                  </div>
                </DrawerMenuItem>
              </UserOptionMenu>
            )}
          </DrawerContentWrapper>
        </Scrollbar>
      </DrawerBody>
    </Drawer>
  );
};

export default MobileDrawer;

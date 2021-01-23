import React, { lazy } from "react";
// import NavLink from "components/nav-link/nav-link";
import { Link } from "react-router-dom";
import { OFFER_MENU_ITEM, HELP_MENU_ITEM } from "../../../../../../utils/site-navigation";
import { HelpIcon } from "assets/icons/HelpIcon";
import { RightMenuBox } from "./right-menu.style";
const AuthMenu = lazy(() => import("../auth-menu"));

type Props = {
  onLogout: () => void;
  onJoin: () => void;
  avatar: string;
  isAuthenticated: boolean;
};

export const RightMenu: React.FC<Props> = ({ onLogout, avatar, isAuthenticated, onJoin }) => {
  return (
    <RightMenuBox>
      <Link
        className="menu-item"
        to={OFFER_MENU_ITEM.href}
        // label={OFFER_MENU_ITEM.defaultMessage}
        // intlId={OFFER_MENU_ITEM.id}
      />
      <Link
        className="menu-item"
        to={HELP_MENU_ITEM.href}
        // label={HELP_MENU_ITEM.defaultMessage}
        // intlId={HELP_MENU_ITEM.id}
        // iconClass="menu-icon"
        // icon={<HelpIcon />}
      />
      {/* <LanguageSwitcher /> */}

      <AuthMenu
        avatar={avatar}
        onJoin={onJoin}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
      />
    </RightMenuBox>
  );
};

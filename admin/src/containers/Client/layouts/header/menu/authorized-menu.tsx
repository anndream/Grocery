import React from "react";
import { FormattedMessage } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import NavLink from "components/Client/nav-link/nav-link";
import { AUTHORIZED_MENU_ITEMS } from "utils/site-navigation";

type Props = {
  onLogout: () => void;
};

export const AuthorizedMenu: React.FC<Props> = ({ onLogout }) => {
  const history = useHistory();

  return (
    <>
      {AUTHORIZED_MENU_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          className="menu-item"
          href={item.href}
          label={item.defaultMessage}
          intlId={item.id}
          pathname={history.location.pathname}
        />
      ))}
      <div className="menu-item" onClick={onLogout}>
        <a>
          <span>
            <FormattedMessage id="nav.logout" defaultMessage="Logout" />
          </span>
        </a>
      </div>
    </>
  );
};

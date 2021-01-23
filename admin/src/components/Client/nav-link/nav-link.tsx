import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

type NavLinkProps = {
  pathname: any;
  href: string;
  label: string;
  intlId?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
  dynamic?: boolean;
  onClick?: () => void;
};

const Icon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink: React.SFC<NavLinkProps> = ({
  href,
  label,
  intlId,
  pathname,
  icon,
  className,
  onClick,
  iconClass,
  dynamic,
}) => {
  const isCurrentPath = pathname === href;
  return (
    <div onClick={onClick} className={className ? className : ""}>
      {dynamic ? (
        <Link to={"/"}>
          <a
            className={isCurrentPath ? " current-page" : ""}
            style={{ display: "flex", alignItems: "center" }}
          >
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ""}

            <span className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : "defaultNavLinkId"}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </span>
          </a>
        </Link>
      ) : (
        <Link to={href}>
          <a
            className={isCurrentPath ? " current-page" : ""}
            style={{ display: "flex", alignItems: "center" }}
          >
            {icon ? <Icon className={iconClass}>{icon}</Icon> : ""}

            <span className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : "defaultNavLinkId"}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </span>
          </a>
        </Link>
      )}
    </div>
  );
};

export default NavLink;

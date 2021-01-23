import React from "react";
import { FormattedMessage } from "react-intl";
import Logo from "../../../logo/logo";
import { CATEGORY_MENU_ITEMS } from "../../../../../../utils/site-navigation";
import * as categoryMenuIcons from "../../../../../../assets/icons/category-menu-icons";
import { MainMenu, MenuItem, IconWrapper, LeftMenuBox } from "./left-menu.style";
import { useHistory } from "react-router-dom";

const CategoryIcon = ({ name }) => {
  const TagName = categoryMenuIcons[name];
  return !!TagName ? <TagName /> : <p>Invalid icon {name}</p>;
};

const CategoryMenu = (props: any) => {
  const handleOnClick = item => {
    // if (item.dynamic) {
    //   Router.push("/[type]", `${item.href}`);
    //   props.onClick(item);
    //   return;
    // }
    // Router.push(`${item.href}`);
    // props.onClick(item);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {CATEGORY_MENU_ITEMS.map(item => (
        <MenuItem key={item.id} {...props} onClick={() => handleOnClick(item)}>
          <IconWrapper>
            <CategoryIcon name={item.icon} />
          </IconWrapper>
          <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
        </MenuItem>
      ))}
    </div>
  );
};

type Props = {
  logo: string;
};

export const LeftMenu: React.FC<Props> = ({ logo }) => {
  // const router = useRouter();
  // const initialMenu = CATEGORY_MENU_ITEMS.find(item => item.href === router.asPath);
  // const [activeMenu, setActiveMenu] = React.useState(initialMenu ?? CATEGORY_MENU_ITEMS[0]);
  const history = useHistory();

  return (
    <LeftMenuBox>
      <Logo imageUrl={logo} alt={"Shop Logo"} onClick={() => history.push("/")} />

      <MainMenu>
        {/* <Popover
          className="right"
          handler={
            <SelectedItem>
              <span>
                <Icon>
                  <CategoryIcon name={activeMenu?.icon} />
                </Icon>
                <span>
                  <FormattedMessage
                    id={activeMenu?.id}
                    defaultMessage={activeMenu?.defaultMessage}
                  />
                </span>
              </span>
              <Arrow>
                <MenuDown />
              </Arrow>
            </SelectedItem>
          }
          content={<CategoryMenu onClick={setActiveMenu} />}
        /> */}
      </MainMenu>
    </LeftMenuBox>
  );
};

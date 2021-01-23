import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Sticky from "react-stickynode";
import { Scrollbar } from "components/Client/scrollbar/scrollbar";
import Popover from "components/Client/popover/popover";
import { ArrowDropDown } from "assets/icons/ArrowDropDown";
import { CategoryIcon } from "assets/icons/CategoryIcon";
import { useAppState } from "context/Client/app/app.provider";
import { SidebarMobileLoader, SidebarLoader } from "components/Client/placeholder/placeholder";
import {
  CategoryWrapper,
  TreeWrapper,
  PopoverHandler,
  PopoverWrapper,
  SidebarWrapper,
  RequestMedicine,
} from "./sidebar.style";

import { TreeMenu } from "components/Client/tree-menu/tree-menu";
import { REQUEST_MEDICINE_MENU_ITEM } from "utils/site-navigation";
import useCategory from "services/use-category";
import ErrorMessage from "components/Client/error-message/error-message";
import CategoryWalker from "components/Client/category-walker/category-walker";

type SidebarCategoryProps = {
  deviceType: {
    mobile: string;
    tablet: string;
    desktop: boolean;
  };
  type: string;
};

const SidebarCategory: React.FC<SidebarCategoryProps> = ({
  deviceType: { mobile, tablet, desktop },
  type,
}) => {
  // const router = useRouter();
  const { categories, error } = useCategory({ type });
  const isSidebarSticky = useAppState("isSidebarSticky");

  const location = useLocation<any>();
  const selectedQueries = location.state.category;

  if (error) return <ErrorMessage message={error.message} />;
  // const { pathname, query } = router;

  const isRtl = false;

  const onCategoryClick = (slug: string) => {
    // const { type, ...rest } = query;
    // if (type) {
    //   router.push(
    //     {
    //       pathname,
    //       query: { ...rest, category: slug },
    //     },
    //     {
    //       pathname: `/${type}`,
    //       query: { ...rest, category: slug },
    //     }
    //   );
    // } else {
    //   router.push({
    //     pathname,
    //     query: { ...rest, category: slug },
    //   });
    // }
  };

  if (!categories) {
    if (mobile || tablet) {
      return <SidebarMobileLoader />;
    }
    return <SidebarLoader />;
  }
  return (
    <CategoryWrapper>
      <PopoverWrapper>
        <CategoryWalker>
          {type === "medicine" && (
            <Link to={REQUEST_MEDICINE_MENU_ITEM.href}>
              <RequestMedicine>
                <FormattedMessage
                  id={REQUEST_MEDICINE_MENU_ITEM.id}
                  defaultMessage={REQUEST_MEDICINE_MENU_ITEM.defaultMessage}
                />
              </RequestMedicine>
            </Link>
          )}

          <TreeMenu data={categories} onClick={onCategoryClick} active={selectedQueries} />
        </CategoryWalker>
      </PopoverWrapper>

      <SidebarWrapper style={{ paddingTop: type === "medicine" ? 0 : 45 }}>
        <Sticky enabled={isSidebarSticky} top={type === "medicine" ? 89 : 110}>
          {type === "medicine" && (
            <Link to={REQUEST_MEDICINE_MENU_ITEM.href}>
              <RequestMedicine>
                <FormattedMessage
                  id={REQUEST_MEDICINE_MENU_ITEM.id}
                  defaultMessage={REQUEST_MEDICINE_MENU_ITEM.defaultMessage}
                />
              </RequestMedicine>
            </Link>
          )}

          <Scrollbar className="sidebar-scrollbar">
            <TreeWrapper>
              <TreeMenu data={categories} onClick={onCategoryClick} active={selectedQueries} />
            </TreeWrapper>
          </Scrollbar>
        </Sticky>
      </SidebarWrapper>
    </CategoryWrapper>
  );
};

export default SidebarCategory;

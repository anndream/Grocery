import React, { lazy } from "react";
import { Modal } from "@redq/reuse-modal";
import Carousel from "components/Client/carousel/carousel";
import { Banner } from "components/Client/banner/banner";
import { MobileBanner } from "components/Client/banner/mobile-banner";
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown,
} from "assets/styles/pages.style";
// Static Data Import Here
import { siteOffers } from "../../utils/site-offers";
import { sitePages } from "../../utils/site-pages";
import { SEO } from "components/Client/seo";
import { useRefScroll } from "../../utils/use-ref-scroll";
import { ModalProvider } from "../../context/Client/modal/modal.provider";

import Sidebar from "./layouts/sidebar/sidebar";
import Products from "components/Client/product-grid/product-list/product-list";
import CartPopUp from "components/Client/cart/cart-popup";

// const Sidebar = lazy(() => import("./layouts/sidebar/sidebar"));
// const Products = lazy(() => import("components/Client/product-grid/product-list/product-list"));
// const CartPopUp = lazy(() => import("components/Client/cart/cart-popup"));

const CategoryPage: React.FC<any> = ({ deviceType }) => {
  const { elRef: targetRef, scroll } = useRefScroll({
    percentOfElement: 0,
    percentOfContainer: 0,
    offsetPX: -110,
  });
  // React.useEffect(() => {
  //   if (query.text || query.category) {
  //     scroll();
  //   }
  // }, [query.text, query.category]);

  const page = sitePages;
  const PAGE_TYPE = "MAIN";
  return (
    <>
      <SEO title={page.page_title} description={page.page_description} />
      <ModalProvider>
        <Modal>
          <MobileBanner intlTitleId={page?.banner_title_id} type={PAGE_TYPE} />

          <Banner
            intlTitleId={page?.banner_title_id}
            intlDescriptionId={page?.banner_description_id}
            imageUrl={page?.banner_image_url}
          />

          <OfferSection>
            <div style={{ margin: "0 -10px" }}>
              <Carousel deviceType={deviceType} data={siteOffers} />
            </div>
          </OfferSection>

          <MobileCarouselDropdown>
            <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
          </MobileCarouselDropdown>

          <MainContentArea>
            <SidebarSection>
              <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
            </SidebarSection>

            <ContentSection>
              <div ref={targetRef}>
                <Products type={PAGE_TYPE} deviceType={deviceType} fetchLimit={20} />
              </div>
            </ContentSection>
          </MainContentArea>

          <CartPopUp deviceType={deviceType} />
        </Modal>
      </ModalProvider>
    </>
  );
};

export default CategoryPage;

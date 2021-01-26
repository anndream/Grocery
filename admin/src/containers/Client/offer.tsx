import React, { lazy } from "react";
import { SEO } from "components/Client/seo";
import CartPopUp from "components/Client/cart/cart-popup";
import { Modal } from "@redq/reuse-modal";
import GiftCard from "components/Client/gift-card/gift-card";
import Footer from "./layouts/footer";
import useCoupon from "services/use-coupon";
import {
  OfferPageWrapper,
  ProductsRow,
  MainContentArea,
  ProductsCol,
} from "assets/styles/pages.style";
import ErrorMessage from "components/Client/error-message/error-message";
// const ErrorMessage = lazy(() => import("components/Client/error-message/error-message"));

type GiftCardProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const GiftCardPage = ({ deviceType }) => {
  const { data, error } = useCoupon();
  if (error) return <ErrorMessage message={error.message} />;
  if (!data) return <p>Loading...</p>;

  return (
    <Modal>
      <SEO title="Offer - PickBazar" description="Offer Details" />
      <OfferPageWrapper>
        <MainContentArea>
          <div style={{ width: "100%" }}>
            <ProductsRow>
              {data.map(coupon => (
                <ProductsCol key={coupon.id}>
                  <GiftCard image={coupon.image} code={coupon.code} />
                </ProductsCol>
              ))}
            </ProductsRow>
          </div>
        </MainContentArea>
        <Footer />
      </OfferPageWrapper>
      <CartPopUp deviceType={deviceType} />
    </Modal>
  );
};

export default GiftCardPage;

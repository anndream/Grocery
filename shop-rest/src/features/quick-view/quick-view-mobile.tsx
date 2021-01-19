import React from "react";
import Router from "next/router";
// import { closeModal } from '@redq/reuse-modal';
import { Button } from "components/button/button";
import {
  QuickViewWrapper,
  ProductDetailsWrapper,
  ProductPreview,
  DiscountPercent,
  ProductInfoWrapper,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ProductWeight,
  ProductDescription,
  ButtonText,
  ProductMeta,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductPrice,
  SalePrice,
  ProductCartBtn,
  MetaSingle,
  MetaItem,
  ModalClose,
} from "./quick-view.style";
import { CloseIcon } from "assets/icons/CloseIcon";
import { CartIcon } from "assets/icons/CartIcon";
import { CURRENCY } from "utils/constant";

import ReadMore from "components/truncate/truncate";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import { useLocale } from "contexts/language/language.provider";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { FormattedMessage } from "react-intl";

type QuickViewProps = {
  modalProps: any;
  onModalClose?: any;
  hideModal: () => void;
  handleAddClick: (e, product) => void;
  handleRemoveClick: (e, product) => void;
  deviceType: any;
};

const QuickViewMobile: React.FunctionComponent<QuickViewProps> = ({
  modalProps,
  onModalClose,
  hideModal,
  handleAddClick,
  handleRemoveClick,
  deviceType,
}) => {
  const { addItem, removeItem, isInCart, getItem } = useCart();
  console.log(modalProps);
  const {
    id,
    type,
    name,
    product_unit,
    unit_price,
    discount_percentage,
    discount_amount,
    description,
    bannerImage,
    categories,
  } = modalProps;

  const { isRtl } = useLocale();

  // const handleAddClick = (e: any) => {
  //   e.stopPropagation();
  //   addItem(modalProps);
  // };

  // const handleRemoveClick = (e: any) => {
  //   e.stopPropagation();
  //   removeItem(modalProps);
  // };

  function onCategoryClick(slug) {
    Router.push({
      pathname: `/${type.toLowerCase()}`,
      query: { category: slug },
    }).then(() => window.scrollTo(0, 0));
    hideModal();
  }

  return (
    <>
      {/* <ModalClose onClick={onModalClose}>
        <CloseIcon />
      </ModalClose> */}
      <QuickViewWrapper className="quick-view-mobile-wrapper">
        <ProductDetailsWrapper className="product-card" dir="ltr">
          {!isRtl && (
            <ProductPreview>
              <CarouselWithCustomDots items={[{ url: bannerImage }]} deviceType={deviceType} />
              {!!discount_percentage && <DiscountPercent>{discount_percentage}%</DiscountPercent>}
            </ProductPreview>
          )}
          <ProductInfoWrapper dir={isRtl ? "rtl" : "ltr"}>
            <ProductInfo>
              <ProductTitlePriceWrapper>
                <ProductTitle>{name}</ProductTitle>
              </ProductTitlePriceWrapper>

              <ProductWeight>{product_unit}</ProductWeight>
              <ProductDescription>
                <ReadMore character={600}>{description}</ReadMore>
              </ProductDescription>

              <ProductMeta>
                <MetaSingle>
                  {categories
                    ? categories.map((item: any) => (
                        <MetaItem onClick={() => onCategoryClick(item.slug)} key={item.id}>
                          {item.title}
                        </MetaItem>
                      ))
                    : ""}
                </MetaSingle>
              </ProductMeta>

              <ProductCartWrapper>
                <ProductPriceWrapper>
                  <ProductPrice>
                    {CURRENCY}
                    {discount_amount ? discount_amount : unit_price}
                  </ProductPrice>

                  {discount_percentage ? (
                    <SalePrice>
                      {CURRENCY}
                      {unit_price}
                    </SalePrice>
                  ) : null}
                </ProductPriceWrapper>

                <ProductCartBtn>
                  {!isInCart(id) ? (
                    <Button
                      className="cart-button"
                      variant="secondary"
                      borderRadius={100}
                      onClick={e => handleAddClick(e, modalProps)}
                    >
                      <CartIcon mr={2} />
                      <ButtonText>
                        <FormattedMessage id="addCartButton" defaultMessage="Cart" />
                      </ButtonText>
                    </Button>
                  ) : (
                    <Counter
                      value={getItem(id).quantity}
                      onDecrement={e => handleRemoveClick(e, modalProps)}
                      onIncrement={e => handleAddClick(e, modalProps)}
                    />
                  )}
                </ProductCartBtn>
              </ProductCartWrapper>
            </ProductInfo>
          </ProductInfoWrapper>

          {isRtl && (
            <ProductPreview>
              <CarouselWithCustomDots items={[{ url: bannerImage }]} deviceType={deviceType} />
              {!!discount_percentage && <DiscountPercent>{discount_percentage}%</DiscountPercent>}
            </ProductPreview>
          )}
        </ProductDetailsWrapper>
      </QuickViewWrapper>
    </>
  );
};

export default QuickViewMobile;

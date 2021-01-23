import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "components/Client/button/button";
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  BackButton,
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
  RelatedItems,
} from "./product-details.style";
import { LongArrowLeft } from "assets/icons/LongArrowLeft";
import { CartIcon } from "assets/icons/CartIcon";
import ReadMore from "components/Client/truncate/truncate";
import CarouselWithCustomDots from "components/Client/multi-carousel/multi-carousel";
import Products from "components/Client/product-grid/product-list/product-list";
import { CURRENCY } from "utils/constants";
import { FormattedMessage } from "react-intl";
import { useCart } from "context/Client/cart/use-cart";
import { Counter } from "components/Client/counter/counter";

type ProductDetailsProps = {
  product: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({ product, deviceType }) => {
  const isRtl = false;
  const { addItem, removeItem, isInCart, getItem } = useCart();
  const data = product;
  const history = useHistory();

  const handleAddClick = e => {
    e.stopPropagation();
    addItem(data);
  };

  const handleRemoveClick = e => {
    e.stopPropagation();
    removeItem(data);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                type="button"
                size="small"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #f1f1f1",
                  color: "#77798c",
                }}
                onClick={history.goBack}
              >
                <LongArrowLeft style={{ marginRight: 5 }} />
                <FormattedMessage id="backBtn" defaultMessage="Back" />
              </Button>
            </BackButton>

            <CarouselWithCustomDots items={product.gallery} deviceType={deviceType} />
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? "rtl" : "ltr"}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPriceWrapper>
              {product.discountInPercent ? (
                <SalePrice>
                  {CURRENCY}
                  {product.price}
                </SalePrice>
              ) : null}

              <ProductPrice>
                {CURRENCY}
                {product.salePrice ? product.salePrice : product.price}
              </ProductPrice>
            </ProductPriceWrapper>
          </ProductTitlePriceWrapper>

          <ProductWeight>{product.unit}</ProductWeight>
          <ProductDescription>
            <ReadMore character={600}>{product.description}</ReadMore>
          </ProductDescription>

          <ProductCartWrapper>
            <ProductCartBtn>
              {!isInCart(data.id) ? (
                <Button
                  className="cart-button"
                  variant="secondary"
                  borderRadius={100}
                  onClick={handleAddClick}
                >
                  <CartIcon mr={2} />
                  <ButtonText>
                    <FormattedMessage id="addCartButton" defaultMessage="Cart" />
                  </ButtonText>
                </Button>
              ) : (
                <Counter
                  value={getItem(data.id).quantity}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                />
              )}
            </ProductCartBtn>
          </ProductCartWrapper>

          <ProductMeta>
            <MetaSingle>
              {product?.categories?.map((item: any) => (
                <Link
                  to={`/${product.type.toLowerCase()}?category=${item.slug}`}
                  key={`link-${item.id}`}
                >
                  {
                    <a>
                      <MetaItem>{item.title}</MetaItem>
                    </a>
                  }
                </Link>
              ))}
            </MetaSingle>
          </ProductMeta>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <BackButton>
              <Button
                title="Back"
                intlButtonId="backBtn"
                iconPosition="left"
                size="small"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #f1f1f1",
                  color: "#77798c",
                }}
                icon={<LongArrowLeft />}
                onClick={history.goBack}
              />
            </BackButton>

            <CarouselWithCustomDots items={product.gallery} deviceType={deviceType} />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>

      <RelatedItems>
        <h2>
          <FormattedMessage id="intlReletedItems" defaultMessage="Related Items" />
        </h2>
        <Products
          type={product.type.toLowerCase()}
          deviceType={deviceType}
          loadMore={false}
          fetchLimit={10}
        />
      </RelatedItems>
    </>
  );
};

export default ProductDetails;

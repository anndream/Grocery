// product card for general
import React, { lazy } from "react";
import Image from "components/Client/image/image";
import { Button } from "components/Client/button/button";
import {
  ProductCardWrapper,
  ProductImageWrapper,
  ProductInfo,
  DiscountPercent,
  ButtonText,
} from "../product-card.style";
import { useCart } from "context/Client/cart/use-cart";
import { Counter } from "components/Client/counter/counter";
import { cartAnimation } from "utils/cart-animation";
import { FormattedMessage } from "react-intl";
import { CartIcon } from "assets/icons/CartIcon";
import { useModal } from "context/Client/modal/use-modal";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "utils/use-query";
import QuickViewMobile from "components/Client/quick-view/quick-view-mobile";

type ProductCardProps = {
  title: string;
  image: any;
  weight: string;
  currency: string;
  description: string;
  price: number;
  salePrice?: number;
  discountInPercent?: number;
  data: any;
  onChange?: (e: any) => void;
  increment?: (e: any) => void;
  decrement?: (e: any) => void;
  cartProducts?: any;
  addToCart?: any;
  updateCart?: any;
  value?: any;
  deviceType?: any;
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  weight,
  price,
  salePrice,
  discountInPercent,
  cartProducts,
  addToCart,
  updateCart,
  value,
  currency,
  onChange,
  increment,
  decrement,
  data,
  deviceType,
  ...props
}) => {
  const { addItem, removeItem, getItem, isInCart, items, getItemCount } = useCart();
  const handleAddClick = (e, product) => {
    e.stopPropagation();

    let doAddToCart = getItemCount(product.id) <= product.product_unit;
    if (doAddToCart) addItem(product);
    else alert("No more unit left in stock");
  };
  const handleRemoveClick = (e, product) => {
    e.stopPropagation();
    removeItem(product);
  };

  const { pathname } = useLocation();
  const query = useQuery();
  const history = useHistory();

  const handleQuickViewModal = () => {
    // const as = `/product/${data.id}`;

    // if (pathname === "/product/[slug]") {
    //   history.push(as);

    //   if (typeof window !== "undefined") {
    //     window.scrollTo(0, 0);
    //   }
    //   return;
    // }
    showModal();
  };

  const [showModal, hideModal] = useModal(
    () => (
      <QuickViewMobile
        modalProps={data}
        handleAddClick={handleAddClick}
        handleRemoveClick={handleRemoveClick}
        hideModal={hideModal}
        deviceType={deviceType}
      />
    ),
    {
      onClose: () => {
        hideModal();
      },
    }
  );

  return (
    <ProductCardWrapper onClick={handleQuickViewModal} className="product-card">
      <ProductImageWrapper>
        <Image url={image} className="product-image" style={{ position: "relative" }} alt={title} />
        {discountInPercent ? <DiscountPercent>{discountInPercent}%</DiscountPercent> : null}
      </ProductImageWrapper>

      <ProductInfo>
        <h3 className="product-title">{title}</h3>
        <span className="product-weight">{weight}</span>
        <div className="product-meta">
          <div className="productPriceWrapper">
            {discountInPercent ? (
              <span className="discountedPrice">
                {currency}
                {price}
              </span>
            ) : null}

            <span className="product-price">
              {currency}
              {salePrice ? salePrice : price}
            </span>
          </div>

          {!isInCart(data.id) ? (
            <Button
              className="cart-button"
              variant="secondary"
              borderRadius={100}
              onClick={e => handleAddClick(e, data)}
            >
              <CartIcon mr={2} />
              <ButtonText>
                <FormattedMessage id="addCartButton" defaultMessage="Cart" />
              </ButtonText>
            </Button>
          ) : (
            <Counter
              value={getItem(data.id).quantity}
              onDecrement={e => handleRemoveClick(e, data)}
              onIncrement={e => handleAddClick(e, data)}
              className="card-counter"
            />
          )}
        </div>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;

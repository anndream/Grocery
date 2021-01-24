import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CartPopupBody,
  PopupHeader,
  PopupItemCount,
  CloseButton,
  PromoCode,
  CheckoutButtonWrapper,
  CheckoutButton,
  Title,
  PriceBox,
  NoProductMsg,
  ItemWrapper,
  CouponBoxWrapper,
  CouponCode,
} from "./cart.style";
import { CloseIcon } from "assets/icons/CloseIcon";
import { ShoppingBagLarge } from "assets/icons/ShoppingBagLarge";
import { CURRENCY } from "../../../utils/constants";
import { FormattedMessage } from "react-intl";

import { Scrollbar } from "../scrollbar/scrollbar";
import { useCart } from "../../../context/Client/cart/use-cart";
import { TextCartItem } from "./text-cart-item";
import Coupon from "../coupon/coupon";

type CartPropsType = {
  style?: any;
  className?: string;
  scrollbarHeight?: string;
  onCloseBtnClick?: (e: any) => void;
  onCheckout?: (e: any) => void;
};

const FixedCart: React.FC<CartPropsType> = ({ style, className, onCloseBtnClick, onCheckout }) => {
  const {
    items,
    coupon,
    addItem,
    removeItem,
    removeItemFromCart,
    cartItemsCount,
    calculatePrice,
    applyCoupon,
  } = useCart();
  const [hasCoupon, setCoupon] = useState(false);

  return (
    <CartPopupBody className={className} style={style}>
      <PopupHeader>
        <PopupItemCount>
          <ShoppingBagLarge width="19px" height="24px" />
          <span>
            {cartItemsCount}
            &nbsp;
            {cartItemsCount > 1 ? (
              <FormattedMessage id="cartItems" defaultMessage="items" />
            ) : (
              <FormattedMessage id="cartItem" defaultMessage="item" />
            )}
          </span>
        </PopupItemCount>

        <CloseButton onClick={onCloseBtnClick} className="fixedCartClose">
          <CloseIcon />
        </CloseButton>
      </PopupHeader>

      <Scrollbar className="cart-scrollbar">
        <ItemWrapper className="items-wrapper">
          {!!cartItemsCount ? (
            items.map(item => (
              <TextCartItem
                key={`cartItem-${item.id}`}
                onIncrement={() => addItem(item)}
                onDecrement={() => removeItem(item)}
                onRemove={() => removeItemFromCart(item)}
                data={item}
              />
            ))
          ) : (
            <NoProductMsg>
              <FormattedMessage id="noProductFound" defaultMessage="No products found" />
            </NoProductMsg>
          )}
        </ItemWrapper>
      </Scrollbar>

      <CheckoutButtonWrapper>
        <PromoCode>
          {!coupon?.discountInPercent ? (
            <>
              {!hasCoupon ? (
                <button onClick={() => setCoupon(prev => !prev)}>
                  <FormattedMessage id="specialCode" defaultMessage="Have a special code?" />
                </button>
              ) : (
                <CouponBoxWrapper>
                  <Coupon />
                </CouponBoxWrapper>
              )}
            </>
          ) : (
            <CouponCode>
              <FormattedMessage id="couponApplied" defaultMessage="Coupon Applied" />
              <span>{coupon.code}</span>
            </CouponCode>
          )}
        </PromoCode>

        {cartItemsCount !== 0 ? (
          <Link to="/checkout">
            <CheckoutButton onClick={onCheckout}>
              <>
                <Title>
                  <FormattedMessage id="nav.checkout" defaultMessage="Checkout" />
                </Title>
                <PriceBox>
                  {CURRENCY}
                  {calculatePrice()}
                </PriceBox>
              </>
            </CheckoutButton>
          </Link>
        ) : (
          <CheckoutButton>
            <>
              <Title>
                <FormattedMessage id="nav.checkout" defaultMessage="Checkout" />
              </Title>
              <PriceBox>
                {CURRENCY}
                {calculatePrice()}
              </PriceBox>
            </>
          </CheckoutButton>
        )}
      </CheckoutButtonWrapper>
    </CartPopupBody>
  );
};

export default FixedCart;
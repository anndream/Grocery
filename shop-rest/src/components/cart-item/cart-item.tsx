import React from "react";
import { Counter } from "components/counter/counter";
import { CloseIcon } from "assets/icons/CloseIcon";
import { CURRENCY } from "utils/constant";
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
  RemoveButton,
} from "./cart-item.style";

interface Props {
  data: any;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<Props> = ({ data, onDecrement, onIncrement, onRemove }) => {
  const { name, bannerImage, unit_price, discount_amount, product_unit, quantity } = data;
  const displayPrice = discount_amount ? discount_amount : unit_price;
  return (
    <ItemBox>
      <Counter
        value={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
      />
      <Image src={bannerImage} />
      <Information>
        <Name>{name}</Name>
        <Price>
          {CURRENCY}
          {displayPrice}
        </Price>
        <Weight>
          {quantity}
          {/* X {product_unit} */}
        </Weight>
      </Information>
      <Total>
        {CURRENCY}
        {(quantity * displayPrice).toFixed(2)}
      </Total>
      <RemoveButton onClick={onRemove}>
        <CloseIcon />
      </RemoveButton>
    </ItemBox>
  );
};

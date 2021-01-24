import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { handleModal } from "components/Client/checkouts/checkout-modal";
import { ProfileContext } from "context/Client/profile/profile.context";
import useUser from "services/use-user";
import PaymentGroup from "./payment-group";
import StripePaymentForm from "./stripe-form";
import { useCart } from "context/Client/cart/use-cart";
import { CardHeader } from "components/Client/card-header/card-header";
interface Props {
  deviceType: any;
  increment?: boolean;
}

const Payment = ({ deviceType, increment = false }: Props) => {
  const { deletePaymentCard } = useUser();
  const { calculatePrice } = useCart();

  const {
    state: { card },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async item => {
    dispatch({ type: "DELETE_CARD", payload: item.id });
    await deletePaymentCard(item.id);
  };
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage id="selectPaymentText" defaultMessage="Select Payment Option" />
      </CardHeader>
      <PaymentGroup
        name="payment"
        deviceType={deviceType}
        items={card ? card : []}
        onDelete={item => handleOnDelete(item)}
        onChange={(item: any) =>
          dispatch({
            type: "SET_PRIMARY_CARD",
            payload: item.id.toString(),
          })
        }
        handleAddNewCard={() => {
          handleModal(
            StripePaymentForm,
            { totalPrice: calculatePrice() },
            "add-address-modal stripe-modal"
          );
        }}
      />
    </>
  );
};

export default Payment;

import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import RadioGroup from "components/Client/radio-group/radio-group";
import RadioCard from "components/Client/radio-card/radio-card";
import { Button } from "components/Client/button/button";
import UpdateAddress from "components/Client/address/address-card";
import { handleModal } from "components/Client/checkouts/checkout-modal";
import { ProfileContext } from "context/Client/profile/profile.context";
import useUser from "services/use-user";
import { CardHeader } from "components/Client/card-header/card-header";
import { ButtonGroup } from "components/Client/button/button-group";
interface Props {
  increment?: boolean;
  icon?: boolean;
  buttonProps?: any;
  flexStart?: boolean;
}

const Address = ({
  increment = false,
  flexStart = false,
  icon = false,
  buttonProps = {
    size: "big",
    variant: "outlined",
    type: "button",
    className: "add-button",
  },
}: Props) => {
  const { deleteAddress } = useUser();

  const {
    state: { address },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async item => {
    dispatch({ type: "DELETE_ADDRESS", payload: item.id });
    await deleteAddress(item.id);
  };

  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage
          id="checkoutDeliveryAddress"
          defaultMessage="Select Your Delivery Address"
        />
      </CardHeader>
      <ButtonGroup flexStart={flexStart}>
        <RadioGroup
          items={address}
          component={(item: any, index?: number) => (
            <RadioCard
              id={index.toString()}
              key={index}
              title={""}
              content={item}
              name="address"
              checked={item.type === "primary"}
              onChange={() =>
                dispatch({
                  type: "SET_PRIMARY_ADDRESS",
                  payload: index,
                })
              }
              onEdit={() => handleModal(UpdateAddress, { item, index })}
              hasDelete={false}
              // onDelete={() => handleOnDelete(item)}
            />
          )}
          secondaryComponent={
            null
            // <Button
            //   {...buttonProps}
            //   onClick={() => handleModal(UpdateAddress, "add-address-modal")}
            //   style={{ borderStyle: "dashed" }}
            // >
            //   {icon && (
            //     <Box mr={2}>
            //       <Plus width="10px" />
            //     </Box>
            //   )}
            //   <FormattedMessage id="addAddressBtn" defaultMessage="Add Address" />
            // </Button>
          }
        />
      </ButtonGroup>
    </>
  );
};

export default Address;

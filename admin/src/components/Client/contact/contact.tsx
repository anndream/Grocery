import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import RadioGroup from "components/Client/radio-group/radio-group";
import RadioCard from "components/Client/radio-card/radio-card";
import { Button } from "components/Client/button/button";
import { handleModal } from "components/Client/checkouts/checkout-modal";
import { ProfileContext } from "context/Client/profile/profile.context";
import useUser from "services/use-user";
import CreateOrUpdateContact from "components/Client/contact/contact-card";
import { CardHeader } from "components/Client/card-header/card-header";
import { ButtonGroup } from "components/Client/button/button-group";
import { Box } from "components/Client/box";
import { Plus } from "assets/icons/PlusMinus";
interface Props {
  increment?: boolean;
  flexStart?: boolean;
  icon?: boolean;
  buttonProps?: any;
}

const Contact = ({
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
  const { deleteContactNumber } = useUser();

  const {
    state: { contact },
    dispatch,
  } = useContext(ProfileContext);

  const handleOnDelete = async item => {
    dispatch({ type: "DELETE_CONTACT", payload: item.id });
    await deleteContactNumber(item.id);
  };
  return (
    <>
      <CardHeader increment={increment}>
        <FormattedMessage id="contactNumberText" defaultMessage="Select Your Contact Number" />
      </CardHeader>
      <ButtonGroup flexStart={flexStart}>
        <RadioGroup
          items={contact}
          component={(item: any, index?: number) => (
            <RadioCard
              id={index.toString()}
              key={index}
              title={""}
              content={item}
              checked={item.type === "primary"}
              onChange={() =>
                dispatch({
                  type: "SET_PRIMARY_CONTACT",
                  payload: index,
                })
              }
              name="contact"
              onEdit={() => handleModal(CreateOrUpdateContact, { item, index })}
              hasDelete={false}
              // onDelete={() => handleOnDelete(item)}
            />
          )}
          secondaryComponent={
            null
            // <Button
            //   {...buttonProps}
            //   onClick={() => handleModal(CreateOrUpdateContact, "add-contact-modal")}
            // >
            //   {icon && (
            //     <Box mr={2}>
            //       <Plus width="10px" />
            //     </Box>
            //   )}
            //   <FormattedMessage id="addContactBtn" defaultMessage="Add Contact" />
            // </Button>
          }
        />
      </ButtonGroup>
    </>
  );
};

export default Contact;

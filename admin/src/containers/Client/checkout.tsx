import React, { useEffect } from "react";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/Client/seo";
import Checkout from "components/Client/checkouts/checkout";
import { ProfileProvider } from "context/Client/profile/profile.provider";
import ErrorMessage from "components/Client/error-message/error-message";
import useUser from "services/use-user";
import { useHistory } from "react-router-dom";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage = ({ deviceType }) => {
  console.log("Checkout initiated");
  const { user } = useUser();
  const histroy = useHistory();
  // if (error) return <ErrorMessage message={error.message} />;
  if (!user) {
    alert("Please login to checkout");
    histroy.push("/login");
  }

  const token = "true";

  return (
    <>
      <SEO title="Checkout - PickBazar" description="Checkout Details" />
      <ProfileProvider initData={user}>
        <Modal>
          <Checkout token={token} deviceType={deviceType} />
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default CheckoutPage;

import React, { useEffect } from "react";
import { NextPage } from "next";
import { Modal } from "@redq/reuse-modal";
import { SEO } from "components/seo";
import Checkout from "features/checkouts/checkout-two/checkout-two";
import { ProfileProvider } from "contexts/profile/profile.provider";
import ErrorMessage from "components/error-message/error-message";
import useUser from "data/use-user";
import { useRouter } from "next/router";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CheckoutPage: NextPage<Props> = ({ deviceType }) => {
  console.log("Checkout initiated");
  const { user } = useUser();
  const router = useRouter();
  // if (error) return <ErrorMessage message={error.message} />;
  if (!user) {
    alert("Please login to checkout");
    router.push("/login");
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

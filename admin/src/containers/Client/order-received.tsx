import React from "react";
import { SEO } from "components/Client/seo";
import OrderReceived from "components/Client/order/order-received";

const OrderReceivedPage = () => {
  return (
    <>
      <SEO title="Invoice - PickBazar" description="Invoice Details" />
      <OrderReceived />
    </>
  );
};

export default OrderReceivedPage;

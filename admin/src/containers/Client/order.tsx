import React from "react";
import { SEO } from "components/Client/seo";
import Order from "components/Client/user-profile/order/order";
import { PageWrapper, SidebarSection } from "components/Client/user-profile/user-profile.style";
import Sidebar from "components/Client/user-profile/sidebar/sidebar";
import { Modal } from "@redq/reuse-modal";

const OrderPage = () => {
  return (
    <>
      <SEO title="Order - PickBazar" description="Order Details" />
      <Modal>
        <PageWrapper>
          <SidebarSection>
            <Sidebar />
          </SidebarSection>
          <Order />
        </PageWrapper>
      </Modal>
    </>
  );
};

export default OrderPage;

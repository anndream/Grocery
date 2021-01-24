import React from "react";
import { Modal } from "@redq/reuse-modal";
import { ProfileProvider } from "context/Client/profile/profile.provider";
import SettingsContent from "components/Client/user-profile/settings/settings";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "components/Client/user-profile/user-profile.style";
import Sidebar from "components/Client/user-profile/sidebar/sidebar";
import { SEO } from "components/Client/seo";
import Footer from "./layouts/footer";
import ErrorMessage from "components/Client/error-message/error-message";
import useUser from "services/use-user";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage = ({ deviceType }) => {
  const { user } = useUser();
  if (!user) return <div>Please login</div>;

  return (
    <>
      <SEO title="Profile - PickBazar" description="Profile Details" />
      <ProfileProvider initData={user}>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar />
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>

            <Footer />
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default ProfilePage;

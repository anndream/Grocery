import React, { useContext } from "react";
import { ProfileContext } from "context/Client/profile/profile.context";
import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  Row,
  Col,
} from "./settings.style";
import { Button } from "components/Client/button/button";
import { Input } from "components/Client/forms/input";
import { FormattedMessage } from "react-intl";
import { Label } from "components/Client/forms/label";
import Contact from "components/Client/contact/contact";
import Address from "components/Client/address/address";
import Payment from "components/Client/payment/payment";

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {
  const { state, dispatch } = useContext(ProfileContext);

  const handleChange = e => {
    const { value, name } = e.target;
    dispatch({
      type: "HANDLE_ON_INPUT_CHANGE",
      payload: { value, field: name },
    });
  };

  const handleSave = async () => {
    const { name, email } = state;
    console.log(name, email, "name, email");
  };

  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
            <FormattedMessage id="profilePageTitle" defaultMessage="Your Profile" />
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: "flex-end", marginBottom: "50px" }}>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage id="profileNameField" defaultMessage="Your Name" />
            </Label>
            <Input
              type="text"
              label="Name"
              name="name"
              value={state.name}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
              height="48px"
            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
              <FormattedMessage id="profileEmailField" defaultMessage="Your Email" />
            </Label>
            <Input
              type="email"
              name="email"
              label="Email Address"
              value={state.email}
              onChange={handleChange}
              backgroundColor="#F7F7F7"
            />
          </Col>

          <Col xs={12} sm={2} md={2} lg={2}>
            <Button size="big" style={{ width: "100%" }} onClick={handleSave}>
              <FormattedMessage id="profileSaveBtn" defaultMessage="Save" />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
              <Contact />
            </SettingsFormContent>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: "relative" }}>
            <SettingsFormContent>
              <Address />
            </SettingsFormContent>
          </Col>
        </Row>

        {/* <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
              <Payment deviceType={deviceType} />
            </SettingsFormContent>
          </Col>
        </Row> */}
      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
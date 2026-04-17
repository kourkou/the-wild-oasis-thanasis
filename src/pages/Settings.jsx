import styled from "styled-components";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Box from "../ui/Box";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const FormBox = styled(Box)`
  border-radius: 12px;
  overflow: hidden;
`;
function Settings() {
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Settings</Heading>
      </Row>
      <FormBox>
        <UpdateSettingsForm />
      </FormBox>
    </Row>
  );
}

export default Settings;

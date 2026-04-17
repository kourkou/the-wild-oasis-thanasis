import styled from "styled-components";
import SignupForm from "../features/authentication/SignupForm";
import Box from "../ui/Box";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
const FormBox = styled(Box)`
  border-radius: 12px;
  overflow: hidden;
`;
function Users() {
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Create a new user</Heading>
      </Row>
      <FormBox>
        <SignupForm />
      </FormBox>
    </Row>
  );
}

export default Users;

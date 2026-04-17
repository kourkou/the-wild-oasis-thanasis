import styled from "styled-components";
import Heading from "../ui/Heading";

import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const Section = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
`;

const Row = styled.div`
  flex-direction: column;

  gap: 1.6rem;
`;

function Account() {
  return (
    <Row>
      <Heading as="h1">Update your account</Heading>

      <Section>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Section>

      <Section>
        <Heading as="h3">Update your passward</Heading>
        <UpdatePasswordForm />
      </Section>
    </Row>
  );
}

export default Account;

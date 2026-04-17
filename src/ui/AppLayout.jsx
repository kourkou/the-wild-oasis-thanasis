import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";
import useUser from "../features/authentication/useUser";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr;
  height: 100vh;
`;

const Main = styled.div`
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Container = styled.div`
  padding: 4rem 4.8rem 6.4rem;
  overflow: auto;
`;

function AppLayout() {
  const { user } = useUser();

  useEffect(() => {
    const fullName = user?.user_metadata?.fullName;

    document.title = fullName
      ? `The Wild Oasis | ${fullName}`
      : "The Wild Oasis";

    return () => {
      document.title = "The Wild Oasis";
    };
  }, [user]);

  return (
    <StyledAppLayout>
      <Sidebar />
      <Main>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;

import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  display: flex;
  border-right: 1px solid var(--color-grey-200);
  flex-direction: column;
  gap: 3.2rem;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;

import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: #fff;
  padding: 2rem 4.8rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;

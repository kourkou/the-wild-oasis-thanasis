import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import useUser from "../features/authentication/useUser";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.6rem;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  display: block;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-200);
`;

function Header() {
  const { user } = useUser();

  const fullName = user?.user_metadata?.fullName ?? "Guest user";
  const avatar = user?.user_metadata?.avatar || "/default-user.jpg";

  return (
    <StyledHeader>
      <UserBox>
        <Avatar src={avatar} alt={`Avatar of ${fullName}`} />
        <span>{fullName}</span>
      </UserBox>

      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;

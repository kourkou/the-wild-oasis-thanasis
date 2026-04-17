import styled from "styled-components";
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import useLogout from "../features/authentication/useLogout";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  padding: 0.6rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-600);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-800);
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-brand-600);
  }
`;

function HeaderMenu() {
  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <StyledHeaderMenu>
      <li>
        <IconButton
          type="button"
          aria-label="User account"
          disabled={isLoading}
          onClick={() => navigate("/account")}
        >
          <HiOutlineUser />
        </IconButton>
      </li>

      <li>
        <IconButton
          type="button"
          aria-label="Toggle dark mode"
          disabled={isLoading}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </IconButton>
      </li>

      <li>
        <IconButton
          type="button"
          aria-label="Logout"
          disabled={isLoading}
          onClick={logout}
        >
          <HiArrowRightOnRectangle />
        </IconButton>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;

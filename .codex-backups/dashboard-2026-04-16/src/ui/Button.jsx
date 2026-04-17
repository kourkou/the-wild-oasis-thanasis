import styled, { css } from "styled-components";

const variations = {
  primary: css`
    background-color: var(--color-brand-600);
    color: var(--color-grey-0);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    background-color: var(--color-grey-0);
    color: var(--color-grey-700);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  delete: css`
    background-color: var(--color-red-700);
    color: var(--color-red-100);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const StyledButton = styled.button`
  border: none;
  background-color: var(--color-brand-600);
  color: var(--color-grey-0);
  padding: 0.8rem 1.6rem;
  border-radius: 6px;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${(props) => variations[props.$variation]}
`;

function Button({ children, variation = "primary", ...props }) {
  return (
    <StyledButton $variation={variation} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;

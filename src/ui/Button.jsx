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

const sizes = {
  small: css`
    font-size: 1.1rem;
    padding: 0.2rem 0.4rem;
    font-weight: 500;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 0.8rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const StyledButton = styled.button`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${(props) => variations[props.$variation]}
  ${(props) => sizes[props.$size]}
`;

function Button({
  children,
  variation = "primary",
  size = "medium",
  ...props
}) {
  return (
    <StyledButton $variation={variation} $size={size} {...props}>
      {children}
    </StyledButton>
  );
}

export default Button;

import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  font-size: 1.4rem;
  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({ onConfirm, disabled, onClose }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete booking</Heading>
      <p>
        Are you sure you want to delete this booking permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button variation="secondary" onClick={onClose} disabled={disabled}>
          Cancel
        </Button>
        <Button variation="delete" onClick={onConfirm} disabled={disabled}>
          {disabled ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

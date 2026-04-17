import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(24, 33, 47, 0.5);
  backdrop-filter: blur(1px);
  z-index: 1000;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: 12px;
  padding: 3.2rem 4rem;
  transition: all 0.3s;
  width: min(72rem, 90vw);
  max-height: 90vh;
  overflow: auto;
  z-index: 1001;
`;

const Button = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

function Modal({ children, onClose }) {
  return createPortal(
    <>
      <Overlay onClick={onClose} />
      <StyledModal>
        <Button onClick={onClose}>
          <HiXMark />
        </Button>
        {children}
      </StyledModal>
    </>,
    document.body,
  );
}

export default Modal;

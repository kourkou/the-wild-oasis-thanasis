import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

import BookingDataBox from "../features/bookings/BookingDataBox";
import useBooking from "../features/bookings/useBooking";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";
import useCheckout from "../features/check-in-out/useCheckout";
import useDeleteBooking from "../features/bookings/useDeleteBooking";
import { useState } from "react";
import Modal from "../ui/Modal";
import ConfirmDelete from "../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const statusStyles = {
  unconfirmed: css`
    color: var(--color-blue-700);
    background-color: var(--color-blue-100);
  `,
  "checked-in": css`
    color: var(--color-green-700);
    background-color: var(--color-green-100);
  `,
  "checked-out": css`
    color: var(--color-silver-700);
    background-color: var(--color-silver-100);
  `,
};

const Tag = styled.span`
  display: inline-block;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;

  ${(props) => statusStyles[props.$status]}
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--color-brand-600);
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    color: var(--color-brand-700);
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-500);
`;
const ButtonList = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1.2rem;
  justify-content: end;
`;
function Booking() {
  const { booking, isLoading: isLoadingBooking, error } = useBooking();
  const navigate = useNavigate();
  const { checkoutMutation, isLoading: isCheckingOut } = useCheckout();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteBookingMutation, isLoading: isDeleting } = useDeleteBooking();
  function handleBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate("/bookings");
  }

  function handleCheckout() {
    checkoutMutation(bookingId);
  }
  function handleConfirmDeletion() {
    deleteBookingMutation(booking.id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        navigate("/bookings");
      },
    });
  }
  function handleDelete() {
    setShowDeleteModal(true);
  }
  if (isLoadingBooking) return <Spinner />;
  if (error) return <Empty>Booking could not be loaded.</Empty>;
  if (!booking) return <Empty>No booking could be found.</Empty>;
  const { status, id: bookingId } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag $status={status}>{status.replaceAll("-", " ")}</Tag>
        </HeadingGroup>

        <BackButton type="button" onClick={handleBack}>
          &larr; Back
        </BackButton>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonList>
        {booking.status === "unconfirmed" ? (
          <Button
            variation="primary"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check In
          </Button>
        ) : booking.status === "checked-in" ? (
          <Button
            variation="primary"
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? "Checking out..." : "Check out"}
          </Button>
        ) : (
          ""
        )}
        <Button variation="delete" onClick={handleDelete}>
          Delete booking
        </Button>
        <Button variation="secondary" onClick={() => navigate("/dashboard")}>
          Back
        </Button>
      </ButtonList>
      {showDeleteModal && (
        <Modal onClose={() => setShowDeleteModal(false)}>
          <ConfirmDelete
            onConfirm={handleConfirmDeletion}
            onClose={() => setShowDeleteModal(false)}
            disabled={isDeleting}
          />
        </Modal>
      )}
    </>
  );
}

export default Booking;

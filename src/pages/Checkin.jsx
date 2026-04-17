import styled from "styled-components";
import BookingDataBox from "../features/bookings/BookingDataBox";
import useBooking from "../features/bookings/useBooking";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import useCheckin from "../features/check-in-out/useCheckin";
import { useEffect, useState } from "react";
import useSettings from "../features/settings/useSettings";
import { formatCurrency } from "../helpers/formatCurrency";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
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
const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-top: 1.2rem;
`;

const CheckboxRow = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    accent-color: var(--color-brand-600);
    outline-offset: 2px;
    cursor: pointer;
  }

  & label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    color: var(--color-grey-700);
  }
`;
function Checkin() {
  const { booking, isLoading: isLoadingBooking, error } = useBooking();
  const navigate = useNavigate();

  const { checkinMutation, isLoading: isCheckingIn } = useCheckin();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const {
    settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  function handleBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate("/bookings");
  }
  function handleCheckin() {
    if (!paymentConfirmed) return;

    if (addBreakfast) {
      checkinMutation({
        bookingId: booking.id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: booking.totalPrice + optionalBreakfastPrice,
        },
      });
      return;
    }

    checkinMutation({ bookingId: booking.id });
  }
  const currentSettings = settings?.data?.[0];

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;
  if (error) return <Empty>Booking could not be loaded.</Empty>;
  if (settingsError) return <Empty>Settings could not be loaded.</Empty>;
  if (!booking) return <Empty>No booking could be found.</Empty>;
  if (!currentSettings) return <Empty>No settings found.</Empty>;

  const optionalBreakfastPrice =
    currentSettings.breakfastPrice * booking.numNights * booking.numGuests;

  const paymentConfirmed = confirmPaid;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Check in Booking #{booking.id}</Heading>
        </HeadingGroup>

        <BackButton type="button" onClick={handleBack}>
          &larr; Back
        </BackButton>
      </Row>
      <BookingDataBox booking={booking} />
      {!booking.hasBreakfast && (
        <Box>
          <CheckboxRow>
            <input
              type="checkbox"
              id="breakfast"
              checked={addBreakfast}
              onChange={() => {
                setAddBreakfast((current) => !current);
                setConfirmPaid(false);
              }}
              disabled={isCheckingIn}
            />
            <label htmlFor="breakfast">
              Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
              ?
            </label>
          </CheckboxRow>
        </Box>
      )}
      <Box>
        <CheckboxRow>
          <input
            type="checkbox"
            id="confirm-paid"
            checked={paymentConfirmed}
            onChange={() => setConfirmPaid((current) => !current)}
            disabled={paymentConfirmed || isCheckingIn}
          />
          <label htmlFor="confirm-paid">
            I confirm that {booking.guests.fullName} has paid the total amount
            of{" "}
            {!addBreakfast
              ? formatCurrency(booking.totalPrice)
              : `${formatCurrency(booking.totalPrice)} + ${formatCurrency(
                  optionalBreakfastPrice,
                )} (${formatCurrency(booking.totalPrice + optionalBreakfastPrice)})`}
          </label>
        </CheckboxRow>
      </Box>
      <ButtonList>
        {booking.status === "unconfirmed" && (
          <Button
            variation="primary"
            onClick={handleCheckin}
            disabled={!paymentConfirmed || isCheckingIn}
          >
            Check In booking #{booking.id}
          </Button>
        )}
        <Button variation="secondary" onClick={handleBack}>
          Back
        </Button>
      </ButtonList>
    </>
  );
}

export default Checkin;

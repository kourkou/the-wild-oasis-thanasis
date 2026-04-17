import styled from "styled-components";
import { format, isPast, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import { formatCurrency } from "../../helpers/formatCurrency";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  margin-top: 1.2rem;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: var(--color-brand-100);
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & svg {
    height: 3rem;
    width: 3rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.6rem;
  }

  & span {
    font-family: "Sono";
    font-size: 1.8rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;
const Flag = styled.img`
  max-width: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;
const DataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-600);
    margin-top: 0.2rem;
    flex-shrink: 0;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  & label {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--color-grey-500);
    text-transform: uppercase;
  }

  & p {
    color: var(--color-grey-700);
    font-size: 1.4rem;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.$isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2rem;
    width: 2rem;
    color: currentColor;
  }
`;

const PriceLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  & div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  & label {
    font-size: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  & span {
    font-size: 1.4rem;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    hasBreakfast,
    cabinPrice,
    extrasPrice,
    observations,
    isPaid,
    guests: { fullName, email, nationalID, countryFlag },
    cabins: { name },
  } = booking;
  const priceBreakdown = hasBreakfast
    ? `${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast`
    : `${formatCurrency(cabinPrice)} cabin`;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const stayLabel = isToday(start)
    ? "Today"
    : isPast(start)
      ? "Past"
      : "Upcoming";
  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin <span>{name}</span>
          </p>
        </div>

        <p>
          {format(start, "EEE, MMM dd yyyy")} ({stayLabel}) &mdash;{" "}
          {format(end, "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${fullName}`} />}
          <p>
            {fullName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </Guest>

        {observations && (
          <DataItem>
            <HiOutlineChatBubbleBottomCenterText />
            <div>
              <label>Observations</label>
              <p>{observations}</p>
            </div>
          </DataItem>
        )}

        <DataItem>
          <HiOutlineCheckCircle />
          <div>
            <label>Breakfast included?</label>
            <p>{hasBreakfast ? "Yes" : "No"}</p>
          </div>
        </DataItem>

        <Price $isPaid={isPaid}>
          <PriceLeft>
            <HiOutlineCurrencyDollar />
            <div>
              <label>Total price</label>
              <span>
                {formatCurrency(totalPrice)} ({priceBreakdown})
              </span>
            </div>
          </PriceLeft>

          <p>{isPaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;

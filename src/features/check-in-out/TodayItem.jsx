import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";

import useCheckout from "./useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 0.8rem;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
`;

const Nights = styled.div`
  font-size: 1.2rem;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;
  const navigate = useNavigate();
  const { checkoutMutation, isLoading: isCheckingOut } = useCheckout();
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag $type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag $type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.fullName}`} />
      <Guest>{guests.fullName}</Guest>
      <Nights>{numNights} nights</Nights>

      {status === "unconfirmed" && (
        <Button
          variation="primary"
          size="small"
          onClick={() => navigate(`/checkin/${id}`)}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          variation="primary"
          size="small"
          onClick={() => checkoutMutation(id)}
          disabled={isCheckingOut}
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;


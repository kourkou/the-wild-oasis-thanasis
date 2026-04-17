import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Box from "../ui/Box";
import BookingTable from "../features/bookings/BookingTable";
import styled from "styled-components";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
const OperationsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const TableBox = styled(Box)`
  overflow: visible;
  margin-bottom: 3.2rem;
`;
function Bookings() {
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Bookings</Heading>
        <OperationsWrapper>
          <BookingTableOperations />
        </OperationsWrapper>
      </Row>
      <TableBox>
        <BookingTable />
      </TableBox>
    </Row>
  );
}

export default Bookings;

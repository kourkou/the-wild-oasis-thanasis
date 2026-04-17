import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import useBookings from "./useBookings";
import Pagination from "../../ui/Pagination";

const columns = "1.2fr 2.4fr 2fr 1.1fr 1fr 0.6fr";

export default function BookingTable() {
  const { bookings, count, isLoading, error } = useBookings();

  if (isLoading) return <Spinner />;
  if (error) return <p>Could not load bookings</p>;

  return (
    <Table columns={columns}>
      <Table.Header>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={bookings}
        render={(booking) => <BookingRow booking={booking} key={booking.id} />}
      />

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

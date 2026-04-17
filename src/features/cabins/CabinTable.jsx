import CabinRow from "./CabinRow";

import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";
import useCabins from "./useCabins";
import Spinner from "../../ui/Spinner";

const columns = "0.6fr 1.8fr 2.2fr 1fr 1fr 1fr";

function CabinTable({ onEditCabin }) {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "name-asc";

  const { cabins, isLoading, error } = useCabins();
  let filteredCabins = cabins;

  if (error) return <p>Could not load cabins</p>;
  if (isLoading) return <Spinner />;
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  if (filter === "with-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  if (filter === "no-discount") {
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  }

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (field === "name") {
      if (a.name < b.name) return -1 * modifier;
      if (a.name > b.name) return 1 * modifier;
      return 0;
    }

    return (a[field] - b[field]) * modifier;
  });
  return (
    <Table columns={columns}>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={sortedCabins}
        render={(cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} onEditCabin={onEditCabin} />
        )}
      />
    </Table>
  );
}

export default CabinTable;

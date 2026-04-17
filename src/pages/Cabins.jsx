import styled from "styled-components";
import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Box from "../ui/Box";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const OperationsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const TableBox = styled(Box)`
  overflow: visible;
`;

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  const [cabinToEdit, setCabinToEdit] = useState(null);

  function handleAddCabin() {
    setCabinToEdit(null);
    setShowForm(true);
  }
  function handleEditCabin(cabin) {
    setCabinToEdit(cabin);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setCabinToEdit(null);
  }
  return (
    <Row type="vertical">
      <Row type="horizontal">
        <Heading as="h1">Cabins</Heading>

        <OperationsWrapper>
          <CabinTableOperations />
        </OperationsWrapper>
      </Row>

      <TableBox>
        <CabinTable onEditCabin={handleEditCabin} />
      </TableBox>
      <Button onClick={handleAddCabin}>Add new cabin</Button>
      {showForm && (
        <Modal onClose={handleCloseForm}>
          <CreateCabinForm
            onClose={handleCloseForm}
            cabinToEdit={cabinToEdit}
          />
        </Modal>
      )}
    </Row>
  );
}

export default Cabins;

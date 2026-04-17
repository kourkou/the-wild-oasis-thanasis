import { createContext, useContext } from "react";
import styled from "styled-components";

const TableContext = createContext();

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  overflow: visible;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
`;

const StyledHeader = styled(CommonRow)`
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-700);
  padding: 1.6rem 2.4rem;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Body = styled.section`
  overflow: visible;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:not(:has(*)) {
    display: none;
  }
`;

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function TableBody({ data, render }) {
  if (!data.length) return <Body>No data to show at the moment</Body>;

  return <Body>{data.map(render)}</Body>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = TableBody;
Table.Footer = Footer;

export default Table;

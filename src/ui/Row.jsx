import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      width: 100%;
      align-items: center;
      justify-content: space-between;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      align-items: flex-start;
      gap: 1.6rem;
    `}
`;

export default Row;

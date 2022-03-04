import React from "react";
import styled from "styled-components";

const Tile = ({ value, status }) => {
  return <TileContainer status={status}>{value}</TileContainer>;
};

export default Tile;

const TileContainer = styled.div`
  font-size: 2rem; /* might need to use clamp */
  font-weight: bold;
  color: white;
  border: 2px solid hsl(240, 2%, 23%);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  user-select: none;

  ${(props) => {
    if (props.status === "active") {
      return `
          border-color: hsl(200, 1%, 34%);  
        `;
    } else if (props.status === "wrong") {
      return `
          border: none;
          background-color: hsl(240, 2%, 23%);
        `;
    } else if (props.status === "wrong-location") {
      return `
          border: none;
          background-color: hsl(49, 51%, 47%);
        `;
    } else if (props.status === "correct") {
      return `
          border: none;
          background-color: hsl(115, 29%, 43%);
        `;
    }
  }}
`;

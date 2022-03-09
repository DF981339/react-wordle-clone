import React from "react";
import styled from "styled-components";
import AlertItem from "./AlertItem";

const Alerts = ({ alertsList }) => {
  return (
    <AlertsContainer>
      {alertsList.map(({ id, alertMsg }) => (
        <AlertItem key={id} message={alertMsg} />
      ))}
    </AlertsContainer>
  );
};

export default Alerts;

const AlertsContainer = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 10;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

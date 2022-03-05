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
  top: 10vh;
  left: 50vw;
  transform: translate(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

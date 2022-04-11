import { useEffect, useRef } from "react";
import styled from "styled-components";

const CenterModal = (props) => {
  const statsRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  const handleClickOutside = (e) => {
    if (statsRef.current && !statsRef.current.contains(e.target))
      props.handleClose();
  };

  return (
    <ModalContainer ref={statsRef} {...props}>
      {props.children}
    </ModalContainer>
  );
};
export default CenterModal;

const ModalContainer = styled.div`
  border-radius: 8px;
  width: 90%;
  max-height: 90%;
  max-width: 500px;
  overflow-y: auto;
  padding: 16px;
  border: 1px solid
    ${(props) =>
      props.darkTheme
        ? "var(--dark-mode-stats-border)"
        : "var(--light-mode-stats-border)"};
  background-color: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-stats-bg)"
      : "var(--light-mode-stats-bg)"};
  color: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-stats-text)"
      : "var(--light-mode-stats-text)"};
  position: relative;
  box-shadow: 0 4px 23px 0 rgb(0 0 0 / 20%);
`;

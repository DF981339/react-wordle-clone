import styled from "styled-components";

const Overlay = (props) => {
  return <OverlayContainer {...props}>{props.children}</OverlayContainer>;
};
export default Overlay;

const OverlayContainer = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.darkTheme ? "var(--dark-mode-overlay)" : "var(--light-mode-overlay)"};
  z-index: 20;
`;

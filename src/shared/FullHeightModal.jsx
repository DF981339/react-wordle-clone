import styled from "styled-components";

const FullHeightModal = (props) => {
  return (
    <FullHeightModalContainer {...props}>
      {props.children}
    </FullHeightModalContainer>
  );
};
export default FullHeightModal;

const FullHeightModalContainer = styled.section`
  position: absolute;
  color: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-header-text)"
      : "var(--light-mode-header-text)"};
  background-color: ${(props) =>
    props.darkTheme ? "var(--dark-mode-bg)" : "var(--light-mode-bg)"};
  z-index: 20;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

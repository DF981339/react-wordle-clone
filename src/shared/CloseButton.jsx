import styled from "styled-components";

const CloseButton = (props) => {
  return (
    <CloseButtonContainer {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          fill="var(--color-tone-1)"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        ></path>
      </svg>
    </CloseButtonContainer>
  );
};
export default CloseButton;

const CloseButtonContainer = styled.div`
  fill: ${(props) =>
    props.darkTheme
      ? "var(--dark-mode-header-icon)"
      : "var(--light-mode-header-icon)"};
  position: absolute;
  right: 0;
  user-select: none;
  cursor: pointer;

  &:hover {
    fill: ${(props) =>
      props.darkTheme
        ? "var(--dark-mode-header-text)"
        : "var(--light-mode-header-text)"};
  }
`;

import styled from "styled-components";

export const CloseButton = styled.div`
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

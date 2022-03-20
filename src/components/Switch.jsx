import styled from "styled-components";
import { useTheme } from "../context/ThemeProvider";

const Switch = () => {
  const [isToggle, setIsToggle] = useTheme();

  return (
    <SwitchContainer toggle={isToggle} onClick={() => setIsToggle(!isToggle)}>
      <span className="knob"></span>
    </SwitchContainer>
  );
};
export default Switch;

const SwitchContainer = styled.div`
  height: 20px;
  width: 32px;
  background-color: var(--switch-bg);
  background-color: ${(props) =>
    props.toggle ? "var(--dark-mode-correct)" : "var(--switch-bg)"};
  border-radius: 999px;
  position: relative;

  .knob {
    position: absolute;
    top: 2px;
    left: 2px;
    height: 16px;
    width: 16px;
    background-color: var(--switch-knob);
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s;

    ${(props) => {
      if (props.toggle) {
        return `
          transform: translateX(calc(100% - 4px));
        `;
      }
    }}
  }
`;

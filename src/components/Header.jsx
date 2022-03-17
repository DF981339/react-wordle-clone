import React from "react";
import styled from "styled-components";
import { useHelp, useSetting } from "../context/HeaderFunctionProvider";

const Header = () => {
  const [showHelp, setShowHelp] = useHelp();
  const [showSetting, setShowSetting] = useSetting();

  return (
    <HeaderContainer>
      <div className="side-icon-left">
        {/* help icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          className="header-icon"
          onClick={setShowHelp}
        >
          <path
            fill="var(--color-tone-1)"
            d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"
          ></path>
        </svg>
      </div>

      <div className="title">
        <div className="main-title">WORDLE</div>
        <div className="sub-title">(clone)</div>
      </div>

      <div className="side-icon-right">
        <span>
          {/* chart icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="header-icon"
          >
            <path
              fill="var(--color-tone-1)"
              d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"
            ></path>
          </svg>
        </span>

        <span className="setting-icon">
          {/* setting icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="header-icon"
            onClick={setShowSetting}
          >
            <path
              fill="var(--color-tone-1)"
              d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"
            ></path>
          </svg>
        </span>
      </div>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: var(--dark-mode-header-text);
  fill: var(--dark-mode-header-icon);
  border-bottom: 1px solid var(--dark-mode-header-border);

  .side-icon-left {
    display: flex;
    width: 10%;
    justify-content: flex-start;
  }

  .side-icon-right {
    display: flex;
    width: 10%;
    justify-content: flex-end;

    .setting-icon {
      margin-left: 10px;
    }
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0;
    font-size: clamp(1.5rem, 3vmin, 2rem);

    .main-title {
      font-weight: bold;
    }

    .sub-title {
      font-size: clamp(0.5rem, 4vmin, 0.75rem);
    }
  }

  .header-icon {
    user-select: none;
    cursor: pointer;

    &:hover {
      fill: var(--dark-mode-header-text);
    }
  }
`;

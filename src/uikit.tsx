import React from "react";
import styled, { css, keyframes } from "styled-components";

export const colors = {
  negative: "#D1495B",
  positive: "#44AF69",
  warning: "#EDAE49",
  base: "#eeeeee",
  background: "#dddddd",
};

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const ErrorWrapper = styled.div`
  color: ${colors.negative};
  font-weight: 500;
`;

const loaderAnimation = keyframes`
  from {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(-15px);
  }

  75% {
    transform: translateY(-10px);
  }

  to {
    transform: translateY(0);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  padding: 23px 12px 8px 12px;

  & > div {
    animation: ${loaderAnimation} 1s linear infinite;

    &:nth-child(2) {
      animation-delay: 0.25s;
    }
    &:nth-child(3) {
      animation-delay: 0.5s;
    }
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${colors.warning};
  border-radius: 999px;
  margin: 3px;
`;

export const Loader = () => (
  <LoaderContainer>
    <Dot />
    <Dot />
    <Dot />
  </LoaderContainer>
);

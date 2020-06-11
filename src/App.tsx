import React from "react";
import { CustomerProfile } from "./CustomerProfile";
import { colors } from "./uikit";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

function App() {
  return (
    <AppWrapper>
      <CustomerProfile customerId={1} />
      <CustomerProfile customerId={100} />
    </AppWrapper>
  );
}

export default App;

import * as React from "react";
import { Transaction } from "./service";
import styled from "styled-components";
import { flexColumn, colors } from "./uikit";

interface Props {
  transaction: Transaction;
}

const Container = styled.div`
  ${flexColumn};
  font-size: 12px;
`;

const Reference = styled.span`
  font-weight: 700;
`;

const Details = styled.div`
  display: flex;
`;

const Amount = styled.span`
  font-weight: 700;
  color: ${colors.warning};
  margin-right: 5px;
`;

export const TransactionView = ({
  transaction: { amount, fromAccount, toAccount, reference },
}: Props) => (
  <Container>
    <Reference>{reference}</Reference>
    <Details>
      <Amount>{amount}$</Amount>
      from {fromAccount} to {toAccount}
    </Details>
  </Container>
);

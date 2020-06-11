import * as React from "react";
import { Transaction } from "./service";
import styled from "styled-components";
import { TransactionView } from "./TransactionView";

interface Props {
  transactions: Transaction[];
}

const Container = styled.ul``;

const ListElement = styled.li``;

export const TransactionsList = ({ transactions }: Props) => (
  <Container>
    {transactions.map((t, index) => (
      <ListElement key={index}>
        <TransactionView transaction={t} />
      </ListElement>
    ))}
  </Container>
);

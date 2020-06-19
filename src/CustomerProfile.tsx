import React from "react";
import {
  getCustomer,
  Customer,
  getAccount,
  getAccountTransactions,
} from "./service";
import styled from "styled-components";
import { ErrorWrapper, Loader, flexColumn, colors } from "./uikit";
import {
  usePromise,
  usePromiseWithArguments,
  isPromiseResolved,
  PromiseResultShape,
  PromiseIdle,
  PromiseResolved,
} from "react-use-promise-matcher";
import { AccountView } from "./AccountView";
import { TransactionsList } from "./TransactionsList";

interface Props {
  customerId: number;
}

const Container = styled.div`
  ${flexColumn};
  padding: 20px;
  align-items: center;
  background-color: ${colors.base};
  box-shadow: 4px 4px 30px -2px rgba(0, 0, 0, 0.4);
  width: 300px;
  height: 500px;
  border-radius: 10px;
  margin: 50px;
`;

export const CustomerContext = React.createContext<
  PromiseResultShape<Customer, string>
>(new PromiseIdle());

const Accounts = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  font-size: 10px;
  margin: 5px;
`;

export const CustomerProfile = ({ customerId }: Props) => {
  return <Container>Implement me!</Container>;
};

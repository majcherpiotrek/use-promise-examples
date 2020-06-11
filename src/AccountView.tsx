import * as React from "react";
import { Account } from "./service";
import styled from "styled-components";
import { colors, flexColumn, ErrorWrapper, Loader } from "./uikit";
import { PromiseResultShape } from "react-use-promise-matcher";

interface Props {
  account: PromiseResultShape<Account, string>;
  accountName: string;
}

const Container = styled.div`
  ${flexColumn}
  align-items: center;
  font-size: 10px;
  width: 100%;
`;

const AccountName = styled.span`
  font-weight: 700;
`;

const AccountBalance = styled.span<{ balance: number }>`
  display: flex;
  & > span {
    font-weight: 700;
    color: ${({ balance }) =>
      balance <= 0 ? colors.negative : colors.positive};
    display: block;
    margin-left: 10px;
  }
`;

export const AccountView = ({ account, accountName }: Props) => (
  <Container>
    <AccountName>{accountName}</AccountName>
    {account.match({
      Loading: () => <Loader />,
      Rejected: (err) => <ErrorWrapper>{err}</ErrorWrapper>,
      Resolved: ({ balance }) => (
        <AccountBalance balance={balance}>
          Balance:<span>{balance}</span>
        </AccountBalance>
      ),
    })}
  </Container>
);

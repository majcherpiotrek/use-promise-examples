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

export const CustomerProfile = ({ customerId: userId }: Props) => {
  const customerLoader = React.useCallback(() => getCustomer(userId), [userId]);
  const [user] = usePromise<Customer>(customerLoader, { autoLoad: true });
  const [selectedAccount, setSelectedAccount] = React.useState(
    user.map((u) => u.checkingAccountId)
  );

  const [checkingAccount, loadCheckingAccount] = usePromiseWithArguments(
    getAccount
  );
  const [savingsAccount, loadSavingsAccount] = usePromiseWithArguments(
    getAccount
  );

  const [transactions, loadTransactions] = usePromiseWithArguments(
    getAccountTransactions
  );

  React.useEffect(() => {
    if (isPromiseResolved(user)) {
      loadCheckingAccount(user.value.checkingAccountId);
      loadSavingsAccount(user.value.savingsAccountId);
      setSelectedAccount(new PromiseResolved(user.value.checkingAccountId));
    }
  }, [loadCheckingAccount, loadSavingsAccount, user]);

  React.useEffect(() => {
    selectedAccount.match({
      Loading: () => {},
      Rejected: () => {},
      Resolved: (id) => loadTransactions(id),
    });
  }, [loadTransactions, selectedAccount]);

  return (
    <CustomerContext.Provider value={user}>
      <Container>
        {user.match({
          Loading: () => <Loader />,
          Rejected: (err) => <ErrorWrapper>{err}</ErrorWrapper>,
          Resolved: (u) => (
            <>
              {u.firstName} {u.lastName}
              <Accounts>
                <AccountView
                  account={checkingAccount}
                  accountName={"Checking account"}
                />

                <AccountView
                  account={savingsAccount}
                  accountName={"Savings account"}
                />
              </Accounts>
            </>
          ),
        })}
        <h4>Transactions</h4>
        <Button
          type={"button"}
          onClick={() =>
            setSelectedAccount(user.map((u) => u.checkingAccountId))
          }
        >
          Show checking account transactions
        </Button>
        <Button
          onClick={() =>
            setSelectedAccount(user.map((u) => u.savingsAccountId))
          }
        >
          Show savings account transactions
        </Button>
        {transactions
          .map((t) => <TransactionsList transactions={t} />)
          .getOr(<Loader />)}
      </Container>
    </CustomerContext.Provider>
  );
};

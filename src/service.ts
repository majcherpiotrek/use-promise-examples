import { Maybe } from "true-myth";

export interface Customer {
  checkingAccountId: number;
  savingsAccountId: number;
  id: number;
  firstName: string;
  lastName: string;
}

export interface Account {
  id: number;
  balance: number;
}

export interface Transaction {
  id: number;
  amount: number;
  reference: string;
  fromAccount: number;
  toAccount: number;
}

const users: Customer[] = [
  {
    firstName: "John",
    id: 1,
    lastName: "Doe",
    checkingAccountId: 1,
    savingsAccountId: 2,
  },
  {
    firstName: "Jenny",
    id: 2,
    lastName: "Johnson",
    checkingAccountId: 3,
    savingsAccountId: 4,
  },
];

const accounts: Account[] = [
  {
    balance: 10000,
    id: 1,
  },
  {
    balance: 900,
    id: 2,
  },
  {
    balance: 5000,
    id: 3,
  },
  {
    balance: 80000,
    id: 4,
  },
];

const transactions: Transaction[] = [
  {
    amount: 100,
    fromAccount: 1,
    id: 1,
    reference: "Transfered to savings",
    toAccount: 2,
  },
  {
    amount: 50,
    fromAccount: 1,
    id: 2,
    reference: "Weekend trip gasoline",
    toAccount: 3,
  },
  {
    amount: 500,
    fromAccount: 4,
    id: 3,
    reference: "Fetched from savings",
    toAccount: 3,
  },
];

const timeout = 1500;
export const getCustomer = (id: number): Promise<Customer> =>
  new Promise<Customer>((resolve, reject) =>
    Maybe.find<Customer>((u) => u.id === id)(users).match({
      Just: (u) => setTimeout(() => resolve(u), timeout),
      Nothing: () =>
        setTimeout(() => reject(`User with id=${id} was not found!`), timeout),
    })
  );

export const getAccount = (id: number): Promise<Account> =>
  new Promise((resolve, reject) =>
    Maybe.find<Account>((a) => a.id === id)(accounts).match({
      Just: (a) => setTimeout(() => resolve(a), timeout),
      Nothing: () =>
        setTimeout(
          () => reject(`Account with id=${id} was not found!`),
          timeout
        ),
    })
  );

export const getAccountTransactions = (id: number): Promise<Transaction[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          transactions.filter((t) => t.fromAccount === id || t.toAccount === id)
        ),
      timeout
    )
  );

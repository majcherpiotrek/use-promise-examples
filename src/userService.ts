import { Maybe } from "true-myth";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

const users: User[] = [
  {
    age: 26,
    firstName: "John",
    id: 1,
    lastName: "Doe",
  },
  {
    age: 33,
    firstName: "Max",
    id: 2,
    lastName: "Muster",
  },
  {
    age: 24,
    firstName: "Jenny",
    id: 3,
    lastName: "Johnson",
  },
];

const timeout = 3000;
export const getUser = (id: number): Promise<User> =>
  new Promise<User>((resolve, reject) =>
    Maybe.find<User>((u) => u.id === id)(users).match({
      Just: (u) => setTimeout(() => resolve(u), timeout),
      Nothing: () =>
        setTimeout(() => reject(`User with id=${id} was not found!`), timeout),
    })
  );

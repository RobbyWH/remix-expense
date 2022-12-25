import type { LoaderArgs } from "@remix-run/node"

const DUMMY_EXPENSES = [{
  id: 'e1',
  title: 'First Expense',
  amount: 12.99,
  date: new Date().toISOString(),
}, {
  id: 'e2',
  title: 'Second Expense',
  amount: 16.99,
  date: new Date().toISOString(),
}];

export async function loader(data: LoaderArgs) {
  return DUMMY_EXPENSES;
};
import { LinksFunction, LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import expensesStyles from "~/styles/expenses.css";
import {FaPlus, FaDownload} from "react-icons/fa"
import { getExpenses } from "~/data/expenses.server";
import { requireUserSession } from "~/data/auth.server";


export async function loader({request}: LoaderArgs) {
  const userId = await requireUserSession(request)
  const expenses = await getExpenses(userId);
  // if(!expenses || expenses.length === 0) {
  //   throw json(
  //     {message: 'Could not find any response'},
  //     {status: 404, statusText: "No expenses found"}
  //   )
  // }
  return expenses;
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: expensesStyles }
  ];
};

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>();
  const hasExpenses = expenses && expenses.length > 0;
  return (
    <>
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            <FaPlus />
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            <FaDownload />
            <span>Load Raw Data</span>
          </a>
        </section>
        {hasExpenses && <ExpensesList expenses={expenses}/>      }
        {!hasExpenses && (
          <section id="no-expenses">
            <h1>No expenses found</h1>
            <p>
              Start <Link to="add">Adding some</Link> today.
            </p>
          </section>
        )}
      </main>
    </>
  );
}

// export function CatchBoundary() {
//   return <p>Error</p>
// }
import { LinksFunction, LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "~/components/expenses/ExpensesList";
import expensesStyles from "~/styles/expenses.css";
import {FaPlus, FaDownload} from "react-icons/fa"
import { getExpenses } from "~/data/expenses.server";


export function loader() {
  return getExpenses();
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: expensesStyles }
  ];
};

export default function ExpensesLayout() {
  const expenses = useLoaderData<typeof loader>();
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
        <ExpensesList expenses={expenses}/>      
      </main>
    </>
 
  );
}
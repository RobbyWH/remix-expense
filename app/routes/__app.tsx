import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import expensesStyles from "~/styles/expenses.css"
import ExpensesHeader from "~/components/navigation/ExpensesHeader";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: expensesStyles }
  ];
};

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}
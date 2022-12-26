import { useNavigate } from "@remix-run/react";
import ExpenseForm from "~/components/expenses/ExpenseForm";
import Modal from "~/components/util/Modal";
import { ActionArgs, redirect } from "@remix-run/node"
import { deleteExpense, updateExpense } from "~/data/expenses.server";
import { validateExpenseInput } from "~/data/validation.server";
// import { getExpense } from "~/data/expenses.server";

// export async function loader({params}: LoaderArgs) {
//   const expenseId = params.id || '';
//   const expense = await getExpense(expenseId)
//   return expense;
// };

export async function action({ params, request }: ActionArgs) {
  const expenseId = params.id || '';
  if (request.method === 'PATCH') {
    const formData = await request.formData();
    const expenseData = Object.fromEntries(formData);
    try {
      validateExpenseInput(expenseData)
    } catch(error){
      console.log("error", error)
      return error
    }
    console.log(expenseData, expenseId)
    await updateExpense(expenseId, expenseData);
    return redirect('/expenses')
  } else if (request.method === 'DELETE') {
    await deleteExpense(expenseId);
    return {deletedId: expenseId}
  }
};

export default function UpdateExpensesPage() {
  const navigate = useNavigate();
  
  function closeHandler() {
    navigate('..')
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  )
}
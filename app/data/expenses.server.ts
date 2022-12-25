import { prisma } from './database.server';

export async function addExpense(expenseData: any) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getExpenses() {
  try {
    const expenses = await prisma.expense.findMany({orderBy: {date: 'desc'}});
    return expenses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function getExpense(id: string) {
  try {
    const expense = prisma.expense.findFirst({where: {id}});
    return expense;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateExpense(id: string, expenseData: any) {
  try {
    await prisma.expense.update({
      where: {id},
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteExpense(id: string) {
  try {
    await prisma.expense.delete({
      where: {id}
    })
  } catch (error) {
    console.log(error);
    throw error;
  }
}
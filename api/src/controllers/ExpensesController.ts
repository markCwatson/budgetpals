import ApiError from '../errors/ApiError';
import ExpensesService, { Expense } from '../services/ExpensesService';
import AuthService from '../services/AuthService';
import { ActionFunction } from '../routes/routeHandler';

class ExpensesController {
  static addExpense: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    const expenseIsAdded = await ExpensesService.addExpenseByUserId(
      account._id,
      req.body as Expense,
    );

    if (!expenseIsAdded) {
      throw new ApiError({
        code: 400,
        message: 'Bad request',
        explanation: 'Unable to add expense',
      });
    }

    res.status(201).json({ message: 'expense added' });
  };

  static getExpenses: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    const expenses = await ExpensesService.getExpensesByUserId(account._id);
    res.status(200).send(expenses);
  };

  static getCategoryNames: ActionFunction = async (req, res, next) => {
    AuthService.getAccountFromLocals(res.locals);

    const categories = await ExpensesService.getCategoryNames();
    res.status(200).send(categories);
  };

  static getFrequencyNames: ActionFunction = async (req, res, next) => {
    AuthService.getAccountFromLocals(res.locals);

    const frequencies = await ExpensesService.getFrequencyNames();
    res.status(200).send(frequencies);
  };

  static deleteExpense: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    const { id } = req.params;
    if (!id) {
      throw new ApiError({
        code: 400,
        message: 'Missing expense id',
        explanation: 'You must provide an expense id to delete',
      });
    }

    const result = await ExpensesService.deleteExpenseById(account._id, id);
    if (!result) {
      throw new ApiError({
        code: 400,
        message: 'Unable to delete expense',
        explanation: 'Something went wrong while deleting the expense',
      });
    }

    // \todo: update running balance

    res.status(200).json({ message: 'expense deleted' });
  };
}

export default ExpensesController;

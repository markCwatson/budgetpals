import ApiError from '../errors/ApiError';
import IncomesService, { Income } from '../services/IncomesService';
import AuthService from '../services/AuthService';
import { ActionFunction } from '../routes/routeHandler';

class IncomesController {
  static addIncome: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    const incomeIsAdded = await IncomesService.addIncomeByUserId(
      account._id,
      req.body as Income,
    );

    if (!incomeIsAdded) {
      throw new ApiError({
        code: 400,
        message: 'Unable to add income',
        explanation: 'Something went wrong while adding the income',
      });
    }

    res.status(201).send({ message: 'Income added' });
  };

  static getIncomes: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    const incomes = await IncomesService.getIncomesByUserId(account._id);
    res.status(200).send(incomes);
  };

  static deleteIncome: ActionFunction = async (req, res, next) => {
    const account = AuthService.getAccountFromLocals(res.locals);

    const { id } = req.params;
    if (!id) {
      throw new ApiError({
        code: 400,
        message: 'Missing income id',
        explanation: 'You must provide an income id to delete',
      });
    }

    const result = await IncomesService.deleteIncomeById(account._id, id);
    if (!result) {
      throw new ApiError({
        code: 400,
        message: 'Unable to delete income',
        explanation: 'Something went wrong while deleting the income',
      });
    }

    // \todo: update running balance

    res.status(200).send({ message: 'Income deleted' });
  };

  static getIncomeCategoryNames: ActionFunction = async (req, res, next) => {
    const categories = await IncomesService.getCategoryNames();
    res.status(200).send(categories);
  };

  static getFrequencyNames: ActionFunction = async (req, res, next) => {
    const frequencies = await IncomesService.getFrequencyNames();
    res.status(200).send(frequencies);
  };
}

export default IncomesController;

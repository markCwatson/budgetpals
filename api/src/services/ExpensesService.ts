import { ObjectId } from 'mongodb';
import ExpensesRepository, {
  ExpensesModel,
} from '../repositories/ExpensesRespository';

export type Expense = ExpensesModel;

class IncomesService {
  static async addExpenseByUserId(
    userId: ObjectId,
    expense: ExpensesModel,
  ): Promise<Boolean> {
    return ExpensesRepository.addExpenseByUserId(userId, expense);
  }

  static async getExpensesByUserId(
    userId: ObjectId,
  ): Promise<ExpensesModel[] | null> {
    return ExpensesRepository.getExpensesByUserId(userId);
  }
}

export default IncomesService;

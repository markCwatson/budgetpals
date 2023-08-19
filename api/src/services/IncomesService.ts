import { ObjectId } from 'mongodb';
import IncomesRepository, {
  IncomesModel,
} from '../repositories/IncomesRepository';
import IncomeCategoryService from './categories/IncomeCategoryService';

export type Income = IncomesModel;

class IncomesService {
  static async addIncomeByUserId(
    userId: ObjectId,
    income: IncomesModel,
  ): Promise<Boolean> {
    return IncomesRepository.addIncomeByUserId(userId, income);
  }

  static async getIncomesByUserId(
    userId: ObjectId,
  ): Promise<IncomesModel[] | null> {
    return IncomesRepository.getIncomesByUserId(userId);
  }

  static async getIncomeCategoryNames(): Promise<string[] | null> {
    const categories = new IncomeCategoryService();
    return categories.getIncomeCategoryNames();
  }

  static async deleteIncomeById(
    userId: ObjectId,
    incomeId: string,
  ): Promise<Boolean> {
    const { userId: user } = await IncomesRepository.getIncomeById(incomeId);
    if (!user) return false;
    if (!user.equals(userId)) return false;
    return IncomesRepository.deleteIncomeById(userId, incomeId);
  }
}

export default IncomesService;

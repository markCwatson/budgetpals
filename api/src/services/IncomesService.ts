import { ObjectId } from 'mongodb';
import IncomesRepository, {
  IncomesModel,
} from '../repositories/IncomesRepository';

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
}

export default IncomesService;

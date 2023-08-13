import IncomesRepository, {
  IncomesModel,
} from '../repositories/IncomesRepository';

import { User } from './UsersService';

class IncomesService {
  private account: User;
  constructor(account: User) {
    this.account = account;
  }

  async addIncome(income: IncomesModel): Promise<Boolean> {
    return IncomesRepository.addIncomeByUserId(this.account._id, income);
  }
}

export default IncomesService;

import { User } from './UsersService';

class IncomesService {
  private account: User;
  constructor(account: User) {
    this.account = account;
  }

  async addIncome(amount, frequency) {
    // \todo use this.account to add income to database
    return {
      id: 123,
      amount,
      frequency,
    };
  }
}

export default IncomesService;

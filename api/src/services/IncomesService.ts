class IncomesService {
  constructor() {}

  async addIncome(amount, frequency) {
    // \todo add income to database
    return {
      id: 123,
      amount,
      frequency,
    };
  }
}

export default IncomesService;

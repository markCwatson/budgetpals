import { ObjectId } from 'mongodb';

import BudgetsRepository, {
  Budget,
  ClientBudget,
  BugetConfiguration,
} from '../repositories/BudgetsRepository';

class BudgetsService {
  static async configureBudgetByUserId(
    userId: ObjectId,
    configuration: BugetConfiguration,
  ): Promise<boolean> {
    const isValidPeriod = await BudgetsService.isValidPeriod(
      configuration.period,
    );
    if (!isValidPeriod) return false;

    // convert dates to Date objects in DB
    const config = BudgetsService.convertDates({
      ...configuration,
      runningBalance: configuration.startAccountBalance,
    });

    return BudgetsRepository.configureBudgetByUserId(userId, config);
  }

  static async modifyRunningAccountBalance(
    userId: ObjectId,
    type: 'income' | 'expense',
    amount: number,
  ): Promise<boolean> {
    if (type === 'expense') {
      return BudgetsRepository.modifyRunningAccountBalance(userId, -amount);
    }
    return BudgetsRepository.modifyRunningAccountBalance(userId, amount);
  }

  static async getAllBudgets(): Promise<Budget[]> {
    return BudgetsRepository.getAllBudgets();
  }

  static async getMyBudgetByUserId(
    userId: ObjectId,
  ): Promise<ClientBudget | null> {
    return BudgetsRepository.getBudgetByUserId(userId);
  }

  private static isValidPeriod(period: String): Promise<boolean> {
    return BudgetsRepository.isValidPeriod(period);
  }

  private static convertDates(
    configuration: BugetConfiguration,
  ): BugetConfiguration {
    let config = {
      ...configuration,
      startDate: new Date(configuration.startDate),
    };

    return config;
  }

  static async getBudgetPeriods(): Promise<String[]> {
    return BudgetsRepository.getBudgetPeriods();
  }
}

export default BudgetsService;

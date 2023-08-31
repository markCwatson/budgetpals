import { Double, ObjectId } from 'mongodb';
import ApiError from '../errors/ApiError';
import Database from './Database';
import { Income } from '../services/IncomesService';
import { Expense } from '../services/ExpensesService';

// Model for Budget as it appears in database
export interface Budget {
  userId: ObjectId;
  config: BugetConfiguration;
  runningBalance: number;
}

// Modle for budget as it is returned to the client
export interface ClientBudget {
  userId: ObjectId;
  config: BugetConfiguration;
  runningBalance: number;
  incomes: Income[];
  expenses: Expense[];
  plannedIncomes: Income[];
  plannedExpenses: Expense[];
}

export interface BugetConfiguration {
  startDate: Date;
  period: String;
  startAccountBalance: number;
  runningBalance?: number;
}

class BudgetsRepository {
  static async configureBudgetByUserId(
    userId: ObjectId,
    configuration: BugetConfiguration,
  ): Promise<boolean> {
    const config = {
      ...configuration,
      startAccountBalance: new Double(configuration.startAccountBalance),
    };
    const mongo = await Database.getInstance();
    try {
      // todo: consider not allowing configuration setting if budget already exists
      await mongo.db.collection<Budget>('budgets').findOneAndUpdate(
        {
          userId,
        },
        {
          $set: {
            configuration: config,
          },
        },
        {
          upsert: true,
        },
      );
      return true;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async modifyRunningAccountBalance(
    userId: ObjectId,
    amount: number,
  ): Promise<boolean> {
    const mongo = await Database.getInstance();
    try {
      await mongo.db.collection<Budget>('budgets').findOneAndUpdate(
        {
          userId,
        },
        {
          $inc: {
            'configuration.runningBalance': amount,
          },
        },
      );
      return true;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getAllBudgets(): Promise<Budget[]> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db.collection<Budget>('budgets').find();
      return result.toArray();
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async getBudgetByUserId(
    userId: ObjectId,
  ): Promise<ClientBudget | null> {
    const pipeline = [
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: 'incomes',
          localField: 'userId',
          foreignField: 'userId',
          as: 'incomes',
        },
      },
      {
        $lookup: {
          from: 'expenses',
          localField: 'userId',
          foreignField: 'userId',
          as: 'expenses',
        },
      },
      {
        $addFields: {
          plannedIncomes: {
            $map: {
              input: {
                $filter: {
                  input: '$incomes',
                  as: 'income',
                  cond: { $eq: ['$$income.isPlanned', true] },
                },
              },
              as: 'income',
              in: {
                amount: '$$income.amount',
                date: '$$income.date',
                category: '$$income.category',
                frequency: '$$income.frequency',
                isEnding: '$$income.isEnding',
                isFixed: '$$income.isFixed',
              },
            },
          },
          unplannedIncomes: {
            $map: {
              input: {
                $filter: {
                  input: '$incomes',
                  as: 'income',
                  cond: { $eq: ['$$income.isPlanned', false] },
                },
              },
              as: 'income',
              in: {
                amount: '$$income.amount',
                date: '$$income.date',
                category: '$$income.category',
              },
            },
          },
          plannedExpenses: {
            $map: {
              input: {
                $filter: {
                  input: '$expenses',
                  as: 'expense',
                  cond: { $eq: ['$$expense.isPlanned', true] },
                },
              },
              as: 'expense',
              in: {
                amount: '$$expense.amount',
                date: '$$expense.date',
                category: '$$expense.category',
                frequency: '$$expense.frequency',
                isEnding: '$$expense.isEnding',
                isFixed: '$$expense.isFixed',
              },
            },
          },
          unplannedExpenses: {
            $map: {
              input: {
                $filter: {
                  input: '$expenses',
                  as: 'expense',
                  cond: { $eq: ['$$expense.isPlanned', false] },
                },
              },
              as: 'expense',
              in: {
                amount: '$$expense.amount',
                date: '$$expense.date',
                category: '$$expense.category',
              },
            },
          },
        },
      },
      {
        $project: {
          incomes: 0,
          expenses: 0,
        },
      },
    ];

    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db
        .collection<ClientBudget>('budgets')
        .aggregate(pipeline);

      const doc = await result.next();
      if (doc._id === null) return null;

      return doc as ClientBudget;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }

  static async isValidPeriod(period: String): Promise<boolean> {
    const mongo = await Database.getInstance();
    try {
      const result = await mongo.db
        .collection('budget-periods')
        .findOne({ name: period });
      return !!result;
    } catch (error) {
      throw new ApiError({
        code: 500,
        message: error.message,
      });
    }
  }
}

export default BudgetsRepository;

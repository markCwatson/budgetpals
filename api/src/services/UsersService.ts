import { ObjectId } from 'mongodb';

import UsersRepository, { UserModel } from '../repositories/UsersRepository';
import AuthService from './AuthService';
import IncomesService, { Income } from './IncomesService';
import ExpensesService, { Expense } from './ExpensesService';
import ApiError from '../errors/ApiError';

interface CreateUserInput {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export type User = UserModel;

class UsersService {
  static async create(body: CreateUserInput): Promise<any> {
    const { password, email, firstName, lastName } = body;
    const hashedPassword = await AuthService.geHashedPassword(password);
    return UsersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  static async addIncomeByUserId(
    userId: ObjectId,
    income: Income,
  ): Promise<Boolean> {
    return IncomesService.addIncomeByUserId(userId, income);
  }

  static async addExpenseByUserId(
    userId: ObjectId,
    income: Expense,
  ): Promise<Boolean> {
    return ExpensesService.addExpenseByUserId(userId, income);
  }

  static async selectByEmail(email: string): Promise<User | null> {
    return UsersRepository.selectByEmail(email);
  }

  static async selectById(id: ObjectId): Promise<User | null> {
    return UsersRepository.selectById(id);
  }

  static async getExpensesByUserId(userId: ObjectId): Promise<Expense[]> {
    return ExpensesService.getExpensesByUserId(userId);
  }

  static async getIncomesByUserId(userId: ObjectId): Promise<Income[]> {
    return IncomesService.getIncomesByUserId(userId);
  }
}

export default UsersService;

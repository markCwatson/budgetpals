import Categories from '.';
import CONSTANSTS from '../../settings/constants';

export default class ExpenseCategoryService extends Categories {
  constructor() {
    super(CONSTANSTS.CATEGORY_TYPES.EXPENSE);
  }

  async getExpenseCategoryNames(): Promise<string[] | null> {
    return super.getCategoryNames();
  }
}

import Categories from '.';
import CONSTANSTS from '../../settings/constants';

export default class IncomeCategoryService extends Categories {
  constructor() {
    super(CONSTANSTS.CATEGORY_TYPES.INCOME);
  }

  async getIncomeCategoryNames(): Promise<string[] | null> {
    return super.getCategoryNames();
  }
}

import Categories from '.';
import CONSTANSTS from '../../settings/constants';

export default class ExpenseCategoryService extends Categories {
  constructor() {
    super(CONSTANSTS.CATEGORY_TYPES.EXPENSE);
  }

  // calls methods on super with type set to expense
}

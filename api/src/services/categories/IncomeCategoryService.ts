import Categories from '.';
import CONSTANSTS from '../../settings/constants';

export default class IncomeCategoryService extends Categories {
  constructor() {
    super(CONSTANSTS.CATEGORY_TYPES.INCOME);
  }

  // calls methods on super with type set to income
}

import CategoriesRepository from '../../repositories/CategoriesRespoitory';
import CONSTANTS from '../../settings/constants';

class Categories {
  private type: string;
  constructor(type: string) {
    if (!CONSTANTS.CATEGORY_TYPES.VALID_TYPES.includes(type)) {
      throw new Error('Invalid category type');
    }
    this.type = type;
  }

  async getCategoryNames(): Promise<string[] | null> {
    return CategoriesRepository.getCategoryNames(this.type);
  }
}

export default Categories;

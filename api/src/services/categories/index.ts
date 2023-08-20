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

  async isValidCategory(category: string): Promise<boolean> {
    return CategoriesRepository.isValidCategory(this.type, category);
  }
}

export default Categories;

import FrequenciesRespoitory from '../repositories/FrequenciesRespoitory';

class FrequencyService {
  static async getFrequencyNames(): Promise<string[] | null> {
    return FrequenciesRespoitory.getFrequencyNames();
  }

  static async isValidFrequency(frequency: string): Promise<boolean> {
    return FrequenciesRespoitory.isValidFrequency(frequency);
  }
}

export default FrequencyService;

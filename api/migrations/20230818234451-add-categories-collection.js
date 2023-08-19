const EXPENSE_CATEGORIES = [
  {
    name: 'Housing',
    description: 'Rent, mortgage, utilities, etc.',
  },
  {
    name: 'Transportation',
    description: 'Car payments, gas, insurance, etc.',
  },
  {
    name: 'Food',
    description: 'Groceries, restaurants, etc.',
  },
  {
    name: 'Shopping',
    description: 'Clothing, electronics, etc.',
  },
  {
    name: 'Entertainment',
    description: 'Movies, concerts, etc.',
  },
  {
    name: 'Health',
    description: 'Gym, doctor, protein shakes, etc.',
  },
  {
    name: 'Travel',
    description: 'Flights, hotels, etc.',
  },
  {
    name: 'Education',
    description: 'Books, tuition, etc.',
  },
  {
    name: 'Gifts',
    description: 'Birthdays, holidays, etc.',
  },
  {
    name: 'Investments',
    description: 'Stocks, crypto, etc.',
  },
  {
    name: 'Kids',
    description: 'Daycare, toys, etc.',
  },
  {
    name: 'Pets',
    description: 'Food, vet, etc.',
  },
  {
    name: 'Cell Phone(s)',
    description: 'Cell phone bill(s)',
  },
  {
    name: 'Internet',
    description: 'Internet bill',
  },
  {
    name: 'Cable',
    description: 'Cable bill',
  },
  {
    name: 'Streaming',
    description: 'Netflix, Hulu, etc.',
  },
  {
    name: 'Subscriptions',
    description: 'Magazines, etc.',
  },
  {
    name: 'Insurance',
    description: 'Car, health, etc.',
  },
  {
    name: 'Student Loans',
    description: 'Student loan payments',
  },
  {
    name: 'Credit Card',
    description: 'Credit card payments',
  },
  {
    name: 'Other',
    description: 'Miscellaneous',
  },
];

module.exports = {
  async up(db, client) {
    await db.createCollection('expense-categories');
    await db.collection('expense-categories').createIndex({ name: 1 }, { unique: true });
    await db.collection('expense-categories').insertMany(EXPENSE_CATEGORIES);
  },

  async down(db, client) {
    await db.dropCollection('expense-categories');
  }
};

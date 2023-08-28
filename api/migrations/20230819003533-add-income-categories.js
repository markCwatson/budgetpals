const INCOME_CATEGORIES = [
  {
    name: 'Paycheck',
    description: 'Wages, salaries, bonuses, etc.',
  },
  {
    name: 'Dividend',
    description: 'Income from shares and investments.',
  },
  {
    name: 'Tax Return',
    description: 'Refunds on overpaid taxes.',
  },
  {
    name: 'Child Tax Benefit',
    description: 'Government support for families with children.',
  },
  {
    name: 'Gift',
    description: 'Received gifts in the form of money or assets.',
  },
  {
    name: 'Rental Income',
    description: 'Income from renting property.',
  },
  {
    name: 'Pension',
    description: 'Retirement benefits and pensions.',
  },
  {
    name: 'Social Security',
    description: 'Government support for elderly, disabled, etc.',
  },
  {
    name: 'Freelancing',
    description: 'Income from freelance work or consulting.',
  },
  {
    name: 'Business Profits',
    description: 'Earnings from owning a business or partnership.',
  },
  {
    name: 'Investment Gains',
    description: 'Profits from investments like stocks, bonds, etc.',
  },
  {
    name: 'Royalties',
    description: 'Earnings from intellectual properties.',
  },
  {
    name: 'Annuities',
    description: 'Payments from annuity contracts.',
  },
  {
    name: 'Scholarship',
    description: 'Educational support, not typically considered taxable.',
  },
  {
    name: 'Alimony',
    description: 'Payments to an ex-spouse under a divorce decree.',
  },
  {
    name: 'Interest Income',
    description: 'Earnings from interest on savings or investments.',
  },
  {
    name: 'Unemployment Benefits',
    description: 'Support during periods of unemployment.',
  },
  {
    name: 'Trust Income',
    description: 'Income from trusts.',
  },
  {
    name: 'Other',
    description: 'Miscellaneous income sources.',
  },
];


module.exports = {
  async up(db, client) {
    await db.createCollection('income-categories');
    await db.collection('income-categories').createIndex({ name: 1 }, { unique: true });
    await db.collection('income-categories').insertMany(INCOME_CATEGORIES);
  },

  async down(db, client) {
    await db.dropCollection('income-categories');
  }
};

const PERIODS = [
  {
    name: 'Weekly',
    description: 'Budget by the week.',
  },
  {
    name: 'Bi-weekly',
    description: 'Budget for every two weeks.',
  },
  {
    name: 'Monthly',
    description: 'Budget by the month.',
  },
  {
    name: 'Yearly',
    description: 'Budget by the year.',
  },
];

module.exports = {
  async up(db, client) {
    await db.createCollection('budget-periods');
    await db.collection('budget-periods').createIndex({ name: 1 }, { unique: true });
    await db.collection('budget-periods').insertMany(PERIODS);
  },

  async down(db, client) {
    await db.dropCollection('budget-periods');
  }
};

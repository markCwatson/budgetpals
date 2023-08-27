const FREQUENCIES = [
  {
    name: 'Once',
    description: 'Just this one time.',
  },
  {
    name: 'Daily',
    description: 'Occurs every day.',
  },
  {
    name: 'Weekly',
    description: 'Occurs every week.',
  },
  {
    name: 'Bi-weekly',
    description: 'Occurs every two weeks.',
  },
  {
    name: 'Monthly',
    description: 'Occurs every month.',
  },
  {
    name: 'Quarterly',
    description: 'Occurs every three months.',
  },
  {
    name: 'Annually',
    description: 'Occurs every year.',
  },
];

module.exports = {
  async up(db, client) {
    await db.createCollection('frequencies');
    await db.collection('frequencies').createIndex({ name: 1 }, { unique: true });
    await db.collection('frequencies').insertMany(FREQUENCIES);
  },

  async down(db, client) {
    await db.dropCollection('frequencies');
  }
};

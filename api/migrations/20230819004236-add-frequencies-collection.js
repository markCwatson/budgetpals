const FREQUENCIES = [
  {
    name: 'daily',
    description: 'Occurs every day.',
  },
  {
    name: 'weekly',
    description: 'Occurs every week.',
  },
  {
    name: 'bi-weekly',
    description: 'Occurs every two weeks.',
  },
  {
    name: 'monthly',
    description: 'Occurs every month.',
  },
  {
    name: 'quarterly',
    description: 'Occurs every three months.',
  },
  {
    name: 'annually',
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

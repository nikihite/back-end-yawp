const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  style;
  rating;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.style = row.style;
    this.rating = row.rating;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
          SELECT * FROM users;
          `
    ); return rows.map((row) => new Restaurant(row));
  }
};

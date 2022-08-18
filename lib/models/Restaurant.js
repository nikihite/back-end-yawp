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

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT * from restaurants WHERE id = $1
      `, [id]
    ); if (rows.length === 0) {
      return null;
    } return new Restaurant(rows[0]);
  }

  async getRestReviews() {
    const { rows } = await pool.query(
      `
      SELECT reviews.* from reviews
      WHERE reviews.restaurant_id = $1
      `, [this.id]
    );
    return rows;
  }
};

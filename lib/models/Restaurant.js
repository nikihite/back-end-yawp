const pool = require('../utils/pool');

module.exports = class Restaurant {
  id;
  name;
  style;
  rating;
  details;
  restaurant_id;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.style = row.style;
    this.rating = row.rating;
    this.details = row.details;
    this.restaurant_id = row.restaurant_id;
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

  static async insert({ rating, details, restaurant_id }) {
    const { rows } = await pool.query(
      `
    INSERT INTO reviews (rating, details, restaurant_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `, [rating, details, restaurant_id]
    ); return new Restaurant(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE from reviews
      WHERE id = $1
      RETURNING *
      `, [id]
    ); return new Restaurant(rows[0]);
  }
};

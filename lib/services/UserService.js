const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, firstName, lastName, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      firstName,
      lastName,
      passwordHash,
    });
    return user;
  }
};

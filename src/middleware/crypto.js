const bcrypt = require('bcryptjs');

export const hashPassword = (pw, cb) =>
  bcrypt.hash(pw, 10, (err, hash) =>
    cb(err, hash))

export const comparePassword = (password, dbPassword, cb) =>
  bcrypt.compare(password, dbPassword, (err, match) =>
    cb(err, match))

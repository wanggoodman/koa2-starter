// @flow
import bcrypt from 'bcryptjs';

export const hashPassword = (pw: string, cb) =>
  bcrypt.hash(pw, 10, (err, hash) =>
    cb(err, hash))

export const comparePassword = (password: string, dbPassword: string, cb) =>
  bcrypt.compare(password, dbPassword, (err, match) =>
    cb(err, match))

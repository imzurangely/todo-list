const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const ApiError = require("../../utils/ApiError");
const userModel = require("./user.model");

const SALT_ROUNDS = 10;

const signToken = (user) =>
  jwt.sign({ sub: user.id, email: user.email }, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  });

const register = async ({ name, email, password }) => {
  const existing = await userModel.findByEmail(email);
  if (existing) throw ApiError.conflict("Ya existe una cuenta con ese correo");

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userModel.create({ name, email, passwordHash });
  return { user, token: signToken(user) };
};

const login = async ({ email, password }) => {
  const record = await userModel.findByEmail(email);
  if (!record) throw ApiError.unauthorized("Correo o contrasena incorrectos");

  const matches = await bcrypt.compare(password, record.password_hash);
  if (!matches) throw ApiError.unauthorized("Correo o contrasena incorrectos");

  const { password_hash: _omit, ...user } = record;
  return { user, token: signToken(user) };
};

const getProfile = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw ApiError.notFound("Usuario no encontrado");
  return user;
};

module.exports = { register, login, getProfile };

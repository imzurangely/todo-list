import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import ApiError from "../../utils/ApiError.js";
import userModel from "./user.model.js";

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

export default { register, login, getProfile };

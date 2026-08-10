const asyncHandler = require("../../utils/asyncHandler");
const { success } = require("../../utils/response");
const authService = require("./auth.service");

const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  return success(res, { data, status: 201, message: "Cuenta creada correctamente" });
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  return success(res, { data, message: "Sesion iniciada correctamente" });
});

const me = asyncHandler(async (req, res) => {
  const data = await authService.getProfile(req.user.id);
  return success(res, { data, message: "Perfil obtenido correctamente" });
});

module.exports = { register, login, me };

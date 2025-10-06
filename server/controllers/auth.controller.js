import Joi from "joi";
import { ok, created } from "../utils/apiResponse.js";
import * as authService from "../services/auth.service.js";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const register = async (req, res, next) => {
  try {
    const { email, password } = await registerSchema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const out = await authService.register({ email, password });
    return created(res, out, "Utilisateur créé");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const out = await authService.login({ email, password });
    return ok(res, out, "Connecté");
  } catch (err) {
    next(err);
  }
};

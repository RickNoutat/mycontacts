import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { signToken } from "./token.service.js";
import { StatusCodes } from "http-status-codes";

export const register = async ({ email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const err = new Error("Email déjà utilisé");
    err.status = StatusCodes.CONFLICT;
    throw err;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  const token = signToken({ sub: user._id.toString(), email: user.email });
  return {
    token,
    user: { _id: user._id, email: user.email, createdAt: user.createdAt },
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Identifiants invalides");
    err.status = StatusCodes.UNAUTHORIZED;
    throw err;
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error("Identifiants invalides");
    err.status = StatusCodes.UNAUTHORIZED;
    throw err;
  }
  const token = signToken({ sub: user._id.toString(), email: user.email });
  return {
    token,
    user: { _id: user._id, email: user.email, createdAt: user.createdAt },
  };
};

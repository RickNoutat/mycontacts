import Joi from "joi";
import { ok, created } from "../utils/apiResponse.js";
import * as contactService from "../services/contact.service.js";

const createSchema = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
  phone: Joi.string().min(10).max(20).required(),
});

const updateSchema = Joi.object({
  firstName: Joi.string().min(1),
  lastName: Joi.string().min(1),
  phone: Joi.string().min(10).max(20),
}).min(1);

export const list = async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    const data = await contactService.listByOwner(req.user.id, {
      q: q || undefined,
    });
    return ok(res, data, "Mes contacts");
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const payload = await createSchema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const doc = await contactService.create(req.user.id, payload);
    return created(res, doc, "Contact créé");
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const patch = await updateSchema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    const doc = await contactService.update(req.user.id, req.params.id, patch);
    return ok(res, doc, "Contact mis à jour");
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const out = await contactService.remove(req.user.id, req.params.id);
    return ok(res, out, "Contact supprimé");
  } catch (err) {
    next(err);
  }
};

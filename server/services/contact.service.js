import Contact from "../models/contact.model.js";
import { StatusCodes } from "http-status-codes";

export const listByOwner = async (ownerId, { q } = {}) => {
  const filter = { owner: ownerId };
  if (q) {
    const regex = new RegExp(q, "i");
    filter.$or = [{ firstName: regex }, { lastName: regex }, { phone: regex }];
  }
  return Contact.find(filter).sort({ createdAt: -1 }).lean();
};

export const create = async (ownerId, data) => {
  return Contact.create({ ...data, owner: ownerId });
};

export const update = async (ownerId, id, patch) => {
  const doc = await Contact.findOneAndUpdate(
    { _id: id, owner: ownerId },
    { $set: patch },
    { new: true }
  );
  if (!doc) {
    const err = new Error("Contact introuvable");
    err.status = StatusCodes.NOT_FOUND;
    throw err;
  }
  return doc;
};

export const remove = async (ownerId, id) => {
  const doc = await Contact.findOneAndDelete({ _id: id, owner: ownerId });
  if (!doc) {
    const err = new Error("Contact introuvable");
    err.status = StatusCodes.NOT_FOUND;
    throw err;
  }
  return { deletedId: id };
};

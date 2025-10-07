// server/test/setup.js
import { jest } from "@jest/globals"; // <<--- AJOUT
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import path from "node:path";
import { fileURLToPath } from "node:url";

jest.setTimeout(120_000); // 2 min pour laisser le temps de télécharger Mongo la 1ère fois

let mongo;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.JWT_SECRET = "test-secret";
  process.env.JWT_EXPIRES_IN = "1h";

  // Met le cache binaire Mongo DANS le repo pour éviter OneDrive/AV
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const downloadDir = path.resolve(__dirname, "../.mongodb-binaries");

  mongo = await MongoMemoryServer.create({
    downloadDir,
    binary: { version: "7.0.14" },
  });

  const uri = mongo.getUri();
  process.env.MONGO_URI = uri;

  await mongoose.connect(uri, { dbName: "test" });
});

afterAll(async () => {
  if (mongoose.connection.readyState) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
  if (mongo) {
    await mongo.stop();
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

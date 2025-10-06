import request from "supertest";
import app from "../app.js";

const email = "ricky@example.com";
const password = "password123";

describe("Auth", () => {
  test("POST /api/auth/register -> 201 + token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data?.token).toBeDefined();
    expect(res.body.data?.user?.email).toBe(email);
  });

  test("POST /api/auth/register (duplicate) -> 409", async () => {
    await request(app).post("/api/auth/register").send({ email, password });
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password })
      .expect(409);

    expect(res.body.success).toBe(false);
  });

  test("POST /api/auth/login (ok) -> 200 + token", async () => {
    await request(app).post("/api/auth/register").send({ email, password });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password })
      .expect(200);

    expect(res.body.data?.token).toBeDefined();
  });

  test("POST /api/auth/login (wrong pass) -> 401", async () => {
    await request(app).post("/api/auth/register").send({ email, password });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "badpass" })
      .expect(401);

    expect(res.body.success).toBe(false);
  });

  test("Auth guard (missing token) -> 401", async () => {
    const res = await request(app).get("/api/contacts").expect(401);
    expect(res.body.message).toMatch(/Token/);
  });
});

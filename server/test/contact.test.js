import request from "supertest";
import app from "../app.js";

const makeUserAndToken = async (email = "u1@example.com") => {
  await request(app)
    .post("/api/auth/register")
    .send({ email, password: "pass12345" });
  const login = await request(app)
    .post("/api/auth/login")
    .send({ email, password: "pass12345" });
  return login.body.data.token;
};

const authHeader = (token) => ({ Authorization: `Bearer ${token}` });

describe("Contacts", () => {
  test("GET /api/contacts requires JWT -> 401", async () => {
    await request(app).get("/api/contacts").expect(401);
  });

  test("CRUD happy path", async () => {
    const token = await makeUserAndToken();

    // Create
    const created = await request(app)
      .post("/api/contacts")
      .set(authHeader(token))
      .send({ firstName: "Ada", lastName: "Lovelace", phone: "0611223344" })
      .expect(201);

    const id = created.body.data._id;
    expect(id).toBeDefined();

    // List (should include)
    const list = await request(app)
      .get("/api/contacts")
      .set(authHeader(token))
      .expect(200);
    expect(Array.isArray(list.body.data)).toBe(true);
    expect(list.body.data.some((c) => c._id === id)).toBe(true);

    // Update (partial)
    const updated = await request(app)
      .patch(`/api/contacts/${id}`)
      .set(authHeader(token))
      .send({ phone: "0699887766" })
      .expect(200);

    expect(updated.body.data.phone).toBe("0699887766");

    // Delete
    await request(app)
      .delete(`/api/contacts/${id}`)
      .set(authHeader(token))
      .expect(200);

    // Ensure gone
    const list2 = await request(app)
      .get("/api/contacts")
      .set(authHeader(token))
      .expect(200);
    expect(list2.body.data.some((c) => c._id === id)).toBe(false);
  });

  test("Ownership enforced (user2 ne peut pas modifier ceux de user1)", async () => {
    const t1 = await makeUserAndToken("owner@example.com");
    const t2 = await makeUserAndToken("intruder@example.com");

    const created = await request(app)
      .post("/api/contacts")
      .set(authHeader(t1))
      .send({ firstName: "Grace", lastName: "Hopper", phone: "0612345678" })
      .expect(201);

    const id = created.body.data._id;

    // user2 tente de patch -> 404 (non trouvé pour CE owner)
    await request(app)
      .patch(`/api/contacts/${id}`)
      .set(authHeader(t2))
      .send({ phone: "0611111111" })
      .expect(404);
  });

  test("Validation phone (min 10, max 20) -> 400", async () => {
    const token = await makeUserAndToken();
    await request(app)
      .post("/api/contacts")
      .set(authHeader(token))
      .send({ firstName: "X", lastName: "Y", phone: "123" })
      .expect(400);
  });
});

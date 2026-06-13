const request = require("supertest");
const app = require("../index");

describe("Health endpoint", () => {
  it("GET /health should return status OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});

describe("Files API", () => {
  it("GET /api/files should return empty list initially", async () => {
    const res = await request(app).get("/api/files");
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeDefined();
  });

  it("POST /api/files should create a new file", async () => {
    const res = await request(app)
      .post("/api/files")
      .send({ fileName: "test.pdf", fileType: "pdf", size: 1000 });

    expect(res.statusCode).toBe(201);
    expect(res.body.fileName).toBe("test.pdf");
  });

  it("POST /api/files without fileName should fail", async () => {
    const res = await request(app)
      .post("/api/files")
      .send({ fileType: "pdf" });

    expect(res.statusCode).toBe(400);
  });
});
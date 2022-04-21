const supertest = require("supertest");
const { listAllEmployees } = require("../controllers/employeeController");
const app = require("../app");
const db = require("../config/dbconnect");
const employee = require("../model/employeemodel");
const crypto = require("crypto");

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}

beforeAll(async () => {
  await db();
});

beforeAll(async () => {
  process.env.NoDE_ENV = "test";
  await employee.remove();
  await delay();
});

afterAll(async () => {
  await employee.remove();
});

describe("backend testing", () => {
  const user = {
    EmployeeId: crypto.randomUUID().toString(),
    EmployeeName: "praveen gautam",
    password: "12345",
  };

  const user1 = {
    EmployeeId: crypto.randomUUID().toString(),
    EmployeeName: "praveen gautam",
    password: "12345",
  };

  test("testing inital db documents", async () => {
    const data = await employee.find();
    const data1 = await supertest(app).get("/api/v1/listall");

    expect(data.length).toBe(data1.body.Employee.length);
  });

  test("register a employee", async () => {
    const data = await supertest(app).post("/api/v1/register").send(user);
    expect(data?.body?.success).toBe(true);
  });

  test("don't register the already registered employee", async () => {
    const data = await supertest(app).post("/api/v1/register").send(user);
    expect(data?.body?.success).toBe(false);
  });

  test("login a employee", async () => {
    const data = await supertest(app).post("/api/v1/login").send(user);
    expect(data.body.success).toBe(true);
    expect(data.body.user.EmployeeId).toBe(user.EmployeeId);
    expect(data.body.user.Login).toBe(true);
  });

  test("get detail of a particular employee", async () => {
    const data_user1 = await supertest(app)
      .post("/api/v1/register")
      .send(user1);

    const data_user = await supertest(app).get(
      `/api/v1/show/${user1.EmployeeId}`
    );
    expect(data_user.body.Employee[0].EmployeeId).toBe(user1.EmployeeId);
  });

  test("change status of an employee", async () => {
    const data_user = await supertest(app).get(
      `/api/v1/show/${user.EmployeeId}`
    );
    const data = await supertest(app).put(
      `/api/v1/changeActive/${data_user.body.Employee[0]._id}/edit`
    );
    expect(data.body.success).toBe(true);
    expect(data.statusCode).toBe(200);
  });

  test("delete a employee", async () => {
    const data_user = await supertest(app).get(
      `/api/v1/show/${user.EmployeeId}`
    );
    const data_user1 = await supertest(app).get(
      `/api/v1/show/${user1.EmployeeId}`
    );

    await supertest(app).delete(
      `/api/v1/delete/${data_user.body.Employee[0]._id}`
    );
    await supertest(app).delete(
      `/api/v1/delete/${data_user1.body.Employee[0]._id}`
    );
    const data = await employee.find();
    const data1 = await supertest(app).get("/api/v1/listall");

    expect(data.length).toBe(data1.body.Employee.length);
  });
});

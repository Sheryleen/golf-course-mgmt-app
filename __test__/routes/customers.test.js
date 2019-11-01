const request = require("supertest");
const { app } = require("../../server");
const knex = require("../../db/knex");
const Customer = require("../../models/Customer");

describe("customers entity routes", () => {
  beforeEach(done => {
    return knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        knex.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe("get all customers", () => {
    it("should fetch all customers successfully", async () => {
      const res = await request(app).get("/customers");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(300);
    });
  });
  describe("get one customer", () => {
    it("should fetch one customer successfully", async () => {
      const id = 2;
      const res = await request(app).get(`/customers/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("created_at");
      expect(res.body).toHaveProperty("updated_at");
    });
  });

  describe("add one customer", () => {
    it("should add one customer successfully", async () => {
      const newCustomer = {
        name: "name",
        company: "company",
        phone: "phone",
        address: "address",
        email: "email"
      };
      const res = await request(app)
        .post("/customers")
        .send(newCustomer);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("created_at");
      expect(res.body).toHaveProperty("updated_at");
    });
  });

  describe("update one customer", () => {
    it("should update one customer successfully", async () => {
      // Setup
      const id = 10;
      const updatedCustomer = {
        name: "name",
        company: "company",
        phone: "phone",
        address: "address"
      };

      // Do the work
      const res = await request(app)
        .patch(`/customers/${id}`)
        .send(updatedCustomer);

      // Test the response
      expect(res.status).toEqual(200);
      expect(res.body.name).toEqual("name");

      // Test the database
      const customers = await Customer.query().findById(id);
      expect(customers.name).toEqual("name");
    });
  });

  describe("remove one customer", () => {
    it("should remove one customer successfully", async () => {
      const id = 1;
      const res = await request(app).delete(`/customers/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);

      const customers = await knex("customers");
      expect(customers[0].id).toEqual(2);
    });
  });
});

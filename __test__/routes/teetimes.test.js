const request = require("supertest");
const { app } = require("../../server");
const knex = require("../../db/knex");
const TeeTime = require("../../models/TeeTime");

describe("tee_times entity routes", () => {
  beforeEach(done => {
    return knex.migrate.rollback().then(() => {
      knex.migrate.latest().then(() => {
        knex.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe("get all tee_times", () => {
    it("should fetch all tee_times successfully", async () => {
      const res = await request(app).get("/tee_times");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveLength(500);
    });
  });
  describe("get one tee_time", () => {
    it("should fetch one tee_time successfully", async () => {
      const id = 2;
      const res = await request(app).get(`/tee_times/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("time");
    });
  });

  // describe("add one tee_time", () => {
  //   it("should add one tee_time successfully", async () => {
  //     const newTeeTime = {
  //       name: "name",
  //       company: "company",
  //       phone: "phone",
  //       address: "address",
  //       email: "email"
  //     };
  //     const res = await request(app)
  //       .post("/tee_times")
  //       .send(newTeeTime);

  //     expect(res.status).toEqual(200);
  //     expect(res.body).toHaveProperty("id");
  //     expect(res.body).toHaveProperty("created_at");
  //     expect(res.body).toHaveProperty("updated_at");
  //   });
  // });

  describe('add one teetime', () => {
    it('should add one teetime successfully', async () => {
      const theTime = new Date()
      const newTeetime = {
        "time": theTime
      }
      const res = await request(app)
        .post('/tee_times')
        .send(newTeetime)

      // Test the responst
      expect(res.status).toEqual(200)
      expect(res.body).toHaveProperty('id')

      // Test the database
      const theTeeTime = await TeeTime.query().findById(501)
      expect(theTeeTime.time.toISOString()).toEqual(theTime.toISOString())
    })
  })

  describe("remove one tee_time", () => {
    it("should remove one tee_time successfully", async () => {
      const id = 1;
      const res = await request(app).delete(`/tee_times/${id}`);

      expect(res.status).toEqual(200);
      expect(res.body.id).toEqual(1);

      const tee_times = await knex("tee_times");
      expect(tee_times[0].id).toEqual(2);
    });
  });
});

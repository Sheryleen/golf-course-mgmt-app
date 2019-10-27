const { Model } = require("objection");

//static only used on constructor itself only
//methods within this class - objection needs access to all methods
class TeeTime extends Model {
  static get tableName() {
    return "tee_times";
  }
  static get relationMappings() {
    const Customer = require("./Customer");
    return {
      customers: {
        relation: Model.ManyToManyRelation,
        modelClass: Customer,
        join: {
          from: "tee_times.id",
          through: {
            from: "customers_tee_times.tee_time_id",
            to: "customers_tee_times.customer_id"
          },
          to: "customers.id"
        }
      }
    };
  }
}
module.exports = TeeTime;

const { Model } = require("objection");

//static only used on constructor itself only
//methods within this class - objection needs access to all methods
class Customer extends Model {
  static get tableName() {
    return "customers";
  }
  static get relationMappings() {
    const TeeTime = require("./TeeTime");
    return {
      tee_times: {
        relation: Model.ManyToManyRelation,
        modelClass: TeeTime,
        join: {
          from: "customers.id",
          through: {
            from: "customers_tee_times.customer_id",
            to: "customers_tee_times.tee_time_id"
          },
          to: "tee_times.id"
        }
      }
    };
  }
}
module.exports = Customer
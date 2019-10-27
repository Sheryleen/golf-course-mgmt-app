const knex = require("../db/knex");
const Customer = require("../models/Customer");

exports.getAllCustomers = (req, res) => {
  Customer.query()
    .eager("tee_times")
    .then(customers => res.json(customers));
};

exports.getOneCustomer = (req, res) => {
  Customer.query()
    .findById(req.params.id)
    .eager("tee_times")
    .then(customer => res.json(customer));
};
exports.addOneCustomer = (req, res) => {
  knex("customers")
    .insert(req.body)
    .returning("*")
    .then(newCustomer => res.json(newCustomer));
};

exports.updateOneCustomer = (req, res) => {
  Customer.query()
    .findById(req.params.id)
    .update("tee_times");
  updated_at: newData().then(customer => res.json(customer));
};

//   knex("customers")
//     .update({
//       ...req.body,
//       updated_at: newData()
//     })
//     .where("id", req.params.id)
//     .returning("*")
//     .then(updateCustomer => res.json(updateCustomer));
// };

exports.removeOneCustomer = (req, res) => {
  knex("customers")
    .del()
    .where("id", req.params.id)
    .returning("*")
    .then(newCustomer => res.json(newCustomer));
};

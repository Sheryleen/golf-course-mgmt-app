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
  Customer.query()
    // knex("customers")
    .insert(req.body)
    .returning("*")
    .then(newCustomer => res.json(newCustomer));
};

exports.updateOneCustomer = (req, res) => {
  Customer.query()
    .findById(req.params.id)
    .update(req.body)
    .returning("*")
    .then(customer => res.json(customer));
};

exports.removeOneCustomer = (req, res) => {
  Customer.query()
    .deleteById(req.params.id)
    .returning("*")
    .then(newCustomer => res.json(newCustomer));
};

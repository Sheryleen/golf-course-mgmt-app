const knex = require("../db/knex");

exports.getAllCustomers = (req, res) => {
  knex //instance of knex
    .select() //select all
    .table("customers") //from customers
    .then(customers => res.json(customers)); //getting all customers back
};

exports.getOneCustomer = (req, res) => {
  knex
    .select() //retrieval process
    .table("customers")
    .where("id", req.params.id)
    .then(user => res.json(user));
};
exports.addOneCustomer = (req, res) => {
  knex("customers")
    .insert(req.body)
    .returning("*")
    .then(newUser => res.json(newCustomer));
};

exports.updateOneCustomer = (req, res) => {
  knex("customers")
    .update({
      ...req.body,
      updated_at: newData()
    })
    .where("id", req.params.id)
    .returning("*")
    .then(updatedCustomer => res.json(updateCustomer));
};

exports.removeOneCustomer = (req, res) => {
  knex("customers")
    .del()
    .where("id, req.params.id")
    .returning("*")
    .then(newCustomer => res.json(newCustomer));
};

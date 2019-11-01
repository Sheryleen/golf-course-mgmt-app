const knex = require("../db/knex");
const TeeTime = require("../models/TeeTime");

exports.getAllTee_Times = (req, res) => {
  TeeTime.query()
    .eager("customers")
    .then(customers => res.json(customers));
};

exports.getOneTee_Time = (req, res) => {
  TeeTime.query()
    .findById(req.params.id)
    .eager("customers")
    .then(customer => res.json(customer));
};
exports.addOneTee_Time = (req, res) => {
  TeeTime.query()
    .insert(req.body)
    .returning("*")
    .then(newTeeTime => res.json(newTeeTime));
};

exports.updateOneTee_Time = (req, res) => {
  TeeTime.query()
    .findById(req.params.id)
    .update("tee_time")
    .returning("*")
    .then(tee_time => res.json(tee_time));
};

exports.removeOneTee_Time = (req, res) => {
  TeeTime.query()
    .deleteById(req.params.id)
    .returning("*")
    .then(newTeeTime => res.json(newTeeTime));
};

const knex = require("../db/knex");

exports.getAllTee_Times = (req, res) => {
  knex //instance of knex
    .select() //select all
    .table("tee_times") //from appointments
    .then(tee_times => res.json(tee_times)); //getting all appts back
};

exports.getOneTee_Time = (req, res) => {
  knex("tee_times")
    .select()
    .then(tee_times => res.json(tee_times));
};

exports.addOneTee_Time = (req, res) => {
  knex("tee_times")
    .insert({
      ...req.body //all column data in row
    })

    .returning("*")
    .then(tee_times => res.json(tee_times));
};

exports.updateOneTee_Time = (req, res) => {
  knex("tee_times")
    .update({
      ...req.body, //all column data in row
      updated_at: new Date()
    })

    .where("id", req.params.id)
    .returning("*")
    .then(updatedTee_Time => res.json(updatedTee_Time));
};

exports.removeOneTee_Time = (req, res) => {
  knex("tee_times")
    .del()
    .where("id", req.params.id)
    .returning("*")
    .then(newTee_Time => res.json(newTee_Time)); //returns removed tee time
};

const knex = require("../db/knex");

exports.getAllTee_Times = (req, res) => {
  knex //instance of knex
    .select() //select all
    .table("tee_times") //from tee times table
    .then(tee_times => res.json(tee_times)); //getting all tee times back
};

exports.getOneTee_Time = (req, res) => {
  knex("tee_times")
    .select()
    .then(tee_times => res.json(tee_times));
};

exports.addOneTee_Time = (req, res) => {
  knex("tee_times")
    .insert({
      time: req.body.time //inserts new time into tee times table
    })

    .returning("*") //returns newly created time
    .then(tee_times => {
      knex("customers_tee_times")
        //inserts customer id and newly created tee time into joined table
        .insert({
          customer_id: req.body.customer_id,
          tee_time_id: tee_times.id
        });
      res.json(tee_times);
    });
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

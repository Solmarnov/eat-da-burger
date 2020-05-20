const orm = require('../config/orm.js');

const burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", res => {
      cb(res);
    });
  },
  // The variables cols and vals should be arrays
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, res => {
      cb(res);
    });
  },
  updateOne: function(table, objColVals, condition, cb) {
    orm.updateOne(table, objColVals, condition, res => {
      cb(res);
    });
  }
}

module.exports = burger;
const connection = require('../config/connection.js');

// ******************
//  HELPER FUNCTIONS
// ******************

// printQuestionMarks loops through and 
//   - creates an array of question marks - ["?", "?", "?"] 
//   - and turns it into a string - "?, ?, ?".
function printQuestionMarks(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// objToSql converts object key/value pairs to SQL syntax
function objToSql(obj) {
  const arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in obj) {
    var value = obj[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// ***************************
//  OBJECT RELATIONAL MAPPING 
// ***************************
const orm = {
  selectAll: function(tableInput, cb) {
    const queryString = "SELECT * FROM ??";
    connection.query(queryString, tableInput, (err, result) => {
      if (err) throw err;
      cb(result);
    })
  },
  insertOne: function(table, cols, vals, cb) {
    let queryString = "INSERT INTO ?? (";
    queryString += cols.toString();
    queryString += ") VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ");"
    console.log(queryString);

    connection.query(queryString, [table, vals], (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },
  // An example of objColVals would be {burger_name: cheeseburger, devoured: false}
  updateOne: function(table, objColVals, condition, cb) {
    let queryString = "UPDATE ?? SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE id = ?;";

    connection.query(queryString, [table, condition], (err, result) => {
      if (err) throw err;
      cb(result);
    });
  }
}

module.exports = orm;
const mysql = require("mysql");
const parseString = require("xml2js").parseString;
const fs = require("fs");

var HOST;
var USER;
var PASSWORD_TXT;

let data = fs.readFileSync("dbconfig.xml");
data = data.toLocaleString();

let parse = parseString(data, (err, res) => {
  if (err) console.log(err);
  HOST = res.dbconfig.host[0];
  USER = res.dbconfig.user[0];
  PASSWORD_TXT = res.dbconfig.password[0];
  DATABASE_NAME = res.dbconfig.database[0];
});

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    var database = mysql.createConnection(
      {
        host: HOST,
        user: USER,
        password: PASSWORD_TXT,
        database: DATABASE_NAME,
        charset: "utf8mb4",
        collation: "utf8mb4_unicode_ci",
      },
      (err) => {
        if (err) reject(err);
      }
    );
    resolve(database);
  });
}

function getCollection(database, table, limit = 0) {
  if (limit == 0) limit = "*";
  limit = limit.toString();

  var query = `SELECT ${limit} FROM ${table}`;

  return new Promise((resolve, reject) => {
    // running query
    database.query(query, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function Insert(database, table, data = {}) {
  return new Promise((resolve, reject) => {
    var sql = "INSERT INTO " + table + " SET ?";
    database.query(sql, data, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function FetchViaId(database, table, id, alias = undefined) {
  var sql = "";
  if (!alias) {
    sql = "SELECT * FROM " + table + " WHERE id=" + id;
  } else {
    sql = "SELECT * FROM " + table + " WHERE " + alias + "=" + id;
  }
  return new Promise((resolve, reject) => {
    database.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0]);
    });
  });
}

function Delete(database, table, column, condition) {
  var sql = `DELETE FROM ${table} WHERE ${column}${condition}`;
  return new Promise((resolve, reject) => {
    database.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function Filter(database, table, constraint) {
  // constraint is an evaluated string e.g id=5
  var sql = `SELECT * FROM ${table} WHERE ${constraint}`;
  return new Promise((resolve, reject) => {
    database.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

function Update(database, table, data = {}) {
  /*
        Update records that already exist
    */
  var ouput = "";

  for (var prop in data) {
    if (Object.prototype.hasOwnProperty.call(data, prop)) {
      let key = prop;
      let f = parseInt(data[key]);

      if (!isNaN(f)) {
        ouput += ` ${key} = ${data[key]},`;
      } else {
        ouput += ` ${key} = '${data[key]}',`;
      }
    }
  }

  ouput = ouput.slice(0, -1);

  var sql = `UPDATE ${table} SET${ouput} WHERE acc_id=${data.acc_id}`;
  return new Promise((resolve, reject) => {
    database.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

module.exports = {
  connect: async (databaseName) => {
    let database = await connectToDatabase(databaseName);
    return database;
  },
  fetch: async (database, table, limit) => {
    let result = await getCollection(database, table, limit);
    return result;
  },
  push: async (database, table, data = {}) => {
    let result = await Insert(database, table, data);
    return result;
  },
  get: async (database, table, id, alias) => {
    let result = await FetchViaId(database, table, id, alias);
    return result;
  },
  filter: async (database, table, constraint) => {
    let result = await Filter(database, table, constraint);
    return result;
  },
  delete: async (database, table, column, condition) => {
    let result = await Delete(database, table, column, condition);
    return result;
  },
  update: async (database, table, data = {}) => {
    let result = await Update(database, table, data);
    return result;
  },
};

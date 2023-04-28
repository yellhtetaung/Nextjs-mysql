const { createPool } = require("mysql");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Yellhtet@2488",
  port: 3306,
  database: "data",
});

pool.getConnection((err) => {
  if (err) {
    console.log("Error in connecting database.");
  } else console.log("Successfully connected to the databases.");
});

const exectureQuery = (query, arraParams) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(query, arraParams, (err, data) => {
        if (err) {
          console.log("error in executing the query");
          reject(err);
        }
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { exectureQuery };

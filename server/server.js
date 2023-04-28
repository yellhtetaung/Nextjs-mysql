const express = require("express");
const { exectureQuery } = require("../config/db");
const port = 9000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/employee", async (req, res) => {
  try {
    const employeeData = await exectureQuery("select * from employee");
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/employee/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const employeeData = await exectureQuery(
      "select * from employee where emp_id=?",
      [id]
    );
    res.status(200).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/saveEmployee", async (req, res) => {
  const { emp_name, emp_email, emp_address, emp_phone } = req.body;

  try {
    const employeeData = await exectureQuery(
      "insert into employee (emp_name, emp_email, emp_address, emp_phone) values (?,?,?,?)",
      [emp_name, emp_email, emp_address, emp_phone]
    );
    res.status(201).json(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

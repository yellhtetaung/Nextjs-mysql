import { exectureQuery } from "@/config/db";
import employeeValidation from "@/common/employeeValidatior";
import ErrorHandler from "@/common/errorHandler";

const getAllEmployees = async (_, res) => {
  try {
    const employeeData = await exectureQuery("select * from employee", []);
    res.send(employeeData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getEmployeeId = async (req, res, next) => {
  const id = req.query.id;

  try {
    const employeeData = await exectureQuery(
      `select * from employee where emp_id=?`,
      [id]
    );
    if (employeeData.length > 0) res.status(200).json(employeeData);
    else next(new ErrorHandler(`no employee found with this id ${id}`, 404));
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteEmployeeById = async (req, res) => {
  const id = req.query.id;

  try {
    await exectureQuery(`delete from employee where emp_id=?`, [id]);
    res.status(200).send("Employee deleted successfully.");
  } catch (err) {
    res.status(500).json(err);
  }
};

const saveEmployee = async (req, res) => {
  try {
    const result = req.body;
    const { emp_name, emp_email, emp_address, emp_phone } = result;
    const { error } = employeeValidation(result);

    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      let employeeData = await exectureQuery(
        "insert into employee (emp_name, emp_email, emp_address, emp_phone) values (?, ?, ?, ?)",
        [emp_name, emp_email, emp_address, emp_phone]
      );
      employeeData = await exectureQuery(
        `select * from employee where emp_id=${employeeData.insertId}`
      );
      res.status(201).send(employeeData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateEmployee = async (req, res) => {
  let id = req.query.id;
  const result = req.body;
  const { emp_name, emp_email, emp_address, emp_phone } = result;
  const { error } = employeeValidation(result);

  try {
    let employeeData = await exectureQuery(
      "select * from employee where emp_id=?",
      [id]
    );

    if (employeeData.length > 0) {
      if (error) {
        res.status(400).send(error.details[0].message);
      } else {
        employeeData = await exectureQuery(
          "update employee set emp_name=?, emp_email=?, emp_address=?, emp_phone=? where emp_id=?",
          [emp_name, emp_email, emp_address, emp_phone, id]
        );
        res.status(200).json(employeeData);
      }
    } else {
      res.status(400).json(`employee not found on this id=${id}`);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {
  getAllEmployees,
  getEmployeeId,
  deleteEmployeeById,
  saveEmployee,
  updateEmployee,
};

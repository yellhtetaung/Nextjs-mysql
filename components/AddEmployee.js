import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/AddEmployee.module.css";

import Header from "@/components/Header";

export default function AddEmployee() {
  const router = useRouter();

  const [addEmployee, setAddEmployee] = useState({
    emp_name: "",
    emp_email: "",
    emp_address: "",
    emp_phone: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setAddEmployee({ ...addEmployee, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      "http://localhost:3000/api/employee",
      addEmployee
    );

    if (data.data) router.push("/employees");

    setAddEmployee({
      emp_name: "",
      emp_email: "",
      emp_address: "",
      emp_phone: "",
    });
  };

  return (
    <div>
      <Header />
      <div className={styles.addform}>
        <h1>Add Employee</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_name"
              placeholder="Enter Name"
              value={addEmployee.emp_name}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <input
              type="email"
              className={styles.input}
              name="emp_email"
              placeholder="Enter Email"
              value={addEmployee.emp_email}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_address"
              placeholder="Enter Address"
              value={addEmployee.emp_address}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <input
              type="tel"
              className={styles.input}
              name="emp_phone"
              placeholder="Enter Phone"
              value={addEmployee.emp_phone}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <button type="submit" className={styles.submitBtn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

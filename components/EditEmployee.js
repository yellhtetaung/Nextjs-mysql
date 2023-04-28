import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/UpdateEmployee.module.css";

import Header from "@/components/Header";

export default function EditEmployee({ employeeUpdateData }) {
  const router = useRouter();

  const [addEmployee, setAddEmployee] = useState({
    emp_name: "",
    emp_email: "",
    emp_address: "",
    emp_phone: "",
  });

  useEffect(() => {
    setAddEmployee({
      emp_name: employeeUpdateData[0].emp_name,
      emp_email: employeeUpdateData[0].emp_email,
      emp_address: employeeUpdateData[0].emp_address,
      emp_phone: employeeUpdateData[0].emp_phone,
    });
  }, [employeeUpdateData]);

  const handleChange = (e) => {
    const value = e.target.value;
    setAddEmployee({ ...addEmployee, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = await axios.put(
      `http://localhost:3000/api/employee/${employeeUpdateData[0].emp_id}`,
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
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button
              className={styles.button}
              style={{ backgroundColor: "#dc2626" }}
            >
              <Link href={"/employees"}>Go Back</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

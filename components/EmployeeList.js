import React from "react";
import Header from "./Header";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "@/styles/EmployeeList.module.css";

const EmployeeList = ({ employeeData }) => {
  const router = useRouter();

  const deleteEmployee = async (id) => {
    const data = await axios.delete(`http://localhost:3000/api/employee/${id}`);
    router.push("/employees");
  };

  return (
    <>
      <Header />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>EmployeeID</th>
            <th className={styles.th}>EmployeeName</th>
            <th className={styles.th}>EmployeeEmail</th>
            <th className={styles.th}>EmployeeAddress</th>
            <th className={styles.th}>EmployeePhone</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {employeeData.map((item, index) => (
            <tr key={index}>
              <th className={styles.th}>{index + 1}</th>
              <td className={styles.th}>{item.emp_name}</td>
              <td className={styles.th}>{item.emp_email}</td>
              <td className={styles.th}>{item.emp_address}</td>
              <td className={styles.th}>{item.emp_phone}</td>
              <td className={styles.th} style={{ display: "flex", gap: "1em" }}>
                <button
                  className={styles.delete}
                  onClick={() => deleteEmployee(item.emp_id)}
                >
                  Delete
                </button>
                <button className={styles.update}>
                  <Link href={`/employee/${item.emp_id}`}>Update</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addEmployeeCenter}>
        <button className={styles.addEmployee}>
          <Link href={"/addEmployee"}>AddEmployee</Link>
        </button>
      </div>
    </>
  );
};

export default EmployeeList;

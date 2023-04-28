import nc from "next-connect";
import onError from "../../../common/errormiddleware";
import {
  getEmployeeId,
  deleteEmployeeById,
  updateEmployee,
} from "@/controller/employee/employee";

const handler = nc({ onError });

handler.get(getEmployeeId);
handler.delete(deleteEmployeeById);
handler.put(updateEmployee);

export default handler;

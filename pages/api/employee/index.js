import nc from "next-connect";
import { getAllEmployees, saveEmployee } from "@/controller/employee/employee";
import onError from "../../../common/errormiddleware";

const handler = nc(onError);

handler.get(getAllEmployees);
handler.post(saveEmployee);

export default handler;

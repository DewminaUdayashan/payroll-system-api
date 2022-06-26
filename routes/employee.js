import express from "express";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";
import {getEmployees,createEmployee,searchEmployee,updateEmployee} from "../controllers/employees.js";

const router = express.Router();

router.get('/',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getEmployees);

router.post('/create',verifyRole([ROLES.ADMIN]),createEmployee);

router.get('/search',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),searchEmployee);

router.post('/update',verifyRole([ROLES.ADMIN]),updateEmployee);

export default router;

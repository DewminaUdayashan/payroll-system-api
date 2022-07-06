import express from "express";
import { createEmployee, eligibleForPayment, getEmployees, searchEmployee, updateEmployee } from "../controllers/employees.js";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";

const router = express.Router();

router.get('/:isActive',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getEmployees);

router.post('/create',verifyRole([ROLES.ADMIN]),createEmployee);

router.post('/search',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),searchEmployee);

router.post('/update',verifyRole([ROLES.ADMIN]),updateEmployee);

router.post('/eligible_for_payment',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),eligibleForPayment);

export default router;

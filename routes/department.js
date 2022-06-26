import express from "express";
import ROLES from "../src/roles.js";
import verifyRole from "../middlewares/verify_roles.js";
import { getDepartments, createDepartment, updateDepartment } from "../controllers/departments.js";

const router = express.Router();

router.get('/',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getDepartments);

router.post('/create',verifyRole([ROLES.ADMIN]),createDepartment);

router.patch('/update',verifyRole([ROLES.ADMIN]),updateDepartment);

export default router;
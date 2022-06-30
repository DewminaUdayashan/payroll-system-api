import express from "express";
import { createDepartment, getDepartments, getDepartmentsLike, updateDepartment } from "../controllers/departments.js";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";

const router = express.Router();

router.get('/',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getDepartments);
router.get('/like/:name',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getDepartmentsLike);

router.post('/create',verifyRole([ROLES.ADMIN]),createDepartment);

router.patch('/update',verifyRole([ROLES.ADMIN]),updateDepartment);


export default router;
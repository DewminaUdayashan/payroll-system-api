import express from "express";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";
import { getAttendanceForEmpMonth,markAttendance,updateAttendance,deleteAttendance } from "../controllers/attendances.js";

const router = express.Router();

router.post('/',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getAttendanceForEmpMonth);
router.post('/mark',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),markAttendance);
router.patch('/update',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),updateAttendance);
router.delete('/delete',verifyRole([ROLES.ADMIN]),deleteAttendance);

export default router;

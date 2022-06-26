import express from "express";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";
import {getAllAdditionsForEmp,getAllAdditionsForEmpByType,updateAddition,deleteAddition, addAddition}from "../controllers/additions.js";

const router = express.Router();

router.get('/:id',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getAllAdditionsForEmp);

router.get('/:id/:type',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getAllAdditionsForEmpByType);

router.post('/add',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),addAddition);

router.patch('/update/:id',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),updateAddition);

router.delete('/delete/:id',verifyRole([ROLES.ADMIN]),deleteAddition);

export default router;
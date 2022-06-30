import express from "express";
import { createEPF, getEPF, updateEPF } from "../controllers/epfs.js";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";

const router = express.Router();

router.get('/',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getEPF);

router.post('/create',verifyRole([ROLES.ADMIN]),createEPF);

router.patch('/update',verifyRole([ROLES.ADMIN]),updateEPF);

export default router;

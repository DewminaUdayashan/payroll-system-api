import express from "express";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";
import {getDesignations,createDesignation,updateDesignation} from "../controllers/designations.js";

const router = express.Router();

router.get('/',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getDesignations);

// create designation
router.post('/create',verifyRole([ROLES.ADMIN]),createDesignation);

//update designation
router.patch('/update',verifyRole([ROLES.ADMIN]),updateDesignation);

export default router;
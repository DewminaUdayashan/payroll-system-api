import express from "express";
import { createDesignation, getDesignations, getDesignationsLike, updateDesignation } from "../controllers/designations.js";
import verifyRole from "../middlewares/verify_roles.js";
import ROLES from "../src/roles.js";

const router = express.Router();

router.get('/',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getDesignations);

// create designation
router.post('/create',verifyRole([ROLES.ADMIN]),createDesignation);

//update designation
router.patch('/update',verifyRole([ROLES.ADMIN]),updateDesignation);

//search designation
router.get('/like/:name',verifyRole([ROLES.ADMIN,ROLES.LOCAL]),getDesignationsLike);

export default router;
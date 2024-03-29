import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from "dotenv";
import auth from "./routes/auth.js";
import employee from "./routes/employee.js";
import departmet from "./routes/department.js";
import designation from "./routes/designation.js";
import attendance from "./routes/attendance.js";
import addition from "./routes/addition.js";
import authenticateToken from './middlewares/verify_token.js';
config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());


// login & authentication route
app.use('/authentication', auth);

app.use(authenticateToken);
// employees
app.use('/employees', employee);

app.use('/departments',departmet);

app.use('/designations',designation);

app.use('/attendance',attendance);

app.use('/additions',addition);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}...`);
});

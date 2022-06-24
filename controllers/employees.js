import sql from 'mssql';
import config from '../src/config.js';
import authenticateToken from '../middlewares/verify_token.js';

export async function getEmployees(req,res){
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request()
        .execute('crudSystemUserMaster')
        console.log(employees.recordset);
        res.status(200).json(employees.recordset);
    } catch (error) {
        console.log(error);
    }
}

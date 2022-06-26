import sql from 'mssql';
import config from '../src/config.js';

export async function getEmployees(req,res){
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request()
        .input('StatementType',sql.NVarChar,'SELECT')
        .execute('crudEmployees')
        res.status(200).json({
            status:200,
            message:'Employees fetched successfully',
            success:true,
            data:employees.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching employees',
            success:false,
            data:error
        });
    }
}


export async function createEmployee(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('designation_id',sql.Int,body.designationId)
        .input('first_name',sql.NVarChar,body.firstName)
        .input('last_name',sql.NVarChar,body.lastName)
        .input('surename',sql.NVarChar,body.surename)
        .input('nic',sql.NVarChar,body.nic)
        .input('dob',sql.DateTime,body.dob)
        .input('sex',sql.Bit,body.sex)
        .input('mobile_1',sql.NVarChar,body.mobile1)
        .input('mobile_2',sql.NVarChar,body.mobile2)
        .input('email',sql.NVarChar,body.email)
        .input('account_number',sql.NVarChar,body.accountNumber)
        .input('joined_date',sql.DateTime,body.joinedDate)
        .input('resigned_date',sql.DateTime,body.resignedDate)
        .input('StatementType',sql.VarChar,'INSERT')
        .execute('crudEmployees');
        
        res.status(201).json({
            status:201,
            message:'Employee added successfully',
            success:true,
            data:1
        });
        
    } catch (error) {
        res.status(400).json(error);
    }
}


export async function updateEmployee(req,res){
    const body  = req.body;
    console.log(body);
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('id',sql.Int,body.id)
        .input('designation_id',sql.Int,body.designationId)
        .input('first_name',sql.NVarChar,body.firstName)
        .input('last_name',sql.NVarChar,body.lastName)
        .input('surename',sql.NVarChar,body.surename)
        .input('nic',sql.NVarChar,body.nic)
        .input('dob',sql.DateTime,body.dob)
        .input('sex',sql.Bit,body.sex)
        .input('mobile_1',sql.NVarChar,body.mobile1)
        .input('mobile_2',sql.NVarChar,body.mobile2)
        .input('email',sql.NVarChar,body.email)
        .input('account_number',sql.NVarChar,body.accountNumber)
        .input('joined_date',sql.DateTime,body.joinedDate)
        .input('resigned_date',sql.DateTime,body.resignedDate)
        .input('StatementType',sql.VarChar,'UPDATE')
        .execute('crudEmployees');
        
        res.status(200).json({
            status:200,
            message:'Employee updated successfully',
            success:true,
            data:1
        });
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Employee update failed',
            success:false,
            data:error
        });
    }
}

export async function searchEmployee(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('designation_id',sql.Int,body.designationId)
        .input('first_name',sql.NVarChar,body.firstName)
        .input('last_name',sql.NVarChar,body.lastName)
        .input('surename',sql.NVarChar,body.surename)
        .input('nic',sql.NVarChar,body.nic)
        .input('dob',sql.DateTime,body.dob)
        .input('sex',sql.Bit,body.sex)
        .input('mobile_1',sql.NVarChar,body.mobile1)
        .input('mobile_2',sql.NVarChar,body.mobile2)
        .input('email',sql.NVarChar,body.email)
        .input('account_number',sql.NVarChar,body.accountNumber)
        .input('joined_date',sql.DateTime,body.joinedDate)
        .input('resigned_date',sql.DateTime,body.resignedDate)
        .input('StatementType',sql.VarChar,'LIKE')
        .execute('crudEmployees')
        res.status(200).json({
            status:200,
            message:'Employees fetched successfully',
            success:true,
            data:result.recordset
        });
    } catch (error) {
        console.log({
            status:400,
            message:'Employees not fetched',
            success:false,
            data:error
        });
    }
}
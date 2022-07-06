import sql from 'mssql';
import config from '../src/config.js';

export async function getDepartments(req,res){
    try {
        let pool = await sql.connect(config);
        let departments = await pool.request()
        .input('StatementType',sql.NVarChar,'SELECT')
        .execute('crudDepartments')
        res.status(200).json({
            status:200,
            message:'Departments fetched successfully',
            success:true,
            data:departments.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching departments',
            success:false,
            data:error
        });
    }
}

export async function avgAllowance(req,res){
    const body  = req.params;
    try {
        let pool = await sql.connect(config);
        let departments = await pool.request()
        .input('StatementType',sql.NVarChar,'AVGALLOWANCE')
        .input('id',sql.Int,body.id)
        .execute('crudDepartments')
        res.status(200).json({
            status:200,
            message:'Average allowance calculated successfully',
            success:true,
            data:departments.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching departments',
            success:false,
            data:error
        });
    }
}

export async function getDepartmentsLike(req,res){
    const body  = req.params;
    try {
        let pool = await sql.connect(config);
        let departments = await pool.request()
        .input('StatementType',sql.NVarChar,'LIKE')
        .input('name',sql.NVarChar,body.name)
        .execute('crudDepartments')
        res.status(200).json({
            status:200,
            message:'Departments fetched successfully',
            success:true,
            data:departments.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching departments',
            success:false,
            data:error
        });
    }
}


export async function createDepartment(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('name',sql.NVarChar,body.name)
        .input('description',sql.NVarChar,body.description)
        .input('StatementType',sql.VarChar,'INSERT')
        .execute('crudDepartments');
        
        console.log(result);
        res.status(201).json({
            status:201,
            message:'Department added successfully',
            success:true,
            data:'Department successfully added'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            message:'Error in adding department',
            success:false,
            data:error
        });
    }
}

export async function updateDepartment(req,res){
    const body  = req.body;
    console.log(body);

    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('id',sql.Int,body.id)
        .input('name',sql.NVarChar,body.name)
        .input('description',sql.NVarChar,body.description)
        .input('StatementType',sql.VarChar,'UPDATE')
        .execute('crudDepartments');
        
        res.status(200).json({
            status:200,
            message:'Department updated successfully',
            success:true,
            data:1
        });
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Department not updated',
            success:false,
            data:error
        });
    }
}

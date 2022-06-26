import sql from 'mssql';
import config from '../src/config.js';

export async function getDepartments(req,res){
    try {
        let pool = await sql.connect(config);
        let departments = await pool.request()
        .input('StatementType',sql.NVarChar,'SELECT')
        .execute('crudDepartments')
        res.status(200).json(departments.recordset);
    } catch (error) {
        res.status(400).json(error);
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
        res.status(201).json({data:'Department successfully added'});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

export async function updateDepartment(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('id',sql.Int,body.id)
        .input('name',sql.NVarChar,body.name)
        .input('description',sql.NVarChar,body.description)
        .input('StatementType',sql.VarChar,'UPDATE')
        .execute('crudDepartments');
        
        res.status(200).json({data:'Department successfully updated'});
        
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

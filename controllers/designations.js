import sql from 'mssql';
import config from '../src/config.js';

export async function getDesignations(req,res){
    try {
        let pool = await sql.connect(config);
        let designations = await pool.request()
        .input('StatementType',sql.NVarChar,'SELECT')
        .execute('crudDesignations')
        res.status(200).json({
            status:200,
            message:'Designations fetched successfully',
            success:true,
            data:designations.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching designations',
            success:false,
            data:error
        });
    }
}


export async function createDesignation(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('department_id',sql.Int,body.departmentId)
        .input('name',sql.NVarChar,body.name)
        .input('basic_allowance',sql.Decimal,body.basicAllowance)
        .input('StatementType',sql.VarChar,'INSERT')
        .execute('crudDesignations');
        
        res.status(201).json({
            status:201,
            message:'Designation added successfully',
            success:true,
            data:'Designation successfully added'
        });
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error in adding designation',
            success:false,
            data:error
        });
    }
}


export async function updateDesignation(req,res){
    const body  = req.body;
    console.log(body);
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('id',sql.Int,body.id)
        .input('department_id',sql.Int,body.departmentId)
        .input('name',sql.NVarChar,body.name)
        .input('basic_allowance',sql.Decimal,body.basicAllowance)
        .input('StatementType',sql.VarChar,'UPDATE')
        .execute('crudDesignations');
        
        res.status(200).json({
            status:200,
            message:'Designation updated successfully',
            success:true,
            data:1,
        });
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Designation not updated',
            success:false,
            data:error
        });
    }
}

import sql from 'mssql';
import config from '../src/config.js';

export async function getEPF(req,res){
    try {
        let pool = await sql.connect(config);
        let epfs = await pool.request()
        .input('StatementType',sql.NVarChar,'SELECT')
        .execute('crudEPF')
        res.status(200).json({
            status:200,
            message:'EPF fetched successfully',
            success:true,
            data:epfs.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching EPF',
            success:false,
            data:error
        });
    }
}

export async function createEPF(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('epfNo',sql.Int,body.epfNo)
        .input('employeeId',sql.Int,body.employeeId)
        .input('StatementType',sql.VarChar,'INSERT')
        .execute('crudEPF');
        
        console.log(result);
        res.status(201).json({
            status:201,
            message:'EPF added successfully',
            success:true,
            data:'EPF successfully added'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            message:'Error in adding EPF',
            success:false,
            data:error
        });
    }
}

export async function updateEPF(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('epfNo',sql.Int,body.epfNo)
        .input('total',sql.Real,body.total)
        .input('StatementType',sql.VarChar,'UPDATE')
        .execute('crudEPF');
        
        res.status(200).json({
            status:200,
            message:'EPF updated successfully',
            success:true,
            data:1
        });
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'EPF not updated',
            success:false,
            data:error
        });
    }
}

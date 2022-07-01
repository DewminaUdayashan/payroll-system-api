import sql from 'mssql';
import config from '../src/config.js';

export async function getAllAdditionsForEmp(req,res){
    const body  = req.params;
    try {
        let pool = await sql.connect(config);
        let additions = await pool.request()
        .input('employee_id',sql.Int,body.id)
        .input('StatementType',sql.NVarChar,'SELECTFOREMP')
        .execute('crudAdditions')
        res.status(200).json({
            status:200,
            message:'Additions fetched successfully',
            success:true,
            data:additions.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching additions',
            success:false,
            data:error
        });
    }
}

export async function getAllAdditionsForEmpByType(req,res){
    const body  = req.params;
    try {
        let pool = await sql.connect(config);
        let additions = await pool.request()
        .input('employee_id',sql.Int,parseInt(body.id))
        .input('is_deductions_only',sql.Bit,parseInt(body.type))
        .input('StatementType',sql.NVarChar,'SELECTBYTYPE')
        .execute('crudAdditions')
        res.status(200).json({
            status:200,
            message:'Additons fetched successfully',
            success:true,
            data:additions.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching additions',
            success:false,
            data:error
        });
    }
}

export async function addAddition(req,res){
    const body  = req.body;
    console.log(body);
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('employee_id',sql.Int,body.employeeId)
        .input('name',sql.NVarChar,body.name)
        .input('description',sql.NVarChar,body.description)
        .input('start_date',sql.DateTime,body.startDate)
        .input('end_date',sql.DateTime,body.endDate)
        .input('amount',sql.Real,body.amount)
        .input('is_deduction',sql.Bit,body.isDeduction)
        .input('is_monthly',sql.Bit,body.isMonthly)
        // .input('is_active',sql.Bit,body.isActive)
        .input('StatementType',sql.NVarChar,'INSERT')
        .execute('crudAdditions');
            res.status(200).json({
                status:200,
                message:'Addition added successfully',
                success:true,
                data:'Addition added successfully'
            });
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error in adding addition',
            success:false,
            data:error
        });
    }
}


export async function updateAddition(req,res){
    const {id} = req.params;
    const body  = req.body;
    console.log(id);
    console.log(body);
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('name',sql.NVarChar,body.name)
        .input('description',sql.NVarChar,body.description)
        .input('start_date',sql.DateTime,body.startDate)
        .input('end_date',sql.DateTime,body.endDate)
        .input('amount',sql.Real,body.amount)
        .input('is_deduction',sql.Bit,body.isDeduction)
        .input('is_monthly',sql.Bit,body.isMonthly)
        .input('is_active',sql.Bit,body.isActive)
        .input('id',sql.Int,id)
        .input('StatementType',sql.VarChar,'UPDATE')
        .execute('crudAdditions');
        
        res.status(200).json({
            status:200,
            message:'Addition updated successfully',
            success:true,
            data:'Addition updated successfully'
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            message:'Error in updating Addition',
            success:false,
            data:error
        });
    }
}

export async function deleteAddition(req,res){
    const body  = req.params;
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('id',sql.Int,body.id)
        .input('StatementType',sql.VarChar,'DELETE')
        .execute('crudAdditions');
        
        res.status(200).json({
            status:200,
            message:'Addition deleted successfully',
            success:true,
            data:'Addition deleted successfully'
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            message:'Error in deleting addition',
            success:false,
            data:error
        });
    }
}

import sql from 'mssql';
import config from '../src/config.js';

export async function getAttendanceForEmpMonth(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        let designations = await pool.request()
        .input('employee_id',sql.Int,body.employeeId)
        .input('year',sql.NVarChar,body.year)
        .input('month',sql.NVarChar,body.month)        
        .input('StatementType',sql.NVarChar,'SELECTBYEMPMONTH')
        .execute('crudAttendance')
        res.status(200).json({
            status:200,
            message:'Attendance fetched successfully',
            success:true,
            data:designations.recordset
        });
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error fetching attendance',
            success:false,
            data:error
        });
    }
}


export async function markAttendance(req,res){
    const body  = req.body;
    console.log(body);
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
        .input('employee_id',sql.Int,body.employeeId)
        .input('year',sql.NVarChar,body.year)
        .input('month',sql.NVarChar,body.month)
        .input('total_days',sql.Real,body.totalDays)
        .input('StatementType',sql.VarChar,'INSERT')
        .execute('crudAttendance');
        console.log(result);
        if(result.returnValue){
                res.status(200).json({
                    status:200,
                    message:'Attendance already marked for this month',
                    success:true,
                    data:result.returnValue,
                });
        }else{
            res.status(200).json({
                status:200,
                message:'Attendance marked for this month',
                success:true,
                data:result.returnValue,
            });
        }
        
    } catch (error) {
        res.status(400).json({
            status:400,
            message:'Error in adding attendance',
            success:false,
            data:error
        });
    }
}


export async function updateAttendance(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('employee_id',sql.Int,body.employeeId)
        .input('year',sql.NVarChar,body.year)
        .input('month',sql.NVarChar,body.month)
        .input('total_days',sql.Real,body.totalDays)
        .input('StatementType',sql.VarChar,'UPDATE')
        .execute('crudAttendance');
        
        res.status(200).json({
            status:200,
            message:'Attendance updated successfully',
            success:true,
            data:'Attendance updated successfully'
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            message:'Error in updating attendance',
            success:false,
            data:error
        });
    }
}

export async function deleteAttendance(req,res){
    const body  = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
        .input('employee_id',sql.Int,body.employeeId)
        .input('year',sql.NVarChar,body.year)
        .input('month',sql.NVarChar,body.month)
        .input('StatementType',sql.VarChar,'DELETE')
        .execute('crudAttendance');
        
        res.status(200).json({
            status:200,
            message:'Attendance deleted successfully',
            success:true,
            data:'Attendance deleted successfully'
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status:400,
            message:'Error in deleting attendance',
            success:false,
            data:error
        });
    }
}

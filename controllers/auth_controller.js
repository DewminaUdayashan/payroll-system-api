import sql from 'mssql';
import config from '../src/config.js';
import { generateAccessToken,generateRefreshToken } from "./jwt_controller.js";


export async function login(req,res){
    try {
        const user = {...req.body};
        let pool  =await new sql.connect(config);
        let systemUsersRecords =await pool.request()
        .input('userName',sql.NVarChar,user.name)
        .execute('getSystemUserByUserName');
        if(systemUsersRecords.recordset[0]){
             const systemUser =  systemUsersRecords.recordset[0];
            if(systemUser.password === user.password){
                const sendUser = { id:systemUser.id, name:systemUser.name,lastLogin:systemUser.last_login ,roleId:systemUser.role_id};
                const accessToken = generateAccessToken(sendUser);
                const refreshToken = generateRefreshToken(sendUser);
                res.status(200).json({
                    status:200,
                    message:'User logged in successfully',
                    success:true,
                    data:{...sendUser,accessToken:accessToken,refreshToken:refreshToken}
                });
            }else{
                res.status(401).json({
                    status:401,
                    message:'Invalid password',
                    success:false,
                    data:'Credentials not match'
                });
            }
        }else{
            res.status(401).json({
                status:401,
                message:'Invalid user name',
                success:false,
                data:'User not exist'
            });
        }
    }catch (error) {
        res.status(400).json({
            status:400,
            message:'Error in login',
            success:false,
            data:error
        });
    }
}

async function addSystemUser(user){
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
        .input('user_name',sql.VarChar,user.name)
        .input('type',sql.Int,user.type)
        .input('StatementType',sql.VarChar,user.statementType)
        .execute('crudSystemUserMaster')
        return insertUser.output;
    } catch (error) {
        console.log(error);
    }
}



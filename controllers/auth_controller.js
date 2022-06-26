import sql from 'mssql';
import config from '../src/config.js';
import { generateAccessToken,generateRefreshToken } from "./jwt_controller.js";


export async function login(req,res){
    try {
        const user = {...req.body};
        let pool  =await new sql.connect(config);
        let systemUsersRecords =await pool.request()
        .input('userName',sql.NVarChar,user.userName)
        .execute('getSystemUserByUserName');
        if(systemUsersRecords.recordset[0]){
             const systemUser =  systemUsersRecords.recordset[0];
            if(systemUser.password === user.password){
                const sendUser = { id:systemUser.id, name:systemUser.name,lastLogin:systemUser.last_login ,roleId:systemUser.role_id};
                const accessToken = generateAccessToken(sendUser);
                const refreshToken = generateRefreshToken(sendUser);
                res.status(200).json({data:{...sendUser,accessToken:accessToken,refreshToken:refreshToken}});
            }else{
                res.status(401).json({data:'Credentials not match'});
            }
        }else{
            res.status(401).json({data:'User not exist'});
        }
    }catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

async function addSystemUser(user){
    try {
        let pool = await sql.connect(config);
        let insertUser = await pool.request()
        .input('user_name',sql.VarChar,user.userName)
        .input('type',sql.Int,user.type)
        .input('StatementType',sql.VarChar,user.statementType)
        .execute('crudSystemUserMaster')
        return insertUser.output;
    } catch (error) {
        console.log(error);
    }
}



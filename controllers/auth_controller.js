import sql from 'mssql';
import config from '../src/config.js';
import { generateAccessToken,generateRefreshToken } from "./jwt_controller.js";


export async function login(req,res){
    try {
        const user = {...req.body};
        let pool  =await new sql.connect(config);
        let systemUsers =await pool.request()
        .input('userName',sql.NVarChar,user.userName)
        .execute('getSystemUserByUserName');
        if(systemUsers.recordset){
             const systemUser =  systemUsers.recordset[0];
             console.log(systemUser);
            if(systemUser.PASSWORD ===user.password){
                const sendUser = { id:systemUser.ID, name:systemUser.NAME,lastLogin:systemUser.LAST_LOGIN ,roleId:systemUser.ROLE_ID};
                console.log(sendUser);
                const accessToken = generateAccessToken( sendUser);
                const refreshToken = generateRefreshToken(sendUser);
                res.status(200).json({...sendUser,accessToken:accessToken,refreshToken:refreshToken});
            }else{
                res.sendStatus(301);
            }
        }else{
            res.sendStatus(401).json('User not found');
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



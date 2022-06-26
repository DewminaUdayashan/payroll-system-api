import ROLES from "../src/roles.js";

export default function verifyRole (roles){
    return (req,res,next)=>{
        if(roles.includes(req.user.roleId)){
            next();
        }else{
            res.status(403).json({error:'You are not authorized to perform this action'});
        }
    }
}
 

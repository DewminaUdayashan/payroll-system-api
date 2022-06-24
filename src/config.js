const config = {
    user : 'admin',
    password : 'admin',
    server : '127.0.0.1',
    database : 'PAYROLL_SYSTEM',
    options:{
        trustedconnection:true,
        trustServerCertificate:true,
        enableArithAort:true,
        instancename:'SQLEXPRESS'
    },
    port:4001
}

export default config;
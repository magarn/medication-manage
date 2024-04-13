const mysql = require('mysql')

//连接数据库
var connection = mysql.createConnection({
    // host: '180.76.139.173',
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'medicine',
    useConnectionPooling: true
});

//暴露出去
module.exports = connection;
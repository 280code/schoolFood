
//数据库工具函数代码
var mysql = require('mysql')

var pool = mysql.createPool({
    host: '114.215.209.136', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: 3306, // mysql服务运行的端口
    database: 'schoolfood', // 选择的库
    user: 'schoolFood', // 用户名
    password: 'YangoFood' // 用户密码   
})

//对数据库进行增删改查操作的基础
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release()
        })
    })
}

exports.query = query;
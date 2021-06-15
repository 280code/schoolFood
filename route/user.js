const Router = require('koa-router')
const user = Router()
const bodyparser = require('koa-bodyparser')
const db = require('../util')
user.use(bodyparser())

user.post('/sign',async (ctx)=>{
    const {username,password,identify} = ctx.request.body
    const sql = `insert into userinfo(username,password,identity)
    values('${username}','${password}',${identify});`
    let result = await new Promise((resolve,reject)=>{
        return db.query(sql,(err,data)=>{
            if(err){
               
                resolve(err.sqlMessage)
                ctx.body={
                    msg:"用户注册失败，发生错误:"+err.sqlMessage,
                    sql
                }
            }else{
                resolve(data)
                ctx.body={
                    msg:"用户注册成功！"
                }
            }
        })
    })
   console.log(result)
    
   
})
user.post('/del',async (ctx)=>{
    const username = ctx.request.body.username
    const sql = `delete from userinfo where username='${username}';`
    let result = await new Promise((resolve,reject)=>{
        return db.query(sql,(err,data)=>{
            if(err){
                resolve(err.sqlMessage)
                ctx.body={
                    msg:"注销用户账号失败，发生错误:"+err.sqlMessage
                }
            }else{
                resolve(data)
                ctx.body={
                    msg:"注销成功！"
                }
            }
        })
    })
   console.log(result)
    
})
user.post('/login',async (ctx)=>{
    const {username,password} = ctx.request.body
    const sql = `select * from userinfo where username = '${username}' and password = '${password}';`
    let data = await new Promise((resolve,reject)=>{
        return db.query(sql,(err,data)=>{
            if(err){
                reject(err.sqlMessage)
                console.log(err.sqlMessage)
            }else{
                resolve(data)
            }
        })
    })

    if(!data[0]){
        ctx.body={
            msg:"您输入的用户名或密码不正确。",
            code:false
            
        }

    }else{
      if(username!=data[0]['username']||password!=data[0]['password']){
          ctx.body={
              msg:"您输入的用户名或密码不正确",
              code:false
          }
      }else{
          let sql = `select userinfo.username,password,identity,id 'comments.id',
          createtime 'comments.createtime',favorite from userinfo 
          left join comments on userinfo.username=comments.username
          left join favorite on userinfo.username=favorite.username
          where userinfo.username='${username}';`
          let result =await new Promise((resolve,reject)=>{
              return db.query(sql,(err,data)=>{
                  if(err){
                      reject(err)
                  }else{
                      resolve(data)
                  }
            })
          })
          ctx.body={
              msg:"登陆成功！！",
              code:true,
              result
          }
      }
        
    }
    
})

module.exports =user
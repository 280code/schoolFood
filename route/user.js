const Router = require('koa-router')
const user = Router()
const bodyparser = require('koa-bodyparser')
const db = require('../util')
const jwt = require('jsonwebtoken')
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
                    sql,
                    code:false
                }
            }else{
                resolve(data)
                ctx.body={
                    msg:"用户注册成功！",
                    code:true
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
                    msg:"注销用户账号失败，发生错误:"+err.sqlMessage,
                    code:false
                }
            }else{
                resolve(data)
                ctx.body={
                    msg:"注销成功！",
                    code:true
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
          const token = jwt.sign({username:username,password:password},'secret',{expiresIn:2678400})
          uptsql=`update userinfo set token = '${token}' where username = '${username}';`
          let addTokenStatus = await new Promise ((resolve,reject)=>{
              return db.query(uptsql,(err,data)=>{
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
              token,
              addTokenStatus,
              result:result[0]
          }
      }
        
    }
    
})

user.post('/token',async (ctx)=>{

    let {token,username} = ctx.request.body
    STSql=`select token
           from userinfo
           where username='${username}';`
    const SToken = await new Promise((resolve,reject)=>{
        return db.query(STSql,(err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
    if(SToken[0]){
        if(SToken[0]['token']==token){
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
                code:true,
                result:result[0]
            }
        }else{
           ctx.body={
               code:false,
               msg:"token不匹配！！"
           }
    }


    }else{
        ctx.body={
            code:false,
            msg:"token不匹配！！"
        }
    }
})

module.exports =user
const Router = require('koa-router')
const category = new Router()
const bodyparser = require('koa-bodyparser')
const db = require('../util')

category.use(bodyparser())
category.get('/get',async (ctx)=>{
    const sql = `select name 'category' from category;`
    let result = await new Promise((resolve,reject)=>{
        return db.query(sql,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
    ctx.body={
        result
    }
})

category.get('/getmenu',async (ctx)=>{
    const {category} = ctx.request.body
    const sql = `select * from menu where category = '${category}';`
    let result = await new Promise((resolve,reject)=>{
        return db.query(sql,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
    ctx.body={
        result
    }
})
module.exports = category
const Router = require('koa-router')
const restaurant = Router()
const bodyparser = require('koa-bodyparser')
restaurant.use(bodyparser())
const db = require('../util')

restaurant.get('/floor/get',async (ctx)=>{
    const sql= `select DISTINCT floor from restaurant order by floor;`
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
        result
    }

})
restaurant.post('/get',async (ctx)=>{
    const {floor}=ctx.request.body
    console.log(floor)
    var ok=true
    const sql = `select * from restaurant where floor=${floor};`
    let result = await new Promise((resolve,reject)=>{
        return db.query(sql,(err,data)=>{
            if(err){
                resolve(err)
                
                ok=false
            }else{
                resolve(data)
            }
        })
    })
    if(ok){
        ctx.body={
            msg:"查找成功！！",
            result
            
        }
    }else{
        ctx.body={
            msg:"查找失败！！",
            result
            
        }
    }
    console.log(result)
})
module.exports=restaurant
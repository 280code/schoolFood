const Koa = require('koa2')
const app = new Koa()
const router = require('./route/index')
const static = require('koa-static')
const path = require('path')
const host ='123.56.192.77'
app.use(static(path.join(__dirname+'/assets')));
app.use(router.routes(),router.allowedMethods())


app.listen(5050,()=>{
    console.log("server is run now")
})
//
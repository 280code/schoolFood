const Router = require('koa-router')
const uploadP = new Router()
const multer = require('koa-multer')
const upload = multer({dest:"./assets/images"})
const fs = require('fs')
const views = require('koa-views');
uploadP.use(views('views', { map: {html: 'ejs' }}));  
uploadP.get('/add',async (ctx)=>{
    let title = 'hello koa2'
    await ctx.render('uploadP.ejs',{
        title
    })  
})
//single的内容是input的name属性的值
uploadP.post("/",upload.single('imgfile'),async(ctx,next)=>{
   console.log(ctx.req.file)
   console.log(ctx.req)
   
//重命名
   let oldPath = ctx.req.file.destination+"/"+ctx.req.file.filename;
   let newPath = ctx.req.file.destination+"/"+ctx.req.file.originalname;
   fs.rename(oldPath,newPath,()=>{
       console.log("改名成功")
   })
})
module.exports = uploadP;
const Router = require("koa-router");
const comment = Router();
const bodyparser = require("koa-bodyparser");
comment.use(bodyparser());
const db = require("../util");
//某一用户增加评论
comment.post("/add", async (ctx) => {
  const { username, comment } = ctx.request.body;
  const sql = `insert into comments(username,comment)
    values("${username}","${comment}");`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);
        ctx.body = {
          msg: "增加评论失败，发生错误：" + err.sqlMessage,
        };
      } else {
        resolve(data);
        ctx.body = {
          msg: "执行成功!!!",
        };
      }
    });
  });
  console.log(result);
});
//查找某一用户的所有评论
comment.get("/get", async (ctx) => {
  const { username } = ctx.request.body;
  const sql = `select * from comments where username='${username}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);
        ctx.body = {
          msg: "查找评论失败，发生错误：" + err.sqlMessage,
        };
      } else {
        resolve(data);
      }
    });
  });
  ctx.body = {
    msg: "查找成功！！",
    result,
  };
  console.log(result);
});
//删除某一条评论
comment.post("/del", async (ctx) => {
  const { id } = ctx.request.body;
  const sql = `delete from comments where id=${id};`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);
        ctx.body = {
          msg: "删除评论失败，发生错误：" + err.sqlMessage,
        };
      } else {
        resolve(data);
        ctx.body = {
          msg: "删除评论成功!!!",
        };
      }
    });
  });
  console.log(result);
});
module.exports = comment;

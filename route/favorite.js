const Router = require("koa-router");
const favorite = Router();
const db = require("../util");
const bodyparser = require("koa-bodyparser");
favorite.use(bodyparser());

favorite.post("/add", async (ctx) => {
  const { username, favorite } = ctx.request.body;
  const sql = `insert into favorite(username,favorite)
    values("${username}","${favorite}");`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);
        ctx.body = {
          msg: "添加收藏失败，发生错误:" + err.sqlMessage,
        };
      } else {
        resolve(data);
        ctx.body = {
          msg: "添加收藏成功！！",
        };
      }
    });
  });
  console.log(result);
});

favorite.post("/del", async (ctx) => {
  const { username, favorite } = ctx.request.body;
  const sql = `delete from favorite where username='${username}' and favorite='${favorite}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);
        ctx.body = {
          msg: "删除收藏失败，发生错误：" + err.sqlMEssage,
        };
      } else {
        resolve(data);
        ctx.body = {
          msg: "删除收藏成功!!",
        };
      }
    });
  });

  console.log(result);
});

favorite.get("/get", async (ctx) => {
  const { username } = ctx.request.body;
  console.log(username);
  const sql = `select * from favorite where username='${username}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);
        ctx.body = {
          msg: "查找用户收藏失败，发生错误：" + err.sqlMessage,
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

module.exports = favorite;

const Router = require("koa-router");
const menu = Router();
const bodyparser = require("koa-bodyparser");
menu.use(bodyparser());
const db = require("../util");
//查找某家店的菜单
menu.post("/getall", async (ctx) => {
  const { restaurant } = ctx.request.body;
  var ok = true;
  const sql = `select * from menu where restaurant = '${restaurant}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);

        ok = false;
      } else {
        resolve(data);
      }
    });
  });
  if (ok) {
    ctx.body = {
      msg: "查找成功！！",
      result,
    };
  } else {
    ctx.body = {
      msg: "查找失败！！",
      result,
    };
  }
  console.log(result);
});
//菜的名字
menu.post("/getall/name", async (ctx) => {
  const { restaurant } = ctx.request.body;
  var ok = true;
  const sql = `select name from menu where restaurant = '${restaurant}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);

        ok = false;
      } else {
        resolve(data);
      }
    });
  });
  if (ok) {
    ctx.body = {
      msg: "查找成功！！",
      result,
    };
  } else {
    ctx.body = {
      msg: "查找失败！！",
      result,
    };
  }
  console.log(result);
});
//菜的价格
menu.post("/getall/price", async (ctx) => {
  const { restaurant } = ctx.request.body;
  var ok = true;
  const sql = `select price from menu where restaurant = '${restaurant}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);

        ok = false;
      } else {
        resolve(data);
      }
    });
  });
  if (ok) {
    ctx.body = {
      msg: "查找成功！！",
      result,
    };
  } else {
    ctx.body = {
      msg: "查找失败！！",
      result,
    };
  }
  console.log(result);
});
//菜的分类
menu.post("/getall/category", async (ctx) => {
  const { restaurant } = ctx.request.body;
  var ok = true;
  const sql = `select category from menu where restaurant = '${restaurant}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);

        ok = false;
      } else {
        resolve(data);
      }
    });
  });
  if (ok) {
    ctx.body = {
      msg: "查找成功！！",
      result,
    };
  } else {
    ctx.body = {
      msg: "查找失败！！",
      result,
    };
  }
  console.log(result);
});
menu.get("/getone", async (ctx) => {
  const { name } = ctx.request.body;
  var ok = true;
  const sql = `select * from menu where name = '${name}';`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        resolve(err);

        ok = false;
      } else {
        resolve(data);
      }
    });
  });
  if (ok) {
    ctx.body = {
      msg: "查找成功！！",
      result,
    };
  } else {
    ctx.body = {
      msg: "查找失败！！",
      result,
    };
  }
  console.log(result);
});

module.exports = menu;

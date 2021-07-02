const Router = require("koa-router");
const soup = Router();
const bodyparser = require("koa-bodyparser");
soup.use(bodyparser());
const db = require("../util");

soup.get("/get", async (ctx) => {
  const { floor, week } = ctx.request.body;
  console.log(floor);
  var ok = true;
  const sql = `select * from soup where floor=${floor} and week=${week};`;
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
module.exports = soup;

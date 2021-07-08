const Router = require("koa-router");
const restaurant = Router();
const bodyparser = require("koa-bodyparser");
restaurant.use(bodyparser());
const db = require("../util");

restaurant.post("/floor/get", async (ctx) => {
  const sql = `select DISTINCT floor from restaurant order by floor;`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let floor = new Array(data.lenth)
        //forEach 回调函数的第一个参数是遍历数组的元素，
        //第二个参数是 元素的位置， 第三个参数是 整个数组的值。
        data.forEach(function(v,i,a){
          floor[i]=(v["floor"])
  });
        resolve(floor);
      }
    });
  });
 
  ctx.body = {
    result
  };
});
restaurant.post("/get", async (ctx) => {
  const { floor } = ctx.request.body;
  console.log(floor);
  var ok = true;
  const sql = `select * from restaurant where floor=${floor};`;
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
      msg: "查找成功！！!",
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
module.exports = restaurant;

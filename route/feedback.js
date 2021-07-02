const Router = require("koa-router");
const feedback = Router();
const bodyparser = require("koa-bodyparser");
feedback.use(bodyparser());
const db = require("../util");

feedback.post("/commit", async (ctx) => {
  const { username, feedback, contact } = ctx.request.body;
  const sql = `insert into feedback(username,contact,feedback)
    values("${username}","${contact}}","${feedback}");`;
  const result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  ctx.body = {
    result,
  };
});
module.exports = feedback;

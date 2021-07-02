const Router = require("koa-router");
const router = Router();
const user = require("./user");
const favorite = require("./favorite");
const comment = require("../route/comment");
const restaurant = require("../route/restaurant");
const soup = require("../route/soup");
const menu = require("../route/menu");
const feedback = require("./feedback");
const category = require("./category");

router.use("/user", user.routes(), user.allowedMethods());
router.use("/favorite", favorite.routes(), favorite.allowedMethods());
router.use("/comment", comment.routes(), comment.allowedMethods());
router.use("/restaurant", restaurant.routes(), restaurant.allowedMethods());
router.use("/soup", soup.routes(), soup.allowedMethods());
router.use("/menu", menu.routes(), menu.allowedMethods());
router.use("/feedback", feedback.routes(), feedback.allowedMethods());
router.use("/category", category.routes(), category.allowedMethods());

module.exports = router;

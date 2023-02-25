const koaRouter = require('koa-router')
const config = require('config');
const apiPrefix = config.get('Router.apiPrefix');
const log4js = require("../utils/log4js");
const router = new koaRouter()
router.prefix(apiPrefix); //Set the routing prefix

const v1 = require('./v1');
router.use('/v1', v1.routes(), v1.allowedMethods()); // Setting up the V1 version path route

const v2 = require('./v2');
router.use('/v2', v2.routes(), v2.allowedMethods()); //Setting up the V2 version path route


//Interface Health Check
router.get('/health', async (ctx) => {
    const result = {"code": 0, "msg": "", "data": "Backend Server is running"}
    // log4js.debug(JSON.stringify(ctx))
    ctx.body = result;
});

module.exports = router
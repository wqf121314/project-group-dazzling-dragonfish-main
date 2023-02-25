const koaRouter = require('koa-router')
const log4js = require("../../utils/log4js");
const router = new koaRouter()

const eventGroup = require('./eventGroup');
router.use('/eventgroup', eventGroup.routes(), eventGroup.allowedMethods());

const event = require('./event');
router.use('/event', event.routes(), event.allowedMethods());


//Interface Health Check
router.get('/health', async (ctx) => {
    const result = {"code": 0, "msg": "", "data": "Backend Server V2 is running"}
    // log4js.debug(JSON.stringify(ctx))
    ctx.body = result;
});

module.exports = router
const koaRouter = require('koa-router')
const log4js = require("../../utils/log4js");
import EventVo from "../../event/domain/EventVo";

import {retrieveEvent, retrieveEventList} from "../../event/dao/EventDao";

const data = new EventVo();
// Creating routing modules
const router = new koaRouter();

router.get('/', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const eventList = await retrieveEventList().catch((err) => {
        console.error("Event.router.get./ , retrieveEventList:", err);
        result.code = 1;
        result.msg = err.message;
        ctx.body = result;
    });
    if (eventList && eventList.length > 0) {
        result.code = 0
        result.msg = ""
        result.data = eventList
        ctx.body = result;
    } else {
        result.code = 2;
        result.msg = "No data obtained.";
        ctx.body = result;
    }
})
/**
 * compared the postman interface
 */
router.get('/:id', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const {id} = ctx.params;
    const event = await retrieveEvent(id)
        .catch((err) => {
            console.error("Event.router.get./:id, retrieveEvent:", err);
            result.code = 1;
            result.msg = err.message;
            ctx.body = result;
        });
    // log4js.debug(`${event}`)
    if (event) {
        result.code = 0
        result.msg = ""
        result.data = data.getEventById(event)
    } else {
        result.code = 2;
        result.msg = "No data obtained.";
    }
    ctx.body = result;
});
module.exports = router
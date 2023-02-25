import {retrieveEvent, retrieveEventList} from "../../event/dao/EventDao";

const koaRouter = require('koa-router')
const log4js = require("../../utils/log4js");
import EventVo from "../../event/domain/EventVo";

const data = new EventVo();
// Creating routing modules
const router = new koaRouter();

router.get('/', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const eventList = await retrieveEventList().catch((err) => {
        log4js.warn(`Event.router.get./ , retrieveEventList: ${err}`);
        result.code = 1;
        result.msg = err.message;
        ctx.body = result;
    });

    if (eventList && eventList.length > 0) {
        eventList.sort((a, b) => {
            return b.article.publish - a.article.publish;
        })
        result.code = 0
        result.msg = ""
        result.data = eventList
    } else {
        result.code = 2;
        result.msg = "No data obtained.";
    }
    ctx.body = result;
})

/**
 * compared the postman interface
 */
router.get('/:id', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const {id} = ctx.params;
    const event = await retrieveEvent(id)
        .catch((err) => {
            log4js.warn(`Event.router.get./:id, retrieveEvent:${err} `);
            result.code = 1;
            result.msg = err.message;
            ctx.body = result;
        });
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
import EventGroupVo from "../../eventGroup/domain/EventGroupVo";
import {retrieveEventGroupById} from "../../eventGroup/dao/EventGroupDao";

const {retrieveEventGroupList} = require("../../eventGroup/dao/EventGroupDao");

const koaRouter = require('koa-router')
const log4js = require("../../utils/log4js");

// Creating routing modules
const router = new koaRouter();
const data = new EventGroupVo();

router.get('/recommend', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    let eventGroupList = [];
    eventGroupList = await retrieveEventGroupList().catch((err) => {
        log4js.error(`EventGroup.router.get./recommend , retrieveEventGroupList:${err}`);
        result.code = 1;
        result.msg = err.message;
        ctx.body = result;
    });

    if (eventGroupList.length <= 0) {
        result.code = 2;
        result.msg = "No data obtained.";
        ctx.body = result;
        return;
    }
    result.code = 0
    result.msg = ""
    result.data = data.getRecommendEventGroups(eventGroupList)
    ctx.body = result;
});
/**
 * compared the postman interface
 */
router.post('/recommend', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    let eventGroupList = [];
    const {count} = ctx.request.body;
    if (typeof count !== 'number' && isNaN(count)) {
        log4js.error(`EventGroup.router.post./recommend , count:${count} is NOT in compliance with the rules`)
        result.code = 1;
        result.msg = "count:" + count + " is NOT in compliance with the rules.";
        ctx.body = result;
        return;
    }

    if (count <= 0) {
        log4js.error(`EventGroup.router.post./recommend , count:${count} is empty in compliance with the rules`)
        result.code = 4;
        result.msg = "count:" + count + " is EMPTY in compliance with the rules.";
        ctx.body = result;
        return;
    }

    eventGroupList = await retrieveEventGroupList(count).catch((err) => {
        console.error("EventGroup.router.post./recommend , retrieveEventGroupList:", err);
        result.code = 2;
        result.msg = err.message;
        ctx.body = result;
    });

    if (eventGroupList.length <= 0) {
        result.code = 3;
        result.msg = "No data obtained.";
        ctx.body = result;
        return;
    }
    result.code = 0
    result.msg = ""
    result.data = data.getRecommendEventGroups(eventGroupList)
    ctx.body = result;
});

router.get('/:id', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const {id} = ctx.params;
    let eventGroup = await retrieveEventGroupById(id)
        .catch((err) => {
            log4js.error(`EventGroup.router.get./:id ${id}, retrieveEventGroupById ${err}`);
            result.code = 1;
            result.msg = err.message;
            ctx.body = result;
        });
    if (eventGroup) {
        result.code = 0
        result.msg = ""
        result.data = data.getEventGroupById(eventGroup)
    }
    ctx.type = 'json';
    ctx.body = result;
});
module.exports = router

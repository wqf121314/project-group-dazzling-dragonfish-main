import EventGroupVo from "../../eventGroup/domain/EventGroupVo";
import {
    retrieveEventGroup, retrieveEventGroupByCategory, retrieveEventGroupByCategoryANDQuery
} from "../../eventGroup/server/EventGroupServer";
import {retrieveEventGroupById} from "../../eventGroup/dao/EventGroupDao";

const koaRouter = require('koa-router')
const log4js = require("../../utils/log4js");

// Creating routing modules
const router = new koaRouter();
const data = new EventGroupVo();


router.get('/recommend', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const eventGroups = await retrieveEventGroup()

    if (eventGroups.HotWords.length <= 0 && eventGroups.EventGroupList.length <= 0) {
        log4js.warn("EventGroup.router.get.V2/eventGroup/recommend does not find EventGroupProperty Data")
        result.code = 1;
        result.msg = "No data obtained.";
        ctx.body = result;
        return;
    }
    eventGroups.HotWords = getTop5HotWords(eventGroups.HotWords);
    eventGroups.EventGroupList = sortEventGroups(eventGroups.EventGroupList);
    result.code = 0;
    result.msg = "";
    result.data = data.getRecommendEventGroupsV2(eventGroups.HotWords, eventGroups.EventGroupList);
    log4js.info(`EventGroup.router.get.V2/eventGroup/recommend Result:{HowWords ${eventGroups.HotWords.length}, EventGroupList:${eventGroups.EventGroupList.length}}`);
    ctx.body = result;
})

router.get('/recommend/:category', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const {category} = ctx.params;
    const eventGroups = await retrieveEventGroupByCategory(category)
    if (!eventGroups) {
        log4js.warn(`EventGroup.router.get.V2/eventGroup/recommend/${category}  does not exist in EventCategory array.`)
        result.code = 1
        result.msg = "category:" + category + " does not exist in EventCategory array.";
        ctx.body = result;
        return;
    }
    if (eventGroups.HotWords.length <= 0 && eventGroups.EventGroupList.length <= 0) {
        log4js.warn(`EventGroup.router.get.V2/eventGroup/recommend/${category} does not find EventGroupProperty Data`)
        result.code = 2;
        result.msg = "No data obtained.";
        ctx.body = result;
        return;
    }
    eventGroups.HotWords = getTop5HotWords(eventGroups.HotWords);
    eventGroups.EventGroupList = sortEventGroups(eventGroups.EventGroupList)
    result.code = 0;
    result.msg = "";
    result.data = data.getRecommendEventGroupsV2(eventGroups.HotWords, eventGroups.EventGroupList);
    log4js.info(`EventGroup.router.get.V2/eventGroup/recommend/${category} , Result: {HowWords: ${eventGroups.HotWords.length},EventGroupList:${eventGroups.EventGroupList.length} }`);
    ctx.body = result;
})

/**
 * compared the postman interface
 */
router.post('/recommend', async (ctx) => {
    let result = {code: null, msg: null, data: null};

    const {count, category, query} = ctx.request.body;
    //检测count的变量
    if (typeof count !== 'number' && isNaN(count)) {
        log4js.warn(`EventGroup.router.post./recommend , count:${count} is NOT in compliance with the rules. `)
        result.code = 1;
        result.msg = "count:" + count + " is NOT in compliance with the rules.";
        ctx.body = result;
        return;
    }

    const eventGroups = await retrieveEventGroupByCategoryANDQuery(category, query, count);

    if (!eventGroups || (eventGroups.HotWords.length <= 0 && eventGroups.EventGroupList.length <= 0)) {
        log4js.warn(`EventGroup.router.post.V2/eventGroup/recommend ${JSON.stringify(ctx.request.body)} does not find EventGroupProperty Data`)
        result.code = 2;
        result.msg = "No data obtained.";
        ctx.body = result;
        return;
    }

    eventGroups.HotWords = getTop5HotWords(eventGroups.HotWords);
    eventGroups.EventGroupList = sortEventGroups(eventGroups.EventGroupList)

    result.code = 0;
    result.msg = "";
    result.data = data.getRecommendEventGroupsV2(eventGroups.HotWords, eventGroups.EventGroupList);

    log4js.info(`EventGroup.router.POST.V2/eventGroup/recommend ${JSON.stringify(ctx.request.body)} Result:{HotWords:${eventGroups.HotWords.length} ,EventGroupList:${eventGroups.EventGroupList.length}}`);
    ctx.body = result;

})
/**
 * compared the postman interface
 */
router.get('/:id', async (ctx) => {
    let result = {code: null, msg: null, data: null};
    const {id} = ctx.params;
    let eventGroup = await retrieveEventGroupById(id)
        .catch((err) => {
            log4js.warn(`EventGroup.router.get./:id, retrieveEventGroupById:${id} ${err}`);
            result.code = 1;
            result.msg = err.message;
            ctx.body = result;
        });
    if (eventGroup) {
        eventGroup.articles = sortEvents(eventGroup.articles);
        if (eventGroup) {
            result.code = 0
            result.msg = ""
            result.data = data.getEventGroupById(eventGroup)
        }
    } else {
        log4js.warn(`EventGroup.router.get.V2/eventGroup/${id} does not find retrieveEventGroupById Data`)
        result.code = 2;
        result.msg = "No data obtained.";
    }
    ctx.body = result;
});

/**
 * Random Top5 rule: Sort the array according to the length of the string from largest to smallest, then randomly take 5 out of the first 10 data as the top5 hotWords
 * @param array
 * @returns {*[]}
 */
function getTop5HotWords(array) {
    //按照字符串的长度进行排序
    const new_array = array.map(i => ({raw: i, len: i.length}))
        .sort((p, n) => n.len - p.len)
        .map(i => i.raw)
    if (new_array.length < 6) {
        return new_array;
    }
    //取前10个数据进行随机TOP5
    let hotWords = []

    if (new_array.length >= 10) {
        while (hotWords.length < 5) {
            const number = Math.floor(Math.random() * 10);
            if (hotWords.indexOf(new_array[number]) === -1) {
                hotWords.push(new_array[number])
            }
        }
    } else {
        for (let i = 0; i < 5; i++) {
            hotWords.push(new_array[i]);
        }

    }
    return hotWords;
}

function sortEventGroups(eventGroups) {
    eventGroups.sort((a, b) => {
        return b.publish - a.publish;
    })
    return eventGroups;
}

function sortEvents(events) {
    events.sort((a, b) => {
        return b.article.publish - a.article.publish;
    })
    return events;
}


module.exports = router

import {retrieveEventGroupPropertyList, retrieveEventGroupPropertyListByCategory} from "../dao/EventGroupPropertyDao";
import {
    retrieveEventGroupByEventTitle, retrieveEventGroupByPropertyId, retrieveEventGroupList
} from "../dao/EventGroupDao";

const log4js = require('../../utils/log4js')

const EventCategory = ['BUSINESS', 'SCIENCE', 'HEALTH', 'SPORTS', 'HEADLINES', 'ENTERTAINMENT'];

/**
 * find EventGroup By Category
 * @param category
 * @param count
 * @returns {Promise<{HotWords: *[], EventGroupList: *[]}|null>}
 */
async function retrieveEventGroupByCategory(category, count) {
    //Determine if category exists in EventCategory
    if (!EventCategory.includes(category.toUpperCase())) {
        log4js.debug(`EventGroup.router.get.V2/eventGroup/recommend/${category} does not exist in EventCategory array.`)
        return null;
    }
    let hotWords = []
    let eventGroupList = []

    //Get the data of the eventGroupProperty where the category exists
    const eventGroupPropertyList = await retrieveEventGroupPropertyListByCategory(category.toLowerCase(), count)
        .catch((err) => {
            log4js.error(`EventGroup.router.get./recommend/${category} retrieveEventGroupPropertyListByCategory:${category} :${err} `);
        })
    //Returns data not found if the eventGroupPropertyList does not have data
    if (eventGroupPropertyList.length <= 0) {
        log4js.debug(`EventGroup.router.get.V2/eventGroup/recommend/${category} does not find EventGroupProperty Data`)
        return {HotWords: hotWords, EventGroupList: eventGroupList};
    }
    for (const eventGroupProperty of eventGroupPropertyList) {
        //Merge the hotWords data in each eventGroupProperty
        hotWords = Array.from(new Set([...hotWords, ...eventGroupProperty.hotWords]));

        //Find the eventGroup data by the eventGroupProperty's Id and store it in the eventGroupList
        const eventGroup = await retrieveEventGroupByPropertyId(eventGroupProperty._id).catch((err) => {
            log4js.error(`EventGroup.router.get./recommend/${category} retrieveEventGroupByPropertyId:${eventGroupProperty._id}, ${err}`);
        });
        eventGroupList = Array.from(new Set([...eventGroupList, ...eventGroup]));
    }

    log4js.debug(`HowWords:${hotWords.length} EventGroupList: ${eventGroupList.length}`)

    return {HotWords: hotWords, EventGroupList: eventGroupList}
}

/**
 * find all EventGroup
 * @returns {Promise<{HotWords: *[], EventGroupList: Query<Omit<Omit<any, never>, never>[], any, {}, any> | *[]}|{HotWords: *[], EventGroupList: *[]}>}
 */
async function retrieveEventGroup() {
    let hotWords = []
    let eventGroupList = []
    //Get the data of the eventGroupProperty where the category exists
    const eventGroupPropertyList = await retrieveEventGroupPropertyList()
        .catch((err) => {
            log4js.error(`EventGroup.router.get..V2/eventGroup/recommend , retrieveEventGroupPropertyList:${err}`);
        })
    //Returns data not found if the eventGroupPropertyList does not have data
    if (eventGroupPropertyList.length <= 0) {
        log4js.debug(`EventGroup.router.get.V2/eventGroup/recommend/ does have EventGroupProperty Data`)
        return {HotWords: hotWords, EventGroupList: eventGroupList};
    }
    //Iterate through the eventGroupPropertyList to get the data of the eventGroup
    for (const eventGroupProperty of eventGroupPropertyList) {
        //Merge the hotWords data in each eventGroupProperty
        hotWords = Array.from(new Set([...hotWords, ...eventGroupProperty.hotWords]));
    }

    //Get all eventGroupList data
    eventGroupList = await retrieveEventGroupList().catch((err) => {
        log4js.error(`EventGroup.router.get..V2/eventGroup/recommend , retrieveEventGroupList: ${err}`);
    });
    log4js.debug(`HowWords:${hotWords.length} EventGroupList: ${eventGroupList.length}`)
    return {HotWords: hotWords, EventGroupList: eventGroupList}
}

/**
 * find EventGroup By Category AND Query
 * @param category
 * @param query
 * @param count
 * @returns {Promise<{HotWords: [], EventGroupList: []}|{HotWords: *[], EventGroupList: *[]}|{HotWords: *[], EventGroupList: *[]}|null|{HotWords: [], EventGroupList: []}>}
 */
async function retrieveEventGroupByCategoryANDQuery(category, query, count) {
    let hotWords = []
    let eventGroupList = []
    if (!category && !query) {
        return await retrieveEventGroupByCount(count);
    }
    //Find only category No query
    if (category && !query) {
        return await retrieveEventGroupByCategory(category, count)
    }
    //Find only query No category
    if (query && !category) {
        return await queryEventGroupByCount(query, count);
    }
    if (category && query) {
        const queryEventGroupList = await retrieveEventGroupByEventTitle(query);
        if (queryEventGroupList.length <= 0) {
            return null
        }
        log4js.debug(`category:${category} query:${query} search eventGroupList:${queryEventGroupList.length}`)
        for (const eventGroup of queryEventGroupList) {
            const eventGroupProperties = eventGroup.property;
            for (const eventGroupProperty of eventGroupProperties) {
                if (eventGroupProperty.category === category.toLowerCase() && eventGroupList.length < count) {
                    hotWords = Array.from(new Set([...hotWords, ...eventGroupProperty.hotWords]));
                    eventGroupList.push(eventGroup)
                }
            }
        }
    }
    log4js.debug(`query:${query} search eventGroupList: ${eventGroupList.length} and hotWords: ${hotWords.length}`)
    return {HotWords: hotWords, EventGroupList: eventGroupList};
}

/**
 * find EventGroup By Count
 * @param count
 * @returns {Promise<{HotWords: *[], EventGroupList: *[]}>}
 */
async function retrieveEventGroupByCount(count) {
    let hotWords = [];
    let eventGroupList = [];
    const queryEventGroupList = await retrieveEventGroupList(count).catch((err) => {
        log4js.error(`EventGroup.router.Post..V2/eventGroup/recommend , retrieveEventGroupList: ${err}`);
    });
    for (const eventGroup of queryEventGroupList) {
        //Merge the hotWords data in each eventGroupProperty
        const eventGroupProperties = eventGroup.property;
        for (const eventGroupProperty of eventGroupProperties) {
            hotWords = Array.from(new Set([...hotWords, ...eventGroupProperty.hotWords]));
            eventGroupList = queryEventGroupList;
        }
    }
    log4js.debug(`retrieveEventGroupByCount: eventGroupList: ${eventGroupList.length} and hotWords: ${hotWords.length}`)
    return {HotWords: hotWords, EventGroupList: eventGroupList};
}

/**
 * search EventGroup By query and return limit by Count
 * @param query
 * @param count
 * @returns {Promise<{HotWords: *[], EventGroupList: *[]}|null>}
 */
async function queryEventGroupByCount(query, count) {
    let hotWords = [];
    let eventGroupList = [];
    const queryEventGroupList = await retrieveEventGroupByEventTitle(query, count);
    if (queryEventGroupList.length <= 0) {
        return null
    }
    log4js.debug(`query:${query} search eventGroupList:${queryEventGroupList.length}`)
    for (const eventGroup of queryEventGroupList) {
        //Merge the hotWords data in each eventGroupProperty
        const eventGroupProperties = eventGroup.property;
        for (const eventGroupProperty of eventGroupProperties) {
            hotWords = Array.from(new Set([...hotWords, ...eventGroupProperty.hotWords]));
            eventGroupList = queryEventGroupList;
        }
    }
    log4js.debug(`query:  ${query} search eventGroupList: ${eventGroupList.length} and hotWords: ${hotWords.length}`)
    return {HotWords: hotWords, EventGroupList: eventGroupList};
}

export {
    retrieveEventGroupByCategory, retrieveEventGroup, retrieveEventGroupByCategoryANDQuery
}
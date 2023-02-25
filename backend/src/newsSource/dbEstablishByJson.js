import mongoose from 'mongoose';

const log4js = require("../utils/log4js")


// DB schemas
import {Article} from '../event/domain/Article';
import {ArticleProperty} from '../event/domain/ArticleProperty';
import {NewsEvent} from '../event/domain/Event';
import {EventGroupProperty} from '../eventGroup/domain/EventGroupProperty';
import {EventGroup} from '../eventGroup/domain/EventGroup';

// JSON files to establish database
import articleproperties from '../../dbExport/articleproperties.json';
import articles from '../../dbExport/articles.json';
import eventgroupproperties from '../../dbExport/eventgroupproperties.json';
import eventgroups from '../../dbExport/eventgroups.json';
import newsevents from '../../dbExport/newsevents.json';

async function dbEstablishByJson(){
    
    // Extablish DB Connection
    // await mongoose.connect('mongodb://localhost:27017/dragonFish');
    // log4js.info('[dbEstablishByJson] Connected to database!');

    // Clean the contents in the DB
    log4js.info('[dbEstablishByJson] Clean database');
    await clearDatabase();

    // Feeding Database by JSON
    log4js.info('[dbEstablishByJson] Import articles by json');
    await addArticle();

    log4js.info('[dbEstablishByJson] Import articles properties by json')
    await addArticleProperty();

    log4js.info('[dbEstablishByJson] Import news events by json')
    await addNewsEvents();

    log4js.info('[dbEstablishByJson] Import event groups by json')
    await addEventGroups();

    log4js.info('[dbEstablishByJson] Import event groups properties by json')
    await addEventGroupProperty();
}

async function clearDatabase() {

    const eventGroupDeleted = await EventGroup.deleteMany({});
    const eventGroupPropertyDeleted = await EventGroupProperty.deleteMany({});
    const newsEventDeleted = await NewsEvent.deleteMany({});
    const articlesDeleted = await Article.deleteMany({});
    const articlesPropsDeleted = await ArticleProperty.deleteMany({});
    
    log4js.info(`[clearDatabase] Cleared database (removed ${eventGroupDeleted.deletedCount}).`);
    log4js.info(`[clearDatabase] Cleared database (removed ${eventGroupPropertyDeleted.deletedCount}).`);
    log4js.info(`[clearDatabase] Cleared database (removed ${newsEventDeleted.deletedCount}).`);
    log4js.info(`[clearDatabase] Cleared database (removed ${articlesDeleted.deletedCount}).`);
    log4js.info(`[clearDatabase] Cleared database (removed ${articlesPropsDeleted.deletedCount}).`);

    return ({
        eventGroup: eventGroupDeleted.deletedCount,
        eventGroupProperty: eventGroupPropertyDeleted.deletedCount,
        newsEvent: newsEventDeleted.deletedCount,
        articles: articlesDeleted.deletedCount,
        articlesProps: articlesPropsDeleted.deletedCount
    })


}

async function addArticle() {


    let addArticleCount = 0;

    for (let article of articles) {

        const addArticle = new Article();
        addArticle._id = article._id.$oid;
        addArticle.title = article.title;
        addArticle.authors = article.authors;
        addArticle.description = article.description;
        addArticle.publish = new Date(article.publish.$date);
        addArticle.content = article.content;
        addArticle.image = article.image;

        if (await addArticle.save()) addArticleCount += 1;
        else {
            log4js.error(`[addArticle] Article id ${article._id.$oid} adding error`)
        }
    }

    log4js.debug(`[addArticle] Given ${articles.length} articles from json file`)
    log4js.debug(`[addArticle] Success add ${addArticleCount} articles to the Database`)
    
    return addArticleCount;
}

async function addArticleProperty() {


    let addArticlePropertyCount = 0;

    for (let articleProp of articleproperties) {

        const addArticleProps = new ArticleProperty();
        addArticleProps._id = articleProp._id.$oid;
        addArticleProps.language = articleProp.language;
        addArticleProps.region = articleProp.region;
        addArticleProps.originalUrl = articleProp.originalUrl;
        addArticleProps.tags = articleProp.tags;

        if (await addArticleProps.save()) addArticlePropertyCount += 1;
        else {
            log4js.error(`[addArticleProperty] ArticleProp id ${addArticleProp._id.$oid} adding error`)
        }
    }

    log4js.debug(`[addArticleProperty] Given ${articleproperties.length} articles properties from json file`)
    log4js.debug(`[addArticleProperty] Success add ${addArticlePropertyCount} articles properties to the Database`)
    return addArticlePropertyCount;
}

async function addNewsEvents() {


    let addNewsEventsCount = 0;

    for (let newsEvent of newsevents) {

        const addNewsEvent = new NewsEvent();
        addNewsEvent._id = newsEvent._id.$oid;
        addNewsEvent.property = newsEvent.property.$oid;
        addNewsEvent.article = newsEvent.article.$oid;

        if (await addNewsEvent.save()) addNewsEventsCount += 1;
        else {
            log4js.error(`[addNewsEvents] NewsEvent id ${newsEvent._id.$oid} adding error`)
        }
    }

    log4js.debug(`[addNewsEvents] Given ${newsevents.length} news events from json file`)
    log4js.debug(`[addNewsEvents] Success add ${addNewsEventsCount} news events to the Database`)
    return addNewsEventsCount;
}

async function addEventGroups() {

    let addEventGroupCount = 0;

    for (let eventGroup of eventgroups) {

        const articlesIDList = [];

        for (let articlesID of eventGroup.articles) {
            articlesIDList.push(articlesID.$oid)
        }

        const addEventGroup = new EventGroup();
        addEventGroup._id = eventGroup._id.$oid;
        addEventGroup.eventTitle = eventGroup.eventTitle;
        addEventGroup.image = eventGroup.image;
        addEventGroup.publish = new Date(eventGroup.publish.$date);
        addEventGroup.description = eventGroup.description;
        addEventGroup.property = eventGroup.property[0].$oid;
        addEventGroup.articles = articlesIDList;


        if (await addEventGroup.save()) addEventGroupCount += 1;
        else {
            log4js.error(`[addEventGroups] Event group id ${eventGroup._id.$oid} adding error`)
        }
    }

    log4js.debug(`[addEventGroups] Given ${eventgroups.length} event groups from json file`)
    log4js.debug(`[addEventGroups] Success add ${addEventGroupCount} event groups to the Database`)
    return addEventGroupCount;
}

async function addEventGroupProperty() {

    let addEventGroupPropertyCount = 0;

    for (let eventGroupProperty of eventgroupproperties) {

        const addEventGroupProps = new EventGroupProperty();
        addEventGroupProps._id = eventGroupProperty._id.$oid;
        addEventGroupProps.hotWords = eventGroupProperty.hotWords;
        addEventGroupProps.category = eventGroupProperty.category;


        if (await addEventGroupProps.save()) addEventGroupPropertyCount += 1;
        else {
            log4js.error(`[addEventGroupProperty] EventGroupProps id ${eventGroupProperty._id.$oid} adding error`)
        }
    }

    log4js.debug(`[addEventGroupProperty] Given ${eventgroupproperties.length} event group properties from json file`)
    log4js.debug(`[addEventGroupProperty] Success add ${addEventGroupPropertyCount} event group properties to the Database`)
    return addEventGroupPropertyCount;
}

export {dbEstablishByJson, clearDatabase,addArticle,addArticleProperty,
        addNewsEvents,addEventGroups,addEventGroupProperty};
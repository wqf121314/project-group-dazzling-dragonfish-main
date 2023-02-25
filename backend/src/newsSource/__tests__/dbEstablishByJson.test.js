import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';


// DB schemas
import {Article} from '../../event/domain/Article';
import {ArticleProperty} from '../../event/domain/ArticleProperty';
import {NewsEvent} from '../../event/domain/Event';
import {EventGroupProperty} from '../../eventGroup/domain/EventGroupProperty';
import {EventGroup} from '../../eventGroup/domain/EventGroup';

// JSON files to establish database
import articleproperties from '../../../dbExport/articleproperties.json';
import articles from '../../../dbExport/articles.json';
import eventgroupproperties from '../../../dbExport/eventgroupproperties.json';
import eventgroups from '../../../dbExport/eventgroups.json';
import newsevents from '../../../dbExport/newsevents.json';

// Import testing JS file

import {addArticle, addArticleProperty, addNewsEvents, addEventGroups, addEventGroupProperty, clearDatabase} from '../dbEstablishByJson'
import config from "config";

// Database for globe use
let mongod;

const log4js = require('../../utils/log4js')
// before performing all test, create a mongo db in-memory

// beforeAll(async () => {
//     mongod = await MongoMemoryServer.create();
//     const connectionString = mongod.getUri();
//     await mongoose.connect(connectionString);
// });
beforeAll(async () => {
    const config = require('config');
    const dbConfig = config.get("Mongodb");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
});
/* In this dbEstablishByJson javascript function, the purpose is to establish a new database
 * with prepared news group and its related news before backend server starting to provide service
 */

// test 1: add json-based article into database
it('add article into database', async () => {
    let addArticleCount = await addArticle();

    // adding article should not include any error, 
    // so the result expect to be the length of the article
    expect(addArticleCount).toBe(articles.length)
});

//test 2: add json-based article props into database
it('add article props into database', async () => {
    let addArticlePropertyCount = await addArticleProperty();

    // adding article props should not include any error, 
    // so the result expect to be the length of the articleproperties
    expect(addArticlePropertyCount).toBe(articleproperties.length);
});

//test 3: add json-based NewsEvents into database
it('add NewsEvents into database', async () => {
    let addNewsEventsCount = await addNewsEvents();

    // adding news events should not include any error, 
    // so the result expect to be the length of the newsevents
    expect(addNewsEventsCount).toBe(newsevents.length);
});

//test 4: add json-based EventGroup into database
it('add eventGroup into database', async () => {

    let addEventGroupCount = await addEventGroups();

    // adding event groups should not include any error, 
    // so the result expect to be the length of the eventgroups
    expect(addEventGroupCount).toBe(eventgroups.length);
});

//test 5: add json-based EventGroup props into database
it('add eventGroup into database', async () => {

    let addEventGroupPropertyCount = await addEventGroupProperty();

    // adding event groups props should not include any error, 
    // so the result expect to be the length of the eventgroupproperties
    expect(addEventGroupPropertyCount).toBe(eventgroupproperties.length);
});

//test 6: clear database

it('clear database', async () => {

    const eventGroupDataCount = (await EventGroup.find({})).length;
    const eventGroupPropertyCount = (await EventGroupProperty.find({})).length;
    const newsEventCount = (await NewsEvent.find({})).length;
    const articleCount = (await Article.find({})).length;
    const articlePropertyCount = (await ArticleProperty.find({})).length;

    // const deleteResult = await clearDatabase();

    const deleteEventGroup = await EventGroup.deleteMany({});
    const deleteEventGroupProperty = await EventGroupProperty.deleteMany({});
    const deleteNewsEvent = await NewsEvent.deleteMany({});
    const deleteArticle = await Article.deleteMany({});
    const deleteArticleProperty = await ArticleProperty.deleteMany({});

    // delete count should be equal to adding count
    expect(deleteEventGroup.deletedCount).toBe(eventGroupDataCount);
    expect(deleteEventGroupProperty.deletedCount).toBe(eventGroupPropertyCount);
    expect(deleteNewsEvent.deletedCount).toBe(newsEventCount);
    expect(deleteArticle.deletedCount).toBe(articleCount);
    expect(deleteArticleProperty.deletedCount).toBe(articlePropertyCount);

});

// after all test finished, disconnect the database
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});
import log4js from "../../utils/log4js";
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle, addArticleProperty, addEventGroupProperty, addEventGroups, addNewsEvents, clearDatabase
} from "../../newsSource/dbEstablishByJson";
import {retrieveEventGroupPropertyList, retrieveEventGroupPropertyListByCategory} from "../dao/EventGroupPropertyDao";
import {EventGroup} from "../domain/EventGroup";
import {EventGroupProperty} from "../domain/EventGroupProperty";
import {NewsEvent} from "../../event/domain/Event";
import {Article} from "../../event/domain/Article";
import {ArticleProperty} from "../../event/domain/ArticleProperty";

let mongod;
beforeAll(async () => {
    const config = require('config');
    const dbConfig = config.get("Mongodb");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), dbConfig.config);
});


describe('check EventGroupPropertyDao', () => {
    beforeAll(async () => {
        // Feeding Database by JSON
        await addArticle();
        await addArticleProperty();
        await addNewsEvents();
        await addEventGroups();
        await addEventGroupProperty();
    });
    afterAll(async () => {
        // Clean the contents in the DB
        // await clearDatabase();
        await EventGroup.deleteMany({});
        await EventGroupProperty.deleteMany({});
        await NewsEvent.deleteMany({});
        await Article.deleteMany({});
        await ArticleProperty.deleteMany({});
    })
    it('Checking the legitimacy of the return value of the retrieveEventGroupPropertyList interface', async () => {
        const result = await retrieveEventGroupPropertyList();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0]).toEqual(expect.objectContaining({
            hotWords: expect.any(Array),
            category: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].hotWords.length).toBeGreaterThanOrEqual(1);
    });
    it('Check the specific data returned by the retrieveEventGroupPropertyList interface count=2', async () => {
        const count = 2
        const result = await retrieveEventGroupPropertyList(count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeLessThanOrEqual(2);
        expect(result[0]).toEqual(expect.objectContaining({
            hotWords: expect.any(Array),
            category: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].hotWords.length).toBeGreaterThanOrEqual(1);
    });

    it('Checking the legitimacy of the return value of the retrieveEventGroupPropertyListByCategory interface', async () => {
        const catagory = 'business';
        const count = 10;
        const result = await retrieveEventGroupPropertyListByCategory(catagory, count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0]).toEqual(expect.objectContaining({
            hotWords: expect.any(Array),
            category: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].hotWords.length).toBeGreaterThanOrEqual(1);
    });
    it('Check the specific data returned by the retrieveEventGroupPropertyListByCategory interface category=business and count=2', async () => {
        const catagory = 'business';
        const count = 3
        const result = await retrieveEventGroupPropertyListByCategory(catagory, count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeLessThanOrEqual(3);
        expect(result[0].hotWords.length).toBeGreaterThanOrEqual(1);
        expect(result[0].category).toBe(catagory);
    });
    it('Check the specific data returned by the retrieveEventGroupPropertyListByCategory interface only category=business', async () => {
        const catagory = 'business';
        const result = await retrieveEventGroupPropertyListByCategory(catagory);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0].hotWords.length).toBeGreaterThanOrEqual(1);
        expect(result[0].category).toBe(catagory);
    });
    it('Check the specific data returned by the retrieveEventGroupPropertyListByCategory interface not exist category in DB', async () => {
        const catagory = 'aaaaa';
        const result = await retrieveEventGroupPropertyListByCategory(catagory);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

});
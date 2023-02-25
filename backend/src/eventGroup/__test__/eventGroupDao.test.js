import log4js from "../../utils/log4js";
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle, addArticleProperty, addEventGroupProperty, addEventGroups, addNewsEvents, clearDatabase
} from "../../newsSource/dbEstablishByJson";
import {
    retrieveEventGroupByEventTitle, retrieveEventGroupById, retrieveEventGroupByPropertyId, retrieveEventGroupList
} from "../dao/EventGroupDao";
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

describe('check EventGroupDao', () => {
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
    it('Checking the legitimacy of the return value of the retrieveEventGroupList interface', async () => {
        const result = await retrieveEventGroupList();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].articles.length).toBeGreaterThanOrEqual(1);

        expect(result[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object), createdAt: expect.any(Date), updatedAt: expect.any(Date)
        }))
        const article = result[0].articles[0].article;
        // log4js.error(`${JSON.stringify(article)}`)
        expect(article).toEqual(expect.objectContaining({
            authors: expect.any(Array),
            content: expect.any(Array),
            image: expect.any(Array),
            title: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        expect(article.authors.length).toBeGreaterThanOrEqual(1);
        expect(article.content.length).toBeGreaterThanOrEqual(1);
        expect(article.image.length).toBeGreaterThanOrEqual(1);

    });
    it('Checking the legitimacy of the return value of the retrieveEventGroupList interface count=2', async () => {
        const count = 2;
        const result = await retrieveEventGroupList(count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeLessThanOrEqual(2);
        expect(result[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].articles.length).toBeGreaterThanOrEqual(1);

        expect(result[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object), createdAt: expect.any(Date), updatedAt: expect.any(Date)
        }))
        const article = result[0].articles[0].article;
        // log4js.error(`${JSON.stringify(article)}`)
        expect(article).toEqual(expect.objectContaining({
            authors: expect.any(Array),
            content: expect.any(Array),
            image: expect.any(Array),
            title: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        expect(article.authors.length).toBeGreaterThanOrEqual(1);
        expect(article.content.length).toBeGreaterThanOrEqual(1);
        expect(article.image.length).toBeGreaterThanOrEqual(1);

    });
    it('Checking the legitimacy of the return value of the retrieveEventGroupList interface count=999', async () => {
        const count = 999;
        const result = await retrieveEventGroupList(count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeLessThanOrEqual(999);
        expect(result[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].articles.length).toBeGreaterThanOrEqual(1);

        expect(result[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object), createdAt: expect.any(Date), updatedAt: expect.any(Date)
        }))
        const article = result[0].articles[0].article;
        // log4js.error(`${JSON.stringify(article)}`)
        expect(article).toEqual(expect.objectContaining({
            authors: expect.any(Array),
            content: expect.any(Array),
            image: expect.any(Array),
            title: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        expect(article.authors.length).toBeGreaterThanOrEqual(1);
        expect(article.content.length).toBeGreaterThanOrEqual(1);
        expect(article.image.length).toBeGreaterThanOrEqual(1);

    });

    it('Checking the legitimacy of the return value of the retrieveEventGroupById interface', async () => {
        const id = '6270c7ad9d6c21966db7ee48';
        const result = await retrieveEventGroupById(id);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result.articles.length).toBeGreaterThanOrEqual(1);

        expect(result.articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object), createdAt: expect.any(Date), updatedAt: expect.any(Date)
        }))
        const article = result.articles[0].article;
        // // log4js.error(`${JSON.stringify(article)}`)
        expect(article).toEqual(expect.objectContaining({
            authors: expect.any(Array),
            content: expect.any(Array),
            image: expect.any(Array),
            title: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        //
        expect(article.authors.length).toBeGreaterThanOrEqual(1);
        expect(article.content.length).toBeGreaterThanOrEqual(1);
        expect(article.image.length).toBeGreaterThanOrEqual(1);

        expect(result.property[0]).toEqual(expect.objectContaining({
            hotWords: expect.any(Array),
            category: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result.property[0].hotWords.length).toBeGreaterThanOrEqual(1);


    });
    it('Check the specific data returned by the retrieveEventGroupByCategory interface', async () => {
        const id = '6270c7ad9d6c21966db7ee48';
        const result = await retrieveEventGroupById(id);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result._id.toString()).toBe("6270c7ad9d6c21966db7ee48");
        expect(result.articles[0]._id.toString()).toBe("6270c7ad9d6c21966db7ee3f");
        expect(result.articles[0]._id.toString()).toBe("6270c7ad9d6c21966db7ee3f");
        expect(result.property[0]._id.toString()).toBe("6270c7ad9d6c21966db7ee47");
        expect(result.property[0].category).toBe("health");
    });

    it('Checking the legitimacy of the return value of the retrieveEventGroupByEventTitle interface', async () => {
        const title = 'a';
        const count = 2;
        const result = await retrieveEventGroupByEventTitle(title, count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].articles.length).toBeGreaterThanOrEqual(1);

        expect(result[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object), createdAt: expect.any(Date), updatedAt: expect.any(Date)
        }))
        const article = result[0].articles[0].article;
        // log4js.error(`${JSON.stringify(article)}`)
        expect(article).toEqual(expect.objectContaining({
            authors: expect.any(Array),
            content: expect.any(Array),
            image: expect.any(Array),
            title: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        expect(article.authors.length).toBeGreaterThanOrEqual(1);
        expect(article.content.length).toBeGreaterThanOrEqual(1);
        expect(article.image.length).toBeGreaterThanOrEqual(1);
    });
    it('Checking the legitimacy of the return value of the retrieveEventGroupByEventTitle interface not exist data', async () => {
        const title = 'aaaaaaa';
        const count = 2;
        const result = await retrieveEventGroupByEventTitle(title, count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('Checking the legitimacy of the return value of the retrieveEventGroupByPropertyId interface', async () => {
        const id = '6270c7ad9d6c21966db7ee47';
        const result = await retrieveEventGroupByPropertyId(id);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].articles.length).toBeGreaterThanOrEqual(1);

        expect(result[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object), createdAt: expect.any(Date), updatedAt: expect.any(Date)
        }))
        const article = result[0].articles[0].article;
        // log4js.error(`${JSON.stringify(article)}`)
        expect(article).toEqual(expect.objectContaining({
            authors: expect.any(Array),
            content: expect.any(Array),
            image: expect.any(Array),
            title: expect.any(String),
            description: expect.any(String),
            publish: expect.any(Date),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        expect(article.authors.length).toBeGreaterThanOrEqual(1);
        expect(article.content.length).toBeGreaterThanOrEqual(1);
        expect(article.image.length).toBeGreaterThanOrEqual(1);

        expect(result[0].property[0]).toEqual(expect.objectContaining({
            hotWords: expect.any(Array),
            category: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].property[0].hotWords.length).toBeGreaterThanOrEqual(1);
    });
    it('Check the specific data returned by the retrieveEventGroupByPropertyId interface', async () => {
        const id = '6270c7ad9d6c21966db7ee47';
        const result = await retrieveEventGroupByPropertyId(id);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result[0]._id.toString()).toBe("6270c7ad9d6c21966db7ee48");
        expect(result[0].articles[0]._id.toString()).toBe("6270c7ad9d6c21966db7ee3f");
        expect(result[0].property[0]._id.toString()).toBe("6270c7ad9d6c21966db7ee47");
        expect(result[0].property[0].category).toBe("health");
    });
    it('Checking the legitimacy of the return value of the retrieveEventGroupByPropertyId interface not exist data', async () => {
        const result = await retrieveEventGroupByPropertyId(null);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });

});
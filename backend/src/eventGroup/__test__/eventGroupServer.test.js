import log4js from "../../utils/log4js";
import {
    retrieveEventGroup, retrieveEventGroupByCategory, retrieveEventGroupByCategoryANDQuery
} from "../server/EventGroupServer";
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle, addArticleProperty, addEventGroupProperty, addEventGroups, addNewsEvents, clearDatabase
} from "../../newsSource/dbEstablishByJson";
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

describe('check EventGroupServer', () => {
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

    it('Checking the retrieveEventGroupByCategory interface for non-existent category ', async () => {
        const result = await retrieveEventGroupByCategory('', 0);
        expect(result).toBe(null)
    });
    it('Checking the legitimacy of the return value of the retrieveEventGroupByCategory interface', async () => {
        const result = await retrieveEventGroupByCategory('business', 10);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            HotWords: expect.any(Array), EventGroupList: expect.any(Array)
        }));
        expect(result.HotWords.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            publish: expect.any(Date),
            description: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }));
        expect(result.EventGroupList[0].articles.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        const article = result.EventGroupList[0].articles[0].article;
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

    it('Checking the legitimacy of the return value of the retrieveEventGroup interface', async () => {
        const result = await retrieveEventGroup();
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            HotWords: expect.any(Array), EventGroupList: expect.any(Array)
        }));
        expect(result.HotWords.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            publish: expect.any(Date),
            description: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }));
        expect(result.EventGroupList[0].articles.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        const article = result.EventGroupList[0].articles[0].article;
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

    it('Checking the legitimacy of the return value of the retrieveEventGroupByCategoryANDQuery interface', async () => {
        const category = 'business'
        const query = 'a'
        const count = 2
        const result = await retrieveEventGroupByCategoryANDQuery(category, query, count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            HotWords: expect.any(Array), EventGroupList: expect.any(Array)
        }));
        expect(result.HotWords.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            publish: expect.any(Date),
            description: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }));
        expect(result.EventGroupList[0].articles.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        const article = result.EventGroupList[0].articles[0].article;
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
    it('Checking the legitimacy of the return value of the retrieveEventGroupByCategoryANDQuery interface only category and count', async () => {
        const category = 'business'
        const count = 2
        const result = await retrieveEventGroupByCategoryANDQuery(category, null, count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            HotWords: expect.any(Array), EventGroupList: expect.any(Array)
        }));
        expect(result.HotWords.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            publish: expect.any(Date),
            description: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }));
        expect(result.EventGroupList[0].articles.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        const article = result.EventGroupList[0].articles[0].article;
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
    it('Checking the legitimacy of the return value of the retrieveEventGroupByCategoryANDQuery interface not exist category', async () => {
        const category = 'aaa'
        const count = 1
        const result = await retrieveEventGroupByCategoryANDQuery(category, null, count);
        expect(result).toBe(null)
    });
    it('Checking the legitimacy of the return value of the retrieveEventGroupByCategoryANDQuery interface only query and count', async () => {
        const query = 'a'
        const count = 2
        const result = await retrieveEventGroupByCategoryANDQuery(null, query, count);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            HotWords: expect.any(Array), EventGroupList: expect.any(Array)
        }));
        expect(result.HotWords.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            eventTitle: expect.any(String),
            image: expect.any(String),
            publish: expect.any(Date),
            description: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }));
        expect(result.EventGroupList[0].articles.length).toBeGreaterThanOrEqual(1);
        expect(result.EventGroupList[0].articles[0]).toEqual(expect.objectContaining({
            article: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        const article = result.EventGroupList[0].articles[0].article;
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
    it('Checking the legitimacy of the return value of the retrieveEventGroupByCategoryANDQuery interface not exist query words', async () => {
        const query = 'aaa'
        const count = 1
        const result = await retrieveEventGroupByCategoryANDQuery(null, query, count);
        expect(result).toBe(null)
    });
});



import log4js from "../../utils/log4js";
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle, addArticleProperty, addEventGroupProperty, addEventGroups, addNewsEvents, clearDatabase
} from "../../newsSource/dbEstablishByJson";

import {retrieveEvent, retrieveEventList} from "../dao/EventDao";
import {EventGroup} from "../../eventGroup/domain/EventGroup";
import {EventGroupProperty} from "../../eventGroup/domain/EventGroupProperty";
import {NewsEvent} from "../domain/Event";
import {Article} from "../domain/Article";
import {ArticleProperty} from "../domain/ArticleProperty";

let mongod;
beforeAll(async () => {
    const config = require('config');
    const dbConfig = config.get("Mongodb");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), dbConfig.config);
});

describe('check EventDao', () => {
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

    it('Checking the legitimacy of the return value of the retrieveEventList interface', async () => {
        const result = await retrieveEventList();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0]).toEqual(expect.objectContaining({
            article: expect.any(Object),
            property: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        const article = result[0].article;
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
        //
        expect(article.authors.length).toBeGreaterThanOrEqual(1);
        expect(article.content.length).toBeGreaterThanOrEqual(1);
        expect(article.image.length).toBeGreaterThanOrEqual(1);

        const property = result[0].property;
        // log4js.error(`${JSON.stringify(property)}`)
        expect(property).toEqual(expect.objectContaining({
            tags: expect.any(Array),
            language: expect.any(String),
            region: expect.any(String),
            originalUrl: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

    });

    it('Checking the legitimacy of the return value of the retrieveEvent interface', async () => {
        const id = '626e1602cd287f48e273abe5'
        const result = await retrieveEvent(id);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result).toEqual(expect.objectContaining({
            article: expect.any(Object),
            property: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        const article = result.article;
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

        const property = result.property;
        // log4js.error(`${JSON.stringify(property)}`)
        expect(property).toEqual(expect.objectContaining({
            tags: expect.any(Array),
            language: expect.any(String),
            region: expect.any(String),
            originalUrl: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        expect(property.tags.length).toBeGreaterThanOrEqual(1);

    });
    it('Checking the legitimacy of the return value of the retrieveEvent interface no parameters', async () => {
        const result = await retrieveEvent(null);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result).toBe(null)
    });
    it('Check the specific data returned by the retrieveEventGroupByCategory interface', async () => {
        const id = '626e1602cd287f48e273abe5'
        const result = await retrieveEvent(id);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result._id.toString()).toBe(id);
        expect(result._id.toString()).toBe(id);
        expect(result.property._id.toString()).toBe('626e1602cd287f48e273abe3');
        expect(result.property.tags.length).toBe(2);
        expect(result.article._id.toString()).toBe('626e1602cd287f48e273abe1');
    });
});
import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle,
    addArticleProperty, addEventGroupProperty,
    addEventGroups,
    addNewsEvents,
    clearDatabase
} from "../../newsSource/dbEstablishByJson";
import log4js from "../../utils/log4js";
import {ArticleProperty} from "../domain/ArticleProperty";
import {Article} from "../domain/Article";
import {EventGroup} from "../../eventGroup/domain/EventGroup";
import {EventGroupProperty} from "../../eventGroup/domain/EventGroupProperty";
import {NewsEvent} from "../domain/Event";


let mongod;
beforeAll(async () => {
    const config = require('config');
    const dbConfig = config.get("Mongodb");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), dbConfig.config);
});
let property1 = {
    language: "English",
    region: "UK",
    originalUrl: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
    source: "This is property1",
    tags: ['propert1', 'propert', 'propert3']
}
let property2 = {
    language: "Chinese",
    region: "China",
    originalUrl: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
    source: "This is property2",
    tags: ['AAA', 'bb']
}


describe('check articleProperty Schema', () => {
    beforeEach(async () => {
        // Clean the contents in the DB
        // await clearDatabase();
        await EventGroup.deleteMany({});
        await EventGroupProperty.deleteMany({});
        await NewsEvent.deleteMany({});
        await Article.deleteMany({});
        await ArticleProperty.deleteMany({});
    })
    it('add ArticleProperty', async () => {
        const dbArticleProperty = new ArticleProperty(property1);
        const result = await dbArticleProperty.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            language: expect.any(String),
            region: expect.any(String),
            source: expect.any(String),
            originalUrl: expect.any(String),
            tags: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        //
        expect(result._id).toBeDefined();
        expect(result.language).toBe(property1.language);
        expect(result.source).toBe(property1.source);
        expect(result.tags.length).toBe(property1.tags.length);
    })
    it('add Empty ArticleProperty', async () => {
        const dbArticleProperty = new ArticleProperty();
        const result = await dbArticleProperty.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            tags: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
    it('Adding many ArticleProperty', async () => {
        const result = await ArticleProperty.insertMany([property1, property2])
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(expect.objectContaining({
            language: expect.any(String),
            region: expect.any(String),
            source: expect.any(String),
            originalUrl: expect.any(String),
            tags: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    });

    it('find ArticleProperty', async () => {
        await ArticleProperty.insertMany([property1, property2])
        const result = await ArticleProperty.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(2);
        expect(result[0]).toEqual(expect.objectContaining({
            language: expect.any(String),
            region: expect.any(String),
            source: expect.any(String),
            originalUrl: expect.any(String),
            tags: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
    it('find null ArticleProperty', async () => {
        const result = await ArticleProperty.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(0);
    })
    it('delete one ArticleProperty', async () => {
        const articlePropertyDB = await ArticleProperty.insertMany([property1, property2])
        const result = await ArticleProperty.deleteOne(articlePropertyDB[0]);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.deletedCount).toBe(1);
    })
    it('update ArticleProperty', async () => {
        await ArticleProperty.insertMany([property1, property2])
        const articlePropertyDB = await ArticleProperty.find();
        const updateArticleProperty = articlePropertyDB[0];
        updateArticleProperty.language = "update";

        const result = await ArticleProperty.updateOne(updateArticleProperty)
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.modifiedCount).toBe(1);
        expect(result.matchedCount).toBe(1);

        const updatedArticleProperty = await ArticleProperty.findById(updateArticleProperty._id);
        // log4js.error(`${JSON.stringify(updatedArticle)}`)
        expect(updatedArticleProperty).toBeDefined();
        expect(updatedArticleProperty.language).toBe("update");
        expect(updatedArticleProperty).toEqual(expect.objectContaining({
            language: expect.any(String),
            region: expect.any(String),
            source: expect.any(String),
            originalUrl: expect.any(String),
            tags: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
})
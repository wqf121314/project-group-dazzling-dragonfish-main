import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle,
    addArticleProperty, addEventGroupProperty,
    addEventGroups,
    addNewsEvents,
    clearDatabase
} from "../../newsSource/dbEstablishByJson";
import {Article} from '../domain/Article';
import log4js from "../../utils/log4js";
import {EventGroup} from "../../eventGroup/domain/EventGroup";
import {EventGroupProperty} from "../../eventGroup/domain/EventGroupProperty";
import {NewsEvent} from "../domain/Event";
import {ArticleProperty} from "../domain/ArticleProperty";


let mongod;
beforeAll(async () => {
    const config = require('config');
    const dbConfig = config.get("Mongodb");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), dbConfig.config);
});
let article1 = {
    authors: ["author1", "author2"],
    content: ["This is content line 1", "This is content line 2", "This is content line 3", "This is content line 4"],
    image: ["https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1"],
    title: "This is article1 title",
    description: "this is article1 description",
    publish: new Date()
}
let article2 = {
    authors: ["author1", "author2"],
    content: ["This is content line 1", "This is content line 2", "This is content line 3"],
    image: ["https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1"],
    title: "This is article2 title",
    description: "this is article2 description",
    publish: new Date()
}
let article3 = {
    authors: ["author1", "author2"],
    content: ["This is content line 1"],
    image: ["https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1"],
    title: "This is article3 title",
    description: "this is article3 description",
    publish: new Date()
}


describe('check article Schema', () => {
    beforeEach(async () => {
        // Clean the contents in the DB
        // await clearDatabase();
        await EventGroup.deleteMany({});
        await EventGroupProperty.deleteMany({});
        await NewsEvent.deleteMany({});
        await Article.deleteMany({});
        await ArticleProperty.deleteMany({});
    })
    it('add article', async () => {
        const dbArticle = new Article(article1);
        const result = await dbArticle.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            title: expect.any(String),
            authors: expect.any(Array),
            description: expect.any(String),
            publish: expect.any(Date),
            content: expect.any(Array),
            image: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        expect(result._id).toBeDefined();
        expect(result.title).toBe(article1.title);
        expect(result.content.length).toBe(article1.content.length);
    })

    it('add Empty article', async () => {
        const dbArticle = new Article();
        return expect(dbArticle.save()).rejects.toThrow();
    })
    it('Adding Article but missing fields', () => {
        const dbArticle = new Article({
            authors: ["author1"]
        });
        return expect(dbArticle.save()).rejects.toThrow();
    });
    it('Adding many Article', async () => {
        const result = await Article.insertMany([article1, article2, article3])
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(3);
        expect(result[0]).toEqual(expect.objectContaining({
            title: expect.any(String),
            authors: expect.any(Array),
            description: expect.any(String),
            publish: expect.any(Date),
            content: expect.any(Array),
            image: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    });


    it('find articles', async () => {
        await Article.insertMany([article1, article2, article3])
        const result = await Article.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(3);
        expect(result[0]).toEqual(expect.objectContaining({
            title: expect.any(String),
            authors: expect.any(Array),
            description: expect.any(String),
            publish: expect.any(Date),
            content: expect.any(Array),
            image: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
    it('find null articles', async () => {
        const result = await Article.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(0);
    })
    it('delete one article', async () => {
        const articleDB = await Article.insertMany([article1, article2, article3])
        const result = await Article.deleteOne(articleDB[0]);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.deletedCount).toBe(1);
    })
    it('update article', async () => {
        await Article.insertMany([article1, article2, article3])
        const articleDB = await Article.find();
        const updateArticle = articleDB[0];
        updateArticle.title = "update article";

        const result = await Article.updateOne(updateArticle)
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.modifiedCount).toBe(1);
        expect(result.matchedCount).toBe(1);

        const updatedArticle = await Article.findById(updateArticle._id);
        // log4js.error(`${JSON.stringify(updatedArticle)}`)
        expect(updatedArticle).toBeDefined();
        expect(updatedArticle.title).toBe("update article");
        expect(updatedArticle).toEqual(expect.objectContaining({
            title: expect.any(String),
            authors: expect.any(Array),
            description: expect.any(String),
            publish: expect.any(Date),
            content: expect.any(Array),
            image: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

    })
})
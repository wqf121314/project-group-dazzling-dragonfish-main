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
import {NewsEvent} from "../domain/Event";
import {Article} from "../domain/Article";
import {ArticleProperty} from "../domain/ArticleProperty";
import {EventGroup} from "../../eventGroup/domain/EventGroup";
import {EventGroupProperty} from "../../eventGroup/domain/EventGroupProperty";


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

describe('check Event Schema', () => {
    beforeEach(async () => {
        // Clean the contents in the DB
        // await clearDatabase();
        await EventGroup.deleteMany({});
        await EventGroupProperty.deleteMany({});
        await NewsEvent.deleteMany({});
        await Article.deleteMany({});
        await ArticleProperty.deleteMany({});
    })

    it('add Empty Event', async () => {
        const dbEvent = new NewsEvent();
        const result = await dbEvent.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
    it('add Event', async () => {
        const ArticleDB = await Article.insertMany([article1, article2])
        const ArticlePropertyBD = await ArticleProperty.insertMany([property1, property2])

        const dbEvent = new NewsEvent({
            property: ArticlePropertyBD[0]._id,
            article: ArticleDB[0]._id
        })
        const result = await dbEvent.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            _id: expect.any(Object),
            article: expect.any(Object),
            property: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))

        const event = await NewsEvent.findById(result._id).populate("property").populate("article");
        log4js.error(`${JSON.stringify(event)}`)
        expect(event).toBeDefined()
        expect(event.article).toEqual(expect.objectContaining({
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
        expect(event.article._id.toString()).toEqual(ArticleDB[0]._id.toString())
        expect(event.property).toEqual(expect.objectContaining({
            language: expect.any(String),
            region: expect.any(String),
            source: expect.any(String),
            originalUrl: expect.any(String),
            tags: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(event.property._id.toString()).toEqual(ArticlePropertyBD[0]._id.toString())
    })
    it('add Many Event', async () => {
        const ArticleDB = await Article.insertMany([article1, article2])
        const ArticlePropertyBD = await ArticleProperty.insertMany([property1, property2])

        const result = await NewsEvent.insertMany([
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[1]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[1]._id
            },
        ]);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result.length).toBe(4)
        expect(result[0]).toEqual(expect.objectContaining({
            _id: expect.any(Object),
            article: expect.any(Object),
            property: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].property._id.toString()).toEqual(ArticlePropertyBD[0]._id.toString())
        expect(result[0].article._id.toString()).toEqual(ArticleDB[0]._id.toString())

        expect(result[1].property._id.toString()).toEqual(ArticlePropertyBD[1]._id.toString())
        expect(result[1].article._id.toString()).toEqual(ArticleDB[0]._id.toString())

        expect(result[2].property._id.toString()).toEqual(ArticlePropertyBD[0]._id.toString())
        expect(result[2].article._id.toString()).toEqual(ArticleDB[1]._id.toString())

        expect(result[3].property._id.toString()).toEqual(ArticlePropertyBD[1]._id.toString())
        expect(result[3].article._id.toString()).toEqual(ArticleDB[1]._id.toString())
    })

    it('find Event', async () => {
        const ArticleDB = await Article.insertMany([article1, article2])
        const ArticlePropertyBD = await ArticleProperty.insertMany([property1, property2])
        await NewsEvent.insertMany([
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[1]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[1]._id
            },
        ]);

        const result = await NewsEvent.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(4);
        expect(result[0]).toEqual(expect.objectContaining({
            _id: expect.any(Object),
            article: expect.any(Object),
            property: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })

    it('find null Event', async () => {
        const result = await NewsEvent.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(0);
    })

    it('delete one Event', async () => {
        const ArticleDB = await Article.insertMany([article1, article2])
        const ArticlePropertyBD = await ArticleProperty.insertMany([property1, property2])
        const NewsEventDB = await NewsEvent.insertMany([
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[1]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[1]._id
            },
        ]);

        const result = await NewsEvent.deleteOne(NewsEventDB[0]);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.deletedCount).toBe(1);
    })
    it('update Event', async () => {
        const ArticleDB = await Article.insertMany([article1, article2])
        const ArticlePropertyBD = await ArticleProperty.insertMany([property1, property2])
        await NewsEvent.insertMany([
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[0]._id
            },
            {
                property: ArticlePropertyBD[0]._id,
                article: ArticleDB[1]._id
            },
            {
                property: ArticlePropertyBD[1]._id,
                article: ArticleDB[1]._id
            },
        ]);


        const NewsEventDB = await NewsEvent.find();
        const updateNewsEventDB = NewsEventDB[0];
        updateNewsEventDB.article = ArticleDB[1]._id;

        const result = await NewsEvent.updateOne(updateNewsEventDB)
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.modifiedCount).toBe(1);
        expect(result.matchedCount).toBe(1);

        const updatedNewsEvent = await NewsEvent.findById(updateNewsEventDB._id).populate("property").populate("article");
        // log4js.error(`${JSON.stringify(updatedNewsEvent)}`)
        expect(updatedNewsEvent).toBeDefined();
        expect(updatedNewsEvent.article._id.toString()).toEqual(ArticleDB[1]._id.toString());
    })
});
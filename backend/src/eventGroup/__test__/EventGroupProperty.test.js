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
import {EventGroupProperty} from "../domain/EventGroupProperty";
import {EventGroup} from "../domain/EventGroup";
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
let eventGroupProperty1 = {
    category: "business",
    hotWords: ['business_hotword1', 'business_hotword2', 'business_hotword3']
}
let eventGroupProperty2 = {
    category: "sport",
    hotWords: ['sport_hotword1', 'sport_hotword2', 'sport_hotword3']
}
let eventGroupProperty3 = {
    category: "business",
    hotWords: ['business_hotword11', 'business_hotword22', 'business_hotword33']
}
let eventGroupProperty4 = {
    category: "article",
    hotWords: ['article_hotword1', 'article_hotword2', 'article_hotword3']
}


describe('check EventGroupProperty Schema', () => {
    beforeEach(async () => {
        // Clean the contents in the DB
        // await clearDatabase();
        await EventGroup.deleteMany({});
        await EventGroupProperty.deleteMany({});
        await NewsEvent.deleteMany({});
        await Article.deleteMany({});
        await ArticleProperty.deleteMany({});
    })

    it('add EventGroupProperty', async () => {
        const dbEventGroupProperty = new EventGroupProperty(eventGroupProperty1);
        const result = await dbEventGroupProperty.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            category: expect.any(String),
            hotWords: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result._id).toBeDefined();
        expect(result.category).toBe(eventGroupProperty1.category);
        expect(result.hotWords.length).toBe(eventGroupProperty1.hotWords.length);
    })
    it('add Empty EventGroupProperty', async () => {
        const dbEventGroupProperty = new EventGroupProperty();
        const result = await dbEventGroupProperty.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            hotWords: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
    it('Adding many EventGroupProperty', async () => {
        const result = await EventGroupProperty.insertMany([eventGroupProperty1, eventGroupProperty2, eventGroupProperty3, eventGroupProperty4])
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(4);
        expect(result[0]).toEqual(expect.objectContaining({
            category: expect.any(String),
            hotWords: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    });

    it('find EventGroupProperty', async () => {
        await EventGroupProperty.insertMany([eventGroupProperty1, eventGroupProperty2, eventGroupProperty3, eventGroupProperty4])
        const result = await EventGroupProperty.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(4);
        expect(result[0]).toEqual(expect.objectContaining({
            category: expect.any(String),
            hotWords: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })

    it('find null EventGroupProperty', async () => {
        const result = await EventGroupProperty.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(0);
    })
    it('delete one EventGroupProperty', async () => {
        const eventGroupPropertyDB = await EventGroupProperty.insertMany([eventGroupProperty1, eventGroupProperty2, eventGroupProperty3, eventGroupProperty4])
        const result = await EventGroupProperty.deleteOne(eventGroupPropertyDB[0]);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.deletedCount).toBe(1);
    })
    it('update EventGroupProperty', async () => {
        await EventGroupProperty.insertMany([eventGroupProperty1, eventGroupProperty2, eventGroupProperty3])

        const EventGroupPropertyDB = await EventGroupProperty.find();
        const updateEventGroupProperty = EventGroupPropertyDB[0];
        updateEventGroupProperty.category = eventGroupProperty4.category;

        const result = await EventGroupProperty.updateOne(updateEventGroupProperty)
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.modifiedCount).toBe(1);
        expect(result.matchedCount).toBe(1);

        const updatedEventGroupProperty = await EventGroupProperty.findById(updateEventGroupProperty._id);
        // // log4js.error(`${JSON.stringify(updatedArticle)}`)
        expect(updatedEventGroupProperty).toBeDefined();
        expect(updatedEventGroupProperty.category).toBe(eventGroupProperty4.category);
        expect(updatedEventGroupProperty).toEqual(expect.objectContaining({
            category: expect.any(String),
            hotWords: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
});
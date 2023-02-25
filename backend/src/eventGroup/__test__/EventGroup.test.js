import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle,
    addArticleProperty,
    addEventGroups,
    addNewsEvents,
    clearDatabase
} from "../../newsSource/dbEstablishByJson";
import log4js from "../../utils/log4js";
import {NewsEvent} from "../../event/domain/Event";
import {EventGroup} from "../domain/EventGroup";
import {Article} from "../../event/domain/Article";
import {ArticleProperty} from "../../event/domain/ArticleProperty";
import {EventGroupProperty} from "../domain/EventGroupProperty";


let mongod;
beforeAll(async () => {
    const config = require('config');
    const dbConfig = config.get("Mongodb");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), dbConfig.config);
});

let eventGroupProperty1 = {
    category: "business", hotWords: ['business_hotword1', 'business_hotword2', 'business_hotword3']
}
let eventGroupProperty2 = {
    category: "sport", hotWords: ['sport_hotword1', 'sport_hotword2', 'sport_hotword3']
}
let eventGroupProperty3 = {
    category: "business", hotWords: ['business_hotword11', 'business_hotword22', 'business_hotword33']
}
let eventGroupProperty4 = {
    category: "article", hotWords: ['article_hotword1', 'article_hotword2', 'article_hotword3']
}

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


describe('check EventGroup Schema', () => {
    beforeEach(async () => {
        // Clean the contents in the DB
        // await clearDatabase();
        await EventGroup.deleteMany({});
        await EventGroupProperty.deleteMany({});
        await NewsEvent.deleteMany({});
        await Article.deleteMany({});
        await ArticleProperty.deleteMany({});
    })

    it('add Empty EventGroup', async () => {
        const dbEventGroup = new EventGroup();
        const result = await dbEventGroup.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
    it('add EventGroup', async () => {
        const events = await addNewsEvent();
        const eventGroupProperties = await addEventGroupProperty()
        log4js.error(`${JSON.stringify(events.length)}`)
        log4js.error(`${JSON.stringify(eventGroupProperties.length)}`)

        const dbEventGroup = new EventGroup({
            eventTitle: "EventGroup title",
            image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
            publish: new Date(),
            description: "EventGroup description",
            articles: [events[0], events[1], events[2]],
            property: [eventGroupProperties[0], eventGroupProperties[1]]
        });

        const result = await dbEventGroup.save();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined()
        expect(result).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result.articles.length).toBe(3);
        expect(result.property.length).toBe(2);
    });

    it('Adding many EventGroup', async () => {
        let events = await addNewsEvent();
        let eventGroupProperties = await addEventGroupProperty()
        log4js.error(`${JSON.stringify(events.length)}`)
        log4js.error(`${JSON.stringify(eventGroupProperties.length)}`)

        const result = await EventGroup.insertMany([{
            eventTitle: "EventGroup title1",
            image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
            publish: new Date(),
            description: "EventGroup description1",
            articles: [events[0], events[1], events[2]],
            property: [eventGroupProperties[0], eventGroupProperties[1]]
        }, {
            eventTitle: "EventGroup title2",
            image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
            publish: new Date(),
            description: "EventGroup description2",
            articles: [events[1], events[2], events[3], events[4], events[5]],
            property: [eventGroupProperties[0], eventGroupProperties[1], eventGroupProperties[2], eventGroupProperties[3]]
        }, {
            eventTitle: "EventGroup title3",
            image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
            publish: new Date(),
            description: "EventGroup description3",
            articles: [events[0], events[1], events[2], events[3], events[4], events[5]],
            property: [eventGroupProperties[1]]
        }])

        expect(result).toBeDefined()
        expect(result.length).toBe(3)
        expect(result[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].articles.length).toBe(3)
        expect(result[0].property.length).toBe(2)
        expect(result[1].articles.length).toBe(5)
        expect(result[1].property.length).toBe(4)
        expect(result[2].articles.length).toBe(6)
        expect(result[2].property.length).toBe(1)
        expect(result[0].articles[0]).toEqual(expect.objectContaining({
            _id: expect.any(Object),
            article: expect.any(Object),
            property: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }));
        expect(result[0].property[0]).toEqual(expect.objectContaining({
            category: expect.any(String),
            hotWords: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
        expect(result[0].articles[0]._id).toEqual(events[0]._id)
        expect(result[0].articles[1]._id).toEqual(events[1]._id)
        expect(result[0].property[0]._id).toEqual(eventGroupProperties[0]._id)
    });

    it('find EventGroup', async () => {
        await addEventGroup();
        const result = await EventGroup.find().populate({
            path: 'articles', populate: {path: 'article'}
        }).populate("property");

        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(4);
        expect(result[0]).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })
    it('find null EventGroup', async () => {
        const result = await EventGroup.find();
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.length).toBe(0);
    })
    it('delete one EventGroup', async () => {
        const eventGroupDB = await addEventGroup();
        const result = await EventGroup.deleteOne(eventGroupDB[0]);
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.deletedCount).toBe(1);
    })

    it('update EventGroup', async () => {
        await addEventGroup();

        const eventGroupDB = await EventGroup.find();
        const updateEventGroup = eventGroupDB[0];
        updateEventGroup.eventTitle = 'update EventGroup';

        const result = await EventGroup.updateOne(updateEventGroup)
        // log4js.error(`${JSON.stringify(result)}`)
        expect(result).toBeDefined();
        expect(result.acknowledged).toBe(true);
        expect(result.modifiedCount).toBe(1);
        expect(result.matchedCount).toBe(1);

        const updatedEventGroup = await EventGroup.findById(updateEventGroup._id);
        // log4js.error(`${JSON.stringify(updatedArticle)}`)
        expect(updatedEventGroup).toBeDefined();
        expect(updatedEventGroup.eventTitle).toEqual(updateEventGroup.eventTitle);
        expect(updatedEventGroup).toEqual(expect.objectContaining({
            articles: expect.any(Array),
            property: expect.any(Array),
            _id: expect.any(Object),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        }))
    })

});

async function addNewsEvent() {
    const ArticleDB = await Article.insertMany([article1, article2, article3])
    const ArticlePropertyBD = await ArticleProperty.insertMany([property1, property2])
    const NewsEventBD = await NewsEvent.insertMany([{
        property: ArticlePropertyBD[0]._id, article: ArticleDB[0]._id
    }, {
        property: ArticlePropertyBD[1]._id, article: ArticleDB[0]._id
    }, {
        property: ArticlePropertyBD[0]._id, article: ArticleDB[1]._id
    }, {
        property: ArticlePropertyBD[1]._id, article: ArticleDB[1]._id
    }, {
        property: ArticlePropertyBD[0]._id, article: ArticleDB[2]._id
    }, {
        property: ArticlePropertyBD[1]._id, article: ArticleDB[2]._id
    },]);
    return NewsEventBD;
}

async function addEventGroupProperty() {
    const result = await EventGroupProperty.insertMany([eventGroupProperty1, eventGroupProperty2, eventGroupProperty3, eventGroupProperty4])
    return result;
}

async function addEventGroup() {
    let events = await addNewsEvent();
    let eventGroupProperties = await addEventGroupProperty()
    log4js.error(`${JSON.stringify(events.length)}`)
    log4js.error(`${JSON.stringify(eventGroupProperties.length)}`)

    const result = await EventGroup.insertMany([{
        eventTitle: "EventGroup title1",
        image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
        publish: new Date(),
        description: "EventGroup description1",
        articles: [events[0], events[1], events[2]],
        property: [eventGroupProperties[0], eventGroupProperties[1]]
    }, {
        eventTitle: "EventGroup title2",
        image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
        publish: new Date(),
        description: "EventGroup description2",
        articles: [events[1], events[2], events[3], events[4], events[5]],
        property: [eventGroupProperties[0], eventGroupProperties[1], eventGroupProperties[2], eventGroupProperties[3]]
    }, {
        eventTitle: "EventGroup title3",
        image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
        publish: new Date(),
        description: "EventGroup description3",
        articles: [events[0], events[1], events[2], events[3], events[4], events[5]],
        property: [eventGroupProperties[1]]
    }, {
        eventTitle: "EventGroup title4",
        image: "https://images.unsplash.com/photo-1623826538345-192361e2d4cd?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwxfHxFc3NlbnRpYWwlMjBvaWx8ZW58MHwwfHx8MTY1MTM3ODYzNA&amp;ixlib=rb-1.2.1",
        publish: new Date(),
        description: "EventGroup description4",
        articles: [events[0]],
        property: [eventGroupProperties[1]]
    }])
    return result;
}
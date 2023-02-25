import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';


// DB schemas
import {Article} from '../../event/domain/Article';
import {ArticleProperty} from '../../event/domain/ArticleProperty';
import {NewsEvent} from '../../event/domain/Event';
import {EventGroupProperty} from '../../eventGroup/domain/EventGroupProperty';
import {EventGroup} from '../../eventGroup/domain/EventGroup';

// Import testing JS file

import dbFeeding from '../dbFeeding';

// Database for globe use
let mongod;
let mockDataObject;
const log4js = require('../../utils/log4js')
// before performing all test, create a mongo db in-memory

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString);
});

/* In this dbFeeding javascript function, the purpose is to feed data into database.
 * the news group and its related news are fetching some public APIs from the internet
 */

beforeEach(async ()=>{

    mockDataObject = [{
        eventTitle: 'This is a demo event group title',
        image: 'http://this.is.test/image.jpg',
        description: 'To write a test case is not a easy stuff',
        publish: new Date("2022-05-05T08:38:11.434Z"),
        sources: 'Auckland University ICT School',
        category: 'business',
        region: 'nz',
        language: 'en',
        hotWords:['online', 'course', 'summer school'],
        weyWords:['online', 'course', 'summer school'],
        articles:[
            {
                title: 'This demo news 1',
                authors: ['University of Auckland'],
                content: ['Line 1','Line 2'],
                publish: new Date("2022-05-02T08:38:11.434Z"),
                image: 'http://this.is.test/articles/image.jpg',
                language: 'en',
                region: 'nz',
                originalUrl: 'http://this.is.test/articles/article_1',
                sources: 'NewsTalk ZB',
                category: 'business',
                tags: ['happy','sad','good']
            },
            {
                title: 'This demo news 2',
                authors: ['University of Otago'],
                content: ['Line 1','Line 2'],
                publish: new Date("2022-05-03T08:38:11.434Z"),
                image: 'http://this.is.test/articles/image2.jpg',
                language: 'en',
                region: 'nz',
                originalUrl: 'http://this.is.test/articles/article_2',
                sources: 'NewsTalk ZB',
                category: 'business',
                tags: ['SpaceX','good']
            }
        ]
    }]
});

it('feed incorrect data objects: undefined as input', async ()=>{
    // adding dataObject into database should not include any error, 
    // if there is any error, the function will return error message
    expect(await dbFeeding(undefined)).toBe("Parsing Data Object with Exception");
});

it('feed incorrect data objects: single string as input', async ()=>{
    // adding dataObject into database should not include any error,
    // if there is any error, the function will return error message
    expect(await dbFeeding("singleString")).toBe("Parsing Data Object with Exception");
});

it('feed incorrect data objects: incorrect data object', async ()=>{
    // adding dataObject into database should not include any error,
    // if there is any error, the function will return error message
    const inCorrectDataObj = {test: 1, happy: "no"};
    expect(await dbFeeding(inCorrectDataObj)).toBe("Parsing Data Object with Exception");
});

it('feed data objects to check response', async ()=>{
    // adding dataObject into database should not include any error,
    // if there is any error, the function will return error message
    const response = await dbFeeding(mockDataObject);

    console.log(response);
    //test articles content are correct
    for (let itemIdx=0; itemIdx < response.length; itemIdx ++){  
        for(let articleIdx = 0; articleIdx < response[itemIdx].articlesIDList.length; articleIdx++){
            // test article
            const articleContent = (await Article.findById(response[itemIdx].articlesIDList[articleIdx]));
            expect(articleContent.title).toBe(mockDataObject[itemIdx].articles[articleIdx].title) //check title is match or not
            expect(articleContent.content).toEqual(mockDataObject[itemIdx].articles[articleIdx].content) //check content is match or not
            // test article props
            const articlePropsContent = (await ArticleProperty.findById(response[itemIdx].articlesPropsIDList[articleIdx]));
            expect(articlePropsContent.language).toBe(mockDataObject[itemIdx].articles[articleIdx].language) //check language is match or not
            expect(articlePropsContent.tags).toEqual(mockDataObject[itemIdx].articles[articleIdx].tags) //check tags is match or not
            // test news
            const newsContent = (await NewsEvent.findById(response[itemIdx].newsIDList[articleIdx]));
            expect(newsContent.property).toEqual(response[itemIdx].articlesPropsIDList[articleIdx]) //check ID of the article props is match or not
            expect(newsContent.article).toEqual(response[itemIdx].articlesIDList[articleIdx]) //check ID of the article  is match or not
        }

        // test event group
        const eventGroupContent = (await EventGroup.findById(response[itemIdx].eventGroupID));
        expect(eventGroupContent.eventTitle).toEqual(mockDataObject[itemIdx].eventTitle) //check eventTitle of the event group is match or not
        expect(eventGroupContent.description).toEqual(mockDataObject[itemIdx].description) //check description of the event group is match or not
        expect(eventGroupContent.articles).toEqual(response[itemIdx].newsIDList) // check ID of the articles is match or not

        // test event group props
        const eventGroupPropsContent = (await EventGroupProperty.findById(response[itemIdx].eventGroupPropertyID));
        expect(eventGroupPropsContent.hotWords).toEqual(mockDataObject[itemIdx].hotWords) //check hotWords of the event group props is match or not
        expect(eventGroupPropsContent.category).toEqual(mockDataObject[itemIdx].category) //check category of the event group props is match or not
    }
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});
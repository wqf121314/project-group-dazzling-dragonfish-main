import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import {
    addArticle,
    addArticleProperty, addEventGroupProperty,
    addEventGroups,
    addNewsEvents,
    clearDatabase
} from "../../newsSource/dbEstablishByJson";
import cors from "koa2-cors";
import bodyParser from "koa-body";

const request = require('supertest')
const log4js = require('../../utils/log4js')
const router = require('../index')

const Koa = require('koa');
const app = new Koa();

let mongod;
beforeAll(async () => {
    const config = require('config');
    const dbConfig = config.get("Mongodb");
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri(), dbConfig.config);

    app.use(cors())
        .use(bodyParser({
            //Support for form-data data types
            multipart: true
        }));
    app.use(router.routes())
        .use(router.allowedMethods());
});

describe('check /api/v2/eventgroup interface and Empty data', () => {
    it('Exception when checking  Get /api/v2/eventgroup/recommend ', (done) => {
        request(app.callback())
            .get('/api/v2/eventgroup/recommend')
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(1);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });
    it('Exception when checking  Get /api/v2/eventgroup/recommend/:category ', (done) => {
        const category = 'business'
        request(app.callback()).get('/api/v2/eventgroup/recommend/' + category).send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('Exception when checking  Get /api/v2/eventgroup/:id ', (done) => {
        const id = '625e1e65f2b6b59fda1eb38e'
        request(app.callback()).get('/api/v2/eventgroup/' + id)
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('Exception when checking  Post /api/v2/eventgroup/recommend don not send any Data', (done) => {
        request(app.callback())
            .post('/api/v2/eventgroup/recommend')
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(1);
                expect(ctx.body.msg).toEqual(`count:undefined is NOT in compliance with the rules.`);
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('Exception when checking  Post /api/v2/eventgroup/recommend send {count: 10} ', (done) => {
        const data = {count: 10}
        request(app.callback()).post('/api/v2/eventgroup/recommend')
            .send(data)
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual(`No data obtained.`);
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('Exception when checking  Post /api/v2/eventgroup/recommend send nonexistent data', (done) => {
        const data = {
            aaa: "BusiNess",
            // query: "a",
            count: 3
        }
        request(app.callback()).post('/api/v2/eventgroup/recommend')
            .send(data)
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual(`No data obtained.`);
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('Exception when checking  Post /api/v2/eventgroup/recommend send full data', (done) => {
        const data = {
            category: "BusiNess",
            query: "a",
            count: 3
        }
        request(app.callback()).post('/api/v2/eventgroup/recommend')
            .send(data)
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual(`No data obtained.`);
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
});

describe('check /api/v2/event interface and Empty data', () => {
    it('Exception when checking  GET /api/v2/event ', (done) => {
        request(app.callback())
            .get('/api/v2/event')
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });
    it('Exception when checking  GET /api/v2/:id ', (done) => {
        const id = '626e1602cd287f48e273abe5'
        request(app.callback())
            .get('/api/v2/event/' + id)
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });
});

describe('check /api/v2/eventgroup interface and exist data', () => {
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
        await clearDatabase();
    })
    it('check the legitimacy of the fields returned by GET /api/v2/eventgroup/recommend ', (done) => {
        request(app.callback())
            .get('/api/v2/eventgroup/recommend')
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx.body.data)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by GET /api/v2/eventgroup/recommend/:category ', (done) => {
        const category = 'business'
        request(app.callback()).get('/api/v2/eventgroup/recommend/' + category).send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by GET /api/v2/eventgroup/recommend/:category Case sensitive category: BuSiness', (done) => {
        const category = 'BuSiness'
        request(app.callback()).get('/api/v2/eventgroup/recommend/' + category).send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by GET /api/v2/eventgroup/recommend/:category Case sensitive category: BUSINESS', (done) => {
        const category = 'BUSINESS'
        request(app.callback()).get('/api/v2/eventgroup/recommend/' + category).send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by GET /api/v2/eventgroup/recommend/:category nonexistent category: aaaa', (done) => {
        const category = 'aaaa'
        request(app.callback()).get('/api/v2/eventgroup/recommend/' + category).send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(1);
                expect(ctx.body.msg).toEqual(`category:${category} does not exist in EventCategory array.`);
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });

    it('check the legitimacy of the fields returned by Get /api/v2/eventgroup/:id ', (done) => {
        const id = '6270c7ad9d6c21966db7ee48'
        request(app.callback()).get('/api/v2/eventgroup/' + id).send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    eventGroup: {
                        id: expect.any(String),
                        eventTitle: expect.any(String),
                        image: expect.stringMatching(/^http/),
                        publish: expect.any(String),
                        description: expect.any(String),
                        property: {
                            eventGroupType: expect.any(String),
                            eventGroupTypeDetail: expect.any(String),
                        },
                        articles: expect.any(Array),
                    }
                }))
                expect(ctx.body.data.eventGroup.articles[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    headline: expect.any(String),
                    authors: expect.any(Array),
                    images: expect.any(Array),
                    publish: expect.any(String)
                }))
                expect(ctx.body.data.eventGroup.property).toEqual(expect.objectContaining({
                    eventGroupType: expect.any(String),
                    eventGroupTypeDetail: expect.any(String)
                }))
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check for especial data of returned by Get /api/v2/eventgroup/:id ', (done) => {
        const id = '6270c7ad9d6c21966db7ee48'
        request(app.callback()).get('/api/v2/eventgroup/' + id).send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                const eventGroup = ctx.body.data.eventGroup;
                expect(eventGroup.id).toEqual(id);
                expect(eventGroup.property.eventGroupType).toEqual('health');
                expect(eventGroup.articles.length).toBe(2);
                expect(eventGroup.articles[0].id).toEqual('6270c7ad9d6c21966db7ee3f');
                expect(eventGroup.articles[0].images[0]).toEqual(
                    expect.objectContaining({
                        url: expect.any(Array),
                    }))
                expect(eventGroup.articles[1].id).toEqual('6270c7ad9d6c21966db7ee45');
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check nonexistent id of the fields returned by Get /api/v2/eventgroup/:id ', (done) => {
        const id = 'aaaaa'
        request(app.callback()).get('/api/v2/eventgroup/' + id)
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });
    });

    it('check the legitimacy of the fields returned by Post /api/v2/eventgroup/recommend but don not send any Data  ', (done) => {
        request(app.callback())
            .post('/api/v2/eventgroup/recommend')
            .send()
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(1);
                expect(ctx.body.msg).toEqual(`count:undefined is NOT in compliance with the rules.`);
                expect(ctx.body.data).toEqual(null);
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by Post /api/v2/eventgroup/recommend send {count: 10} ', (done) => {
        const data = {count: 10}
        request(app.callback()).post('/api/v2/eventgroup/recommend')
            .send(data)
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                expect(ctx.body.data.recommendEventGroup.eventGroups.length).toBeLessThanOrEqual(10)
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by Post /api/v2/eventgroup/recommend send {category: "BusiNess",count: 3} ', (done) => {
        const data = {category: "BusiNess", count: 3}
        request(app.callback()).post('/api/v2/eventgroup/recommend')
            .send(data)
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                expect(ctx.body.data.recommendEventGroup.eventGroups.length).toBeLessThanOrEqual(3)
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by Post /api/v2/eventgroup/recommend send {query: "a",count: 5} ', (done) => {
        const data = {query: "a", count: 5}
        request(app.callback()).post('/api/v2/eventgroup/recommend')
            .send(data)
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                expect(ctx.body.data.recommendEventGroup.eventGroups.length).toBeLessThanOrEqual(5)
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
    it('check the legitimacy of the fields returned by Post /api/v2/eventgroup/recommend send {category: "BusiNess",query: "a",count: 2} ', (done) => {
        const data = {category: "BusiNess", query: "a", count: 2}
        request(app.callback()).post('/api/v2/eventgroup/recommend')
            .send(data)
            .then((ctx) => {
                // log4js.error(`ctx---->:${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    hotWords: expect.any(Array),
                    recommendEventGroup: {
                        eventGroups: expect.any(Array)
                    }
                }));
                expect(ctx.body.data.hotWords.length).toBeLessThanOrEqual(5)
                expect(ctx.body.data.recommendEventGroup.eventGroups[0]).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    eventTitle: expect.any(String),
                    image: expect.stringMatching(/^http/),
                    publish: expect.any(String),
                    description: expect.any(String)
                }))
                expect(ctx.body.data.recommendEventGroup.eventGroups.length).toBeLessThanOrEqual(2)
                return done()
            })
            .catch((err) => {
                // log4js.error(`err--->:${JSON.stringify(err)}`)
                return done(err)
            });
    });
});

describe('check /api/v2/event interface and exist data', () => {
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
        await clearDatabase();
    })
    it('check the legitimacy of the fields returned by GET /api/v2/event ', (done) => {
        request(app.callback())
            .get('/api/v2/event')
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body).toEqual(expect.objectContaining({
                    data: expect.any(Array)
                }));
                expect(ctx.body.data.length).toBeGreaterThan(1);
                expect(ctx.body.data[0]).toEqual(expect.objectContaining({
                    _id: expect.any(String),
                    property: expect.any(Object),
                    article: expect.any(Object),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    __v: 0
                }));
                expect(ctx.body.data[0].property).toEqual(expect.objectContaining({
                    _id: expect.any(String),
                    tags: expect.any(Array),
                    language: expect.any(String),
                    region: expect.any(String),
                    originalUrl: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }));
                expect(ctx.body.data[0].property.tags.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data[0].property.originalUrl).toEqual(expect.stringMatching(/^http/));
                expect(ctx.body.data[0].article).toEqual(expect.objectContaining({
                    _id: expect.any(String),
                    authors: expect.any(Array),
                    content: expect.any(Array),
                    image: expect.any(Array),
                    title: expect.any(String),
                    description: expect.any(String),
                    publish: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }));
                expect(ctx.body.data[0].article.authors.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data[0].article.content.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data[0].article.image.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data[0].article.image[0]).toEqual(expect.stringMatching(/^http/));
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });
    it('check the legitimacy of the fields returned by GET /api/v2/event/:id ', (done) => {
        const id = '626e1602cd287f48e273abe5'
        request(app.callback())
            .get('/api/v2/event/' + id)
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual(expect.objectContaining({
                    property: expect.any(Object),
                    article: expect.any(Object),
                }));
                expect(ctx.body.data.property).toEqual(expect.objectContaining({
                    language: expect.any(String),
                    region: expect.any(String),
                    originalUrl: expect.any(String),
                    tags: expect.any(Array)
                }));
                expect(ctx.body.data.article).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    headline: expect.any(String),
                    authors: expect.any(Array),
                    description: expect.any(String),
                    images: expect.any(Array),
                    publish: expect.any(String),
                    content: expect.any(Array)
                }));
                expect(ctx.body.data.property.tags.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data.property.originalUrl).toEqual(expect.stringMatching(/^http/));
                expect(ctx.body.data.article.authors.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data.article.content.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data.article.images.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data.article.images[0].url.length).toBeGreaterThanOrEqual(1);
                expect(ctx.body.data.article.images[0].url[0]).toEqual(expect.stringMatching(/^http/));
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });
    it('check for especial data of returned by GET /api/v2/event/:id ', (done) => {
        const id = '626e1602cd287f48e273abe5'
        request(app.callback())
            .get('/api/v2/event/' + id)
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                const event = ctx.body.data;
                expect(event.article.id).toEqual('626e1602cd287f48e273abe5');
                expect(event.article.authors[0]).toEqual('Best in Australia');
                expect(event.property.region).toEqual('nz');
                expect(event.property.tags).toContain('bottles');
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });
    it('check for nonexistent data of returned by GET /api/v2/event/:id ', (done) => {
        const id = 'aaaa'
        request(app.callback())
            .get('/api/v2/event/' + id)
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });
    it('check for interface GET /api/v2/event/:id send id ', (done) => {
        const id = "id"
        request(app.callback())
            .get('/api/v2/event/' + id)
            .send()
            .expect(200)
            .then((ctx) => {
                // log4js.error(`${JSON.stringify(ctx)}`)
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(2);
                expect(ctx.body.msg).toEqual('No data obtained.');
                expect(ctx.body.data).toEqual(null);
                return done()
            })
            .catch((err) => {
                // log4js.error(`${JSON.stringify(err)}`)
                return done(err)
            });

    });

});

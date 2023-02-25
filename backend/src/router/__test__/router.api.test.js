const request = require('supertest')
const router = require('../index')
const Koa = require('koa');
const app = new Koa();


app.use(router.routes())
    .use(router.allowedMethods());

describe('GET /api', () => {
    it('checking each version health: /api/health ', (done) => {
        request(app.callback())
            .get('/api/health')
            .send()
            .expect(200)
            .then((ctx) => {
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual('Backend Server is running');
                expect(ctx.body).toMatchSnapshot();
                return done();
            })
            .catch((err) => {
                return done(err)
            });

    });
    it('checking each version health: /api/v1/health ', (done) => {
        const response = request(app.callback())
            .get('/api/v1/health')
            .send()
            .expect(200)
            .then((ctx) => {
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual('Backend Server V1 is running');
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                return done(err)
            });
    });
    it('checking each version health: /api/v2/health ', (done) => {
        const response = request(app.callback())
            .get('/api/v2/health')
            .send()
            .expect(200)
            .then((ctx) => {
                expect(ctx).toBeDefined();
                expect(ctx.status).toEqual(200);
                expect(ctx.type).toEqual('application/json');
                expect(ctx.body.code).toEqual(0);
                expect(ctx.body.msg).toEqual('');
                expect(ctx.body.data).toEqual('Backend Server V2 is running');
                expect(ctx.body).toMatchSnapshot();
                return done()
            })
            .catch((err) => {
                return done(err)
            });
    });
});


const server = require('../../server').callback();
const request = require('supertest')

describe('Checking the main interface', () => {
    it('Get not exit request, interface: / ', async () => {
        const response = await request(server).get('/');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();
    })
    it('Post not exit request, interface: / ', async () => {
        const response = await request(server).post('/');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();

    })
    it('Get not exit request, interface: /index  ', async () => {
        const response = await request(server).get('/index');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();

    })
    it('Post not exit request, interface: /index  ', async () => {
        const response = await request(server).get('/index');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();

    })
});

describe('GET /api', () => {
    it('check error interface: /api ', async () => {
        const response = await request(server).get('/api');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();
    })
    it('checking for api/health', async () => {
        const response = await request(server).get('/api/health');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(0);
        expect(response.body.msg).toEqual('');
        expect(response.body.data).toEqual('Backend Server is running');
        expect(response.body).toMatchSnapshot();
    })
});

describe('GET /api/v1', () => {
    it('check error interface: /api/v1 ', async () => {
        const response = await request(server).get('/api/v1');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();

    })
    it('check error interface: /api/v1/index ', async () => {
        const response = await request(server).get('/api/v1/index');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();

    })
    it('checking for api/v1/health', async () => {
        const response = await request(server).get('/api/v1/health');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(0);
        expect(response.body.msg).toEqual('');
        expect(response.body.data).toEqual('Backend Server V1 is running');
        expect(response.body).toMatchSnapshot();
    })
});

describe('GET /api/v2', () => {
    it('check error interface: /api/v2 ', async () => {
        const response = await request(server).get('/api/v2');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();

    })
    it('check error interface: /api/v2/index ', async () => {
        const response = await request(server).get('/api/v2/index');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(1);
        expect(response.body.msg).toEqual('URL is not exist!!');
        expect(response.body).toMatchSnapshot();

    })
    it('checking for api/v2/health', async () => {
        const response = await request(server).get('/api/v2/health');
        expect(response).toBeDefined();
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        expect(response.body.code).toEqual(0);
        expect(response.body.msg).toEqual('');
        expect(response.body.data).toEqual('Backend Server V2 is running');
        expect(response.body).toMatchSnapshot();
    })
});

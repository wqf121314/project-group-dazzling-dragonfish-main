import {dbEstablishByJson} from './newsSource/dbEstablishByJson'

const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-body');
const cors = require('koa2-cors');
const log4js = require('./utils/log4js')
const app = new Koa();

app.use(cors())
    .use(bodyParser({
        //Support for form-data data types
        multipart: true,
    }));
/**
 * Initialising the logging service
 */
//Log filtering, where request data is fetched and logged for each request
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    log4js.info(`${ctx.method} ${ctx.url} ${JSON.stringify(ctx.request.body)} - ${ms}ms`)       //Listening for requests
})

/**
 * Setting up router
 */
const router = require('./router')
// Using middleware to Handling 404
app.use(async (ctx, next) => {
    await next(); // Call next to execute the next middleware
    if (ctx.status === 404) {
        const result = {code: 1, msg: 'URL is not exist!!'}
        ctx.response.type = 'json';
        ctx.response.body = result; // Removing the method of reading pages
    }
});
app.use(router.routes())
    .use(router.allowedMethods());

/**
 * Setting service start information
 */
//Creating a global mongoDB connection pool
const {mongooseConnect} = require('./utils/mongoose');
mongooseConnect();
//Initialization data
dbEstablishByJson().then(() => log4js.info(`Initialized data successfully!!`));

//Service Ports
let port = process.env.PORT || config.get("App.port");
app.listen(port, () => log4js.info(`App service started successfully, access port: ${port}`))

module.exports = app

log4js.info('fetch news data to enrich database')
// funEventGroups('nz','headlines','en');

// const categoryMapping = {
//     business: 'b', 9
//     science: 't', 4
//     health: 'm', 3
//     sports: 's', 13
//     headlines: 'h', 17
//     entertainment: 'e', 8
//     all: 'all'
// };
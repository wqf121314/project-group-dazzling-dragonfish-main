const mongoose = require('mongoose');
const config = require('config');
const log4js = require("./log4js");
//Get mongo's configuration from the configuration centre
let dbConfig = config.get("Mongodb");

//Configuring mongoDB connection parameters
const options = dbConfig.config;

//Creating a global mongoDB connection pool
exports.mongooseConnect = async () => {
    await mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`, options);
    let db = await mongoose.connection;
    db.on('error', (err) => {
        log4js.error(`Mongoose database [${dbConfig.dbName}] connect failed! ${err}`)
    });
    db.once('open', (callback) => {
        log4js.info(`Mongoose database [${dbConfig.dbName}] connect success!`);
    });
}

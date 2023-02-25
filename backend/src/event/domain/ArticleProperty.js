import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/**
 * Article Property
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const articlePropertySchema = new Schema({
    //article used language
    language: String,
    //The country or region where the content of the article takes place
    region: String,
    //article source's website
    source: String,
    //URLs of specific article sources
    originalUrl: String,
    //article by tags
    tags: Array
}, {
    timestamps: {}
});

export const ArticleProperty = mongoose.model('ArticleProperty', articlePropertySchema);

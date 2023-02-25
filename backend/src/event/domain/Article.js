import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/**
 * Article object
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const articleSchema = new Schema({
    //article title
    title: {type: String, required: true}, // Each user must have a unique headline
    //article authors
    authors: Array,
    //article overview
    description: String,
    //the article publish time
    publish: Date,
    //article content segments
    content: Array,
    //article images，
    image: Array
}, {
    timestamps: {}
});

export const Article = mongoose.model('Article', articleSchema);

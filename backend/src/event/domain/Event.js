import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/**
 * Event object
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const eventSchema = new Schema({
    //article property
    property: {type: Schema.Types.ObjectId, ref: 'ArticleProperty'},
    //article
    article: {type: Schema.Types.ObjectId, ref: 'Article'},

}, {
    timestamps: {}
})
export const NewsEvent = mongoose.model('NewsEvent', eventSchema);
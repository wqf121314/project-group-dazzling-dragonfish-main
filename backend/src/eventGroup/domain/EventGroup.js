import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/**
 * Event object
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const eventGroupSchema = new Schema({
    eventTitle: String,
    image: String,
    publish: Date,
    description: String,
    articles: [{type: Schema.Types.ObjectId, ref: 'NewsEvent'}],
    property: [{type: Schema.Types.ObjectId, ref: 'EventGroupProperty'}],
}, {
    timestamps: {}
})
const EventGroup = mongoose.model('EventGroup', eventGroupSchema);
export {EventGroup};

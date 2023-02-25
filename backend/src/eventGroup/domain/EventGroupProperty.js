import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventGroupPropertySchema = new Schema({
    //category
    category: String,
    //hot word
    hotWords: Array
}, {
    timestamps: {}
});
const EventGroupProperty = mongoose.model('EventGroupProperty', EventGroupPropertySchema);
export {EventGroupProperty};
import {NewsEvent} from "../domain/Event";

async function retrieveEvent(id) {
    return NewsEvent.findById(id).populate("property").populate("article");
}

async function retrieveEventList() {
    return NewsEvent.find().populate("property").populate("article");
}

export {
    retrieveEvent, retrieveEventList
}
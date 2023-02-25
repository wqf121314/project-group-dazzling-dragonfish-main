import {EventGroupProperty} from "../domain/EventGroupProperty";

async function retrieveEventGroupPropertyList(count) {
    return EventGroupProperty.find().limit(count);
}

async function retrieveEventGroupPropertyListByCategory(category, count) {
    return EventGroupProperty.find({category: category}).limit(count);
}

export {
    retrieveEventGroupPropertyList, retrieveEventGroupPropertyListByCategory
}
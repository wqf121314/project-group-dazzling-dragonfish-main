import {EventGroup} from "../domain/EventGroup";

async function retrieveEventGroupList(count) {
    return EventGroup.find().populate({
        path: 'articles', populate: {path: 'article'}
    }).populate("property").limit(count).sort({"publish": -1});
}

async function retrieveEventGroupById(id) {
    return EventGroup.findById(id).populate({
        path: 'articles', populate: {path: 'article'}
    }).populate("property");
}

//根据 eventTitle 模糊搜索
async function retrieveEventGroupByEventTitle(title, count) {
    return EventGroup.find({eventTitle: {$regex: new RegExp(title, "i")}}).populate({
        path: 'articles', populate: {path: 'article'}
    }).populate("property").limit(count).sort({"publish": -1});
}


async function retrieveEventGroupByPropertyId(propertyId) {
    return EventGroup.find({property: propertyId}).populate({
        path: 'articles', populate: {path: 'article'}
    }).populate("property");
}

export {
    retrieveEventGroupList,
    retrieveEventGroupById,
    retrieveEventGroupByPropertyId,
    retrieveEventGroupByEventTitle
}
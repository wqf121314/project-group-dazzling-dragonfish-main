/**
 * For handling data differences between DB and webpage
 */

export default class EventGroupVo {

    getRecommendEventGroups(eventGroups) {
        const eventGroupList = []
        for (const event of eventGroups) {
            eventGroupList.push({
                id: event._id,
                eventTitle: event.eventTitle,
                image: event.image,
                publish: event.publish,
                description: event.description
            })
        }
        return {
            recommendEventGroup: {eventGroups: eventGroupList}
        }
    }

    getRecommendEventGroupsV2(hotWords, eventGroups) {
        const eventGroupList = []
        for (const event of eventGroups) {
            eventGroupList.push({
                id: event._id,
                eventTitle: event.eventTitle,
                image: event.image,
                publish: event.publish,
                description: event.description
            })
        }
        return {
            hotWords: hotWords,
            recommendEventGroup: {eventGroups: eventGroupList}
        }
    }

    getEventGroupById(eventGroup) {
        const newArticles = []
        for (const event of eventGroup.articles) {
            const imagesList = []
            imagesList.push({
                id: null,
                title: null,
                content: null,
                url: event.article.image
            })
            newArticles.push({
                id: event._id, //Event.ID not Article ID
                title: event.article.title,
                headline: event.article.description,
                authors: event.article.authors,
                images: imagesList,
                publish: event.article.publish
            })
        }
        const eventGroupProperty = {
            eventGroupType: eventGroup.property[0].category,
            eventGroupTypeDetail: eventGroup.property[0].category
        }
        return {
            eventGroup: {
                id: eventGroup._id,
                eventTitle: eventGroup.eventTitle,
                image: eventGroup.image,
                publish: eventGroup.publish,
                description: eventGroup.description,
                property: eventGroupProperty,
                articles: newArticles
            }
        }
    }
}
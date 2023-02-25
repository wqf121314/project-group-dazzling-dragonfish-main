/**
 * For handling data differences between DB and webpage
 */
export default class EventVo {
    //Process the data returned by the interface /:id
    getEventById(event) {
        const eventArticle = event.article;
        const imgList = []
        imgList.push({
            id: null, title: null, content: null, url: eventArticle.image
        },)
        return {
            property: {
                language: event.property.language,
                region: event.property.region,
                source: null,
                originalUrl: event.property.originalUrl,
                type: null,
                typeDetail: null,
                tags: event.property.tags
            }, article: {
                id: event._id,
                headline: eventArticle.title,
                authors: eventArticle.authors,
                description: eventArticle.description,
                images: imgList,
                publish: eventArticle.publish,
                content: eventArticle.content
            }
        }
    }
}

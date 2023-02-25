import fetchImageFromUnsplash from '../newsSource/fetchImages'
const log4js = require("../utils/log4js")

export default async function rawEventGroupParser(rawEventsObj, newsLanguage, newsRegion, newsCategory, dataSource){

    let eventsObjList = [];

    switch (dataSource){

        case 'google':
            eventsObjList = await parseDataFromGoogle(rawEventsObj, newsLanguage, newsRegion, newsCategory);
            break;
    }

    return eventsObjList;
}

async function parseDataFromGoogle(rawEventsObj, newsLanguage, newsRegion, newsCategory){
    const eventsObjList = [];
    log4js.info('[parseDataFromGoogle] google data rawEventGroupParser');
    

    try{
        for(let trends of rawEventsObj.storySummaries.trendingStories ){
            eventsObjList.push({
                eventTitle: trends.entityNames.join('•'),
                // image: trends.image.imgUrl,
                image: await fetchImageFromUnsplash(trends.entityNames.join('•'),"•"),
                description: trends.title,
                publish: new Date(),
                sources: trends.image.source,
                category: newsCategory,
                region: newsRegion,
                language: newsLanguage,
                hotWords: trends.entityNames,
                keyWords: trends.entityNames,
                articles: trends.articles
            });
            // console.log(trends);
        }
    }
    catch (e){
        log4js.error(e);
        return [];
    }

    return eventsObjList;
}
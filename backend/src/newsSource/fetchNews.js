
import axios from 'axios';
const log4js = require("../utils/log4js")
const config = require('config');


export default async function fetchNews(eventGroupObj,dataSource){

    let response = [];

    try{
        switch (dataSource){
            case "google":
                response = await fetchNewsFromNewsAPIWithGoogleKeyWords(eventGroupObj);
                return response;
                break;
        }
    }
    catch(e){
        log4js.error(e)
        log4js.error("[fetchNews] - fetching news from google or newsAPI fail")
        return eventGroupObj;
    }
    
    return eventGroupObj;
}

async function fetchNewsFromNewsAPI(eventGroupObj, simpleDate, language){

    let eventGroupObjWithEvents = [];
    let APIKey;
    log4js.info(eventGroupObj)

    try{
        APIKey = config.get("APIKey.newsAPI");
    }
    catch(e){
        log4js.error("[fetchNewsFromNewsAPI] - get API key fail")
        return [];
    }

    try{
        for (let eventGroup of eventGroupObj){
            try{
                const url = 'https://newsapi.org/v2/everything?' +
                            'q=+' + eventGroup.eventTitle + '&' +
                            'from=' + eventGroup.publish + '&' +  //2022-02-24
                            'searchIn=title&' +
                            'sortBy=popularity&' +
                            'language=' + eventGroup.language + '&'+
                            'apiKey=' + APIKey;

                log4js.debug('[fetchNewsFromNewsAPI] fetch url is: ', url);
                const events = await axios.get(url);
                eventGroup['articles'] = events;
                eventGroupObjWithEvents.push(eventGroup);
            }
            catch(e){
                log4js.error("[fetchNewsFromNewsAPI] - fetch newsAPI fail and skip adding into array")
            }
        }

        return JSON.parse(eventGroupObjWithEvents);
    }
    catch(e){
        log4js.error("[fetchNewsFromNewsAPI] - NewsAPI service fail")
        return [];
    }

}

async function fetchNewsFromNewsAPIWithGoogleKeyWords(eventGroupObj){

    log4js.info(eventGroupObj)
    log4js.debug('[fetchNewsFromNewsAPIWithGoogleKeyWords] fetch more news from NewsAPI');
    const NEWS_THRESHOLD = 10;
    let eventGroupObjWithEvents = [];
    let today_a_month_ago;
    let today_a_month_ago_str;

    try{
        today_a_month_ago = new Date(Date.now() - 29 * 24 * 3600 * 1000)
        today_a_month_ago_str = today_a_month_ago.getFullYear() +"-"+ String(today_a_month_ago.getMonth() + 1).padStart(2, '0') + "-" + String(today_a_month_ago.getDate()).padStart(2, '0');
    }catch (e){
        log4js.error("[fetchNewsFromNewsAPIWithGoogleKeyWords] - calculate a month agao function fails")
        today_a_month_ago = new Date.now()
        today_a_month_ago_str = today_a_month_ago.getFullYear() +"-"+ String(today_a_month_ago.getMonth() + 1).padStart(2, '0') + "-" + String(today_a_month_ago.getDate()).padStart(2, '0');
    }

    try{
        for (let eventGroup of eventGroupObj){
            log4js.info(eventGroup)
            let replaceAllSpacesAsPlus;
            let keyWordsList;
            let keyWordsListUpdate = [];
            let keyWordsListTopN = [];
            let queryStr = "";

            const lengthOfKeyWord = 2;            

            try{
                replaceAllSpacesAsPlus = eventGroup.eventTitle
                keyWordsList = replaceAllSpacesAsPlus.split('•');
            }
            catch(e){
                log4js.error('[fetchNewsFromNewsAPIWithGoogleKeyWords] - retrive event title fail')
                continue;
            }
            let pureKeywordArray =[];
            try{
                // update keyword list with special chars
                for (let keyWord of keyWordsList){
                    pureKeywordArray = keyWord.split(" ")
                    for(let pureKeyWord of pureKeywordArray){
                        if(pureKeyWord.match(/\W/g) == null){
                            keyWordsListUpdate.push(pureKeyWord);
                        }
                    }
                }
            }
            catch(e){
                log4js.error("[fetchNewsFromNewsAPIWithGoogleKeyWords] - purify keyword fail")
                continue;
            }

            try{
                // extract top n (lengthOfKeyWord) keywords 
                if (keyWordsListUpdate.length >= lengthOfKeyWord){
                    for (let keyWordIdx=0; keyWordIdx<lengthOfKeyWord; keyWordIdx++){
                        keyWordsListTopN.push(keyWordsListUpdate[keyWordIdx]);
                    }
                }
                else{
                    for (let keyWordIdx=0; keyWordIdx<keyWordsListUpdate.length; keyWordIdx++){
                        keyWordsListTopN.push(keyWordsListUpdate[keyWordIdx]);
                    }
                }
            }
            catch(e){
                log4js.error("[fetchNewsFromNewsAPIWithGoogleKeyWords] - extract top n keyword fail")
                continue;
            }

            // join query keywords

            queryStr = keyWordsListTopN.join('+');
            
            // build up query url
            let APIKey;
            try{
                APIKey = config.get("APIKey.newsAPI");
            }
            catch(e){
                log4js.error("[fetchNewsFromNewsAPIWithGoogleKeyWords] - get newsAPI key error")
                continue;
            }

            let url;
            let events;
            try{
                url = 'https://newsapi.org/v2/everything?' +
                            'q=' + queryStr + '&' +
                            'from=' + today_a_month_ago_str + '&' + 
                            'searchIn=title&' +
                            'sortBy=popularity&' +
                            'language=' + eventGroup.language + '&'+
                            'apiKey=' + APIKey;

                log4js.debug(`[fetchNewsFromNewsAPIWithGoogleKeyWords] - fetch url is: ${url}`);
                events = await axios.get(url);
            }
            catch(e){
                log4js.error("[fetchNewsFromNewsAPIWithGoogleKeyWords] - newsAPI data fetch error")
                continue;
            }

            
            if (events.data.totalResults <= NEWS_THRESHOLD && events.data.totalResults != 0){    // news count less than a threshold means search result is convergent
                let articlesList = [];
                for(let articles of events.data.articles){
                    articles.APISource = 'NewsAPI'
                    articlesList.push(articles)
                }
                eventGroup.articles = [...eventGroup.articles, ...articlesList ]
            }
            eventGroupObjWithEvents.push((eventGroup));
        }
    }
    catch(e){
        log4js.error("[fetchNewsFromNewsAPIWithGoogleKeyWords] - parsing event from group error")
        return eventGroupObj;
    }
    
    return eventGroupObjWithEvents;
}
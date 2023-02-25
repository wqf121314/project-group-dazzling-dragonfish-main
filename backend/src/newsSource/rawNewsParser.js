
import fetchImageFromUnsplash from '../newsSource/fetchImages'
import keyWordsExtraction from './keyWordsExtraction';
const log4js = require("../utils/log4js")

export default async function rawNewsParser(eventGroupObjWithEvents){

    let response = [];
    log4js.info(eventGroupObjWithEvents);
    response = await parseDataFromGoogle(eventGroupObjWithEvents);

    return response;
}


async function parseDataFromGoogle(rawEventsObj){

    let consistRawEventsObj = [];

    try{

        for(let eventGroup of rawEventsObj){
            let tempArticlesArray = [];
            let updatedContent = "";

            try{
                for(let article of eventGroup.articles){
                    switch(article.APISource){
                        case undefined:
                            let newsTitle = "";
                            
                            try{
                                log4js.debug('[parseDataFromGoogle] initial puppeteer')
                                const puppeteer = require('puppeteer');
                                const browser = await puppeteer.launch();
                                const page = await browser.newPage();
                                await page.goto(article.url, {waitUntil: 'load', timeout: 30000})
                                newsTitle = await page.title();
                                await browser.close();
                                log4js.debug('[parseDataFromGoogle] close puppeteer')
                            }catch(e){
                                log4js.error("[parseDataFromGoogle] - google - parsing title information from web timeout")
                                newsTitle = article.articleTitle;
                            }
                            
                            
                            try{
                                updatedContent = await getWebContent(article.url,article.snippet);
                            }
                            catch (e){
                                log4js.error("[parseDataFromGoogle] - google - parsing news content from web fail")
                                updatedContent = article.url,article.snippet;
                            }
                            
                            try{
                                tempArticlesArray.push({
                                    title: rmHtmlChar(newsTitle), //article.articleTitle,
                                    authors: article.source,
                                    description: rmHtmlChar(updatedContent).split(".")[0] + ".", //article.snippet,
                                    publish: trueDateTimeTransfer(eventGroup.publish, article.time),
                                    content: rmHtmlChar(updatedContent), //article.snippet,
                                    image: await fetchImageFromUnsplash(rmHtmlChar((eventGroup.keyWords).join(",")),","),
                                    language: eventGroup.language,
                                    region: eventGroup.region,
                                    originalUrl: article.url,
                                    sources: article.source,
                                    category: eventGroup.category,
                                    tags: keyWordsExtraction(rmHtmlChar(newsTitle))
                                });
                            }
                            catch(e){
                                log4js.error("[parseDataFromGoogle] - google - adding news into array fail")
                            }

                            break;
                        case "NewsAPI":

                            try{
                                updatedContent = await getWebContent(article.url,article.content);
                            }
                            catch(e){
                                log4js.error("[parseDataFromGoogle] - NewsAPI - parsing news content from web fail")
                                updatedContent = article.url,article.content;
                            }
                            try{
                                tempArticlesArray.push({
                                    title: rmHtmlChar(article.title),
                                    authors: article.author,
                                    description: rmHtmlChar(updatedContent).split(".")[0] + ".", //article.description,
                                    publish: article.publishedAt,
                                    content: rmHtmlChar(updatedContent), //article.content,
                                    // image: article.urlToImage,
                                    image: await fetchImageFromUnsplash(keyWordsExtraction(rmHtmlChar(article.title)).join(','),","),
                                    language: eventGroup.language,
                                    region: eventGroup.region,
                                    originalUrl: article.url,
                                    sources: article.source.name,
                                    category: eventGroup.category,
                                    tags: keyWordsExtraction(rmHtmlChar(article.title))
                                }); 
                            }
                            catch (e){
                                log4js.error("[parseDataFromGoogle] - NewsAPI - adding news into array fail")
                            }
                        
                            break;
                    }
                }
            }
            catch (e){
                log4js.error('[parseDataFromGoogle] parsing articles of specific rawEventsObj error')
            }


            
            eventGroup.articles = tempArticlesArray;
            consistRawEventsObj.push(eventGroup);
        }
    }
    catch(e){
        log4js.error('[parseDataFromGoogle] parsing entire rawEventsObj error')
    }


    return consistRawEventsObj;
}

function trueDateTimeTransfer(baseDate, timeString){
    
    //split time string, the origin format is "X Day/Days/Hours/Hours/Minutes/Minute ago"

    const currentTimeDate = Date.parse(baseDate);
    const timeStringArray = timeString.split(" ");
    let secondDifference = 0;
    switch(timeStringArray[1]){
        case 'day':
            secondDifference = 60 * 60 * 24; 
            break;
        case 'days':
            secondDifference = 60 * 60 * 24 * parseInt(timeStringArray[0]);
            break;
        case 'hour':
            secondDifference = 60 * 60;
            break;
        case 'hours':
            secondDifference = 60 * 60 * parseInt(timeStringArray[0]);
            break;
        case 'minute':
            secondDifference = 60;
            break;
        case 'minutes':
            secondDifference = 60 * parseInt(timeStringArray[0]);
            break;
        case 'second':
            secondDifference = 1;
            break;
        case 'seconds':
            secondDifference = parseInt(timeStringArray[0]);
            break;
    }
    

    const updateDate = new Date();
    updateDate.setTime(currentTimeDate-secondDifference*1000);

    return (updateDate);
}

async function getWebContent(url, oriContent){

    //get content slice exclude previous 2 sentences (try to avoid rewrite sentence)

    const keyWordList = oriContent.split(",");
    let keyWord = "";
    if ( keyWordList.length >= 3 ) keyWord = keyWordList[2];
    else keyWord = keyWordList[0];

    
    let matchedContent = "";
    let matchedSize = 99999; // try to minimize the scope

    try {
        log4js.debug('[getWebContent] initial puppeteer - for web content purpose')
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, {waitUntil: 'load', timeout: 30000})
        const divList = await (await page.$('body')).$$('div')
        const pList = await (await page.$('body')).$$('p')
        
    
        for (let content of divList){
            let valueHandle = await content.getProperty('innerText');
            let innerText = await valueHandle.jsonValue();
    
            if (innerText.includes(keyWord) && innerText.length<matchedSize){
                matchedContent = innerText;
                matchedSize = innerText.length;
            }
        }
    
        for (let content of pList){
            let valueHandle = await content.getProperty('innerText');
            let innerText = await valueHandle.jsonValue();
    
            if (innerText.includes(keyWord) && innerText.length<matchedSize){
                matchedContent = innerText;
                matchedSize = innerText.length;
            }
        }

        await browser.close();
    } catch (err){
        log4js.error(`[getWebContent] Puppeteer timeout when access URL: ${url}`)
    }
 

    if (matchedContent.length + 15 < oriContent.length){  //nothing more
        //replace "..."
        log4js.error(`[getWebContent] news nomatch: ${url}`)
        return oriContent.replace("...","")
    }
    else{
        return matchedContent;
    }
}

function rmHtmlChar(oriString){

    let updatedString = oriString.replaceAll("&nbsp;"," ");
    updatedString = updatedString.replaceAll("&amp;","&");
    updatedString = updatedString.replaceAll("&quot;","\"");
    updatedString = updatedString.replaceAll("&lt;","<");
    updatedString = updatedString.replaceAll("&gt;",">");
    updatedString = updatedString.replaceAll("&gt;",">");
    updatedString = updatedString.replaceAll("&prime;","'");
    updatedString = updatedString.replaceAll("&#39;","'");
    updatedString = updatedString.replaceAll("...","");
    updatedString = updatedString.replaceAll("…","");
    updatedString= updatedString.replaceAll(/\[\+.*/g,"");
    return updatedString
    
}

import axios from 'axios';
const log4js = require("../utils/log4js")
const config = require('config');


export default async function fetchImageFromUnsplash(keyWordList, spliter){

    const defaultURL = "https://www.rnz.co.nz/assets/news/88747/eight_col_uni_of_auckland.jpg?1478597590"
    let resultURL = "";
    let searchKeywordsList;
    let APIKey;

    try{
        searchKeywordsList = keyWordList.split(spliter);
    }
    catch (e){
        log4js.error('[fetchImageFromUnsplash] - keyword list splitting error')
        return defaultURL;
    }

    try{
        APIKey = config.get("APIKey.unsplash");
    }
    catch (e){
        log4js.error('[fetchImageFromUnsplash] - get API configuration error')
        return defaultURL;
    }

    try{
        for (let keyIdx =0; keyIdx<searchKeywordsList.length; keyIdx++){
            let url = 'https://api.unsplash.com/search/photos?' +
            'client_id=' + APIKey + '&' +
            'query=' + searchKeywordsList[keyIdx] + '&' +
            'orientation=landscape'
            log4js.debug(`[fetchImageFromUnsplash] fetch url is:  ${url}`);
            try{
                resultURL = await axios.get(url);
                if (resultURL.data.total!=0){
                    // try every keyword, if can fetch result then return it immediately
                    const randomIdx = Math.floor(Math.random() * (10));
                    return (resultURL.data.results[randomIdx].urls.raw)
                }
            } catch (error) {
                log4js.error(`[fetchImageFromUnsplash] ${error.message}`)
            }
        }
    }
    catch (e){
        log4js.error('[fetchImageFromUnsplash] - fetch image error')
        return defaultURL;
    }

    // if something uncatched, return default
    return defaultURL
}

import axios from 'axios';
import googleTrends from 'google-trends-api';
const log4js = require("../utils/log4js")

export default async function fetchHeadlineNews(country, category, dataSource){
    // country could be: ant 2-letter ISO 3166-1 code auch as nz, au, and us
    // category could be: business, entertainment, general, health, science, sports, technology

    const queryCountry = country ? country : 'US';
    const queryCategory = category? category : 'business'
    log4js.info(`[fetchHeadlineNews] Fetch headline news by country ${country}, ${category} `)
    let response = [];

    try{
        switch(dataSource){

            case 'google':
                response = await fetchDataFromGoogleTrendsAPI(queryCountry,queryCategory);
                break;
        }
    }
    catch (e){
        log4js.error('[fetchHeadlineNews] - fetch headline news error')
    }

    return response;

}


async function fetchDataFromGoogleTrendsAPI(queryCountry,queryCategory){


    const categoryMapping = {
        business: 'b',
        science: 't',
        health: 'm',
        sports: 's',
        headlines: 'h',
        entertainment: 'e',
        all: 'all'
    };

    try{
        const googleTrendsResult = await googleTrends.realTimeTrends({
                                    geo: queryCountry.toUpperCase(),
                                    category: categoryMapping[queryCategory]});
        return JSON.parse(googleTrendsResult);
    }
    catch (e){
        log4js.error(e);
        log4js.error('[fetchDataFromGoogleTrendsAPI] - fetch google trend API fails')
        return [];
    }


}

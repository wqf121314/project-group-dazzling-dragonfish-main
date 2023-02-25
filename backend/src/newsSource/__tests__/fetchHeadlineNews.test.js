// Import testing JS file
import fetchHeadlineNews from "../fetchHeadlineNews";

const log4js = require("../../utils/log4js")

let country;
let category;
let dataSource;

describe ('Test abnormal input', ()=>{

    it ('Input: falsy arguments', async ()=>{
        const falsyList = [false, null, undefined, [], ""]
        for (let testCase of falsyList){
            const response = await fetchHeadlineNews(testCase);
            expect(response).toEqual([]);
        }
    });

    it ('Input: Some abnormal argument but at least an argument is correct - given first argument ', async ()=>{
        const response = await fetchHeadlineNews('nz', undefined, undefined);
        expect(response).toEqual([]);
    });

    it ('Input: Some abnormal argument but at least an argument is correct - given second argument', async ()=>{
        const response = await fetchHeadlineNews(undefined, 'business', null);
        expect(response).toEqual([]);
    });

    it ('Input: Some abnormal argument but at least an argument is correct - given third argument', async ()=>{
        const response = await fetchHeadlineNews(undefined, undefined, 'google');
        expect(response).not.toEqual([]);
    });

    it ('Input: all arguments but non exist category code', async ()=>{
        const response = await fetchHeadlineNews(undefined, "life", 'google');
        expect(response).toEqual([]);
    });

    it ('Input: all arguments but non exist country code', async ()=>{
        const response = await fetchHeadlineNews("abc", undefined, 'google');
        expect(response).toEqual([]);
    });

});

describe ('Test normal input', ()=>{

    it ('Default option should be work - US/b', async ()=>{
        const response = await fetchHeadlineNews(undefined, undefined, 'google');
        const url = new URL(response.storySummaries.trendingStories[0].shareUrl);
        const responseCategory = url.searchParams.get("category")
        const responseCountry = url.searchParams.get("geo")

        expect(responseCategory).toEqual("b");
        expect(responseCountry).toEqual("US");
    });

    it ('Some of option without input should use default option - b', async ()=>{
        const response = await fetchHeadlineNews("nz", undefined, 'google');
        const url = new URL(response.storySummaries.trendingStories[0].shareUrl);
        const responseCategory = url.searchParams.get("category")
        const responseCountry = url.searchParams.get("geo")

        expect(responseCategory).toEqual("b");
        expect(responseCountry).toEqual("NZ");
    });

    it ('Some of option without input should use default option - US', async ()=>{
        const response = await fetchHeadlineNews(undefined, "headlines", 'google');
        const url = new URL(response.storySummaries.trendingStories[0].shareUrl);
        const responseCategory = url.searchParams.get("category")
        const responseCountry = url.searchParams.get("geo")

        expect(responseCategory).toEqual("h");
        expect(responseCountry).toEqual("US");
    });

    it ('Normal input', async ()=>{
        const response = await fetchHeadlineNews("nz", "headlines", 'google');
        const url = new URL(response.storySummaries.trendingStories[0].shareUrl);
        const responseCategory = url.searchParams.get("category")
        const responseCountry = url.searchParams.get("geo")
        const articlesLength = (response.storySummaries.trendingStories[0].articles).length

        expect(responseCategory).toEqual("h");
        expect(responseCountry).toEqual("NZ");
        expect(articlesLength).toBeGreaterThan(0);
    });

});
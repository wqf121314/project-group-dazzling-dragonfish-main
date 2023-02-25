// Import testing JS file
import { ConsoleMessage } from "puppeteer";
import fetchNews from "../fetchNews";

let eventGroupObj;

beforeAll(()=>{
    eventGroupObj = [{
        eventTitle: 'Eating disorder•Mental health•Anorexia nervosa',
        image: 'https://images.unsplash.com/photo-1580287192918-f83a5b8a2c8a?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHwyfHxFYXRpbmclMjBkaXNvcmRlcnxlbnwwfDB8fHwxNjUyMDkxNzI5&ixlib=rb-1.2.1',
        description: 'Eating disorder, Mental health, Anorexia nervosa',
        publish: new Date("2022-05-09T10:25:11.790Z"),
        sources: 'New Zealand Herald',
        category: 'health',
        region: 'nz',
        language: 'en',
        hotWords: [ 'Eating disorder', 'Mental health', 'Anorexia nervosa' ],
        keyWords: [ 'Eating disorder', 'Mental health', 'Anorexia nervosa' ],
        articles: [ 
            {
                articleTitle: 'Explainer: Why are there so many new Omicron sub-variants, like BA.4 and BA.5?',
                url: 'https://www.rnz.co.nz/news/national/466765/explainer-why-are-there-so-many-new-omicron-sub-variants-like-ba-4-and-ba-5',
                source: 'RNZ',
                time: '2 hours ago',
                snippet: 'But a viral lineage is not labelled a variant until it has accumulated several unique mutations known to enhance the ability of the virus to transmit and/or cause more severe disease. This was the case for&nbsp;...'
            },
            {
                articleTitle: 'Covid breakthrough: Researchers develop vaccine PILL in &#39;substantial&#39; step to combat virus',
                url: 'https://www.express.co.uk/news/science/1607455/covid-breakthrough-researchers-develop-vaccine-pill-combat-virus',
                source: 'Daily Express',
                time: '29 minutes ago',
                snippet: 'A PILL-BASED Covid vaccine has shown promise in preliminary trials - both helping to protect against severe infections and reduce transmission in hamsters and eliciting strong antibody responses.'
            }
         ]
      }]
});


describe("Test abnormal input",()=>{

    it ('Input: falsy arguments', async ()=>{
        const falsyList = [false, null, undefined, [], ""]
        for (let testCase of falsyList){
            const response = await fetchNews(testCase);
            console.log(` case: ${testCase}, with response: ${response}`)
            expect(response).toEqual(testCase);
        }
    });

    it ('Input: One argument is valid but the other one is incorrect - no data object', async ()=>{
        const response = await fetchNews( undefined, "google");
        expect(response).toEqual(undefined);
    });

    it ('Input: One argument is valid but the other one is incorrect - no dataSource', async ()=>{
        const response = await fetchNews(eventGroupObj, undefined);
        // console.log(response);
        expect(response).toEqual(eventGroupObj);
    });

    it ('Input: One argument is valid but the other one is incorrect - wrong dataSource', async ()=>{
        const response = await fetchNews(eventGroupObj, "apple");
        // console.log(response);
        expect(response).toEqual(eventGroupObj);
    });

    
});


it ('Normal input', async ()=>{
    const response = await fetchNews( eventGroupObj, "google");
    expect(response).toEqual(eventGroupObj);
});

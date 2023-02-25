//Import testing JS file

import rawEventGroupParser from "../rawEventGroupParser";

/* This function tends to consolidate eventGroup data object into unique format
*  Here, we only focus to test the main interface "rawEventGroupParser()" to make
*  sure the outcome is as expected.
*/
let mockDataObjectFromGoogle;
let mockDataObjectFromNewsAPI;

beforeEach(async ()=>{
    mockDataObjectFromGoogle = [{
            storySummaries:{
                trendingStories:
                [
                    {
                        image: {
                          newsUrl: 'https://www.iol.co.za/lifestyle/health/diet/how-much-extra-vitamin-c-is-essential-for-good-health-baa9b7b2-0b69-5f87-88f0-6d92f4a445c2',
                          source: 'Independent Online',
                          imgUrl: '//t1.gstatic.com/images?q=tbn:ANd9GcTy0nO75dvfkqb1Q0ng9bdC8fpYqRijVJTHSnhUkDiV-cPZgZYJZSVnzEHmarMiiY3JCwqpl6P_VZc'
                        },
                        shareUrl: 'https://trends.google.com/trends/trendingsearches/realtime?id=NZ_lnk_m6oWXwEwAACMRM_en&category=m&geo=NZ#NZ_lnk_m6oWXwEwAACMRM_en',
                        articles: [
                          {
                            articleTitle: 'How much extra vitamin C is essential for good health?',
                            url: 'https://www.iol.co.za/lifestyle/health/diet/how-much-extra-vitamin-c-is-essential-for-good-health-baa9b7b2-0b69-5f87-88f0-6d92f4a445c2',
                            source: 'Independent Online',
                            time: '13 hours ago',
                            snippet: 'The pandemic is largely responsible for advocating the idea of proper intake of vitamin C, known as an important immune-support nutrient and vital in helping the body protect itself from severe viral illnesses. But how much is the right&nbsp;...'
                          },
                          {
                            articleTitle: 'How Much Vitamin C Do You Need For Good Health And If You Are Overweight? This New Study Reveals For First Time',
                            url: 'https://www.india.com/health/vitamin-c-healthy-living-boost-immunity-how-much-vitamin-c-for-good-health-if-you-are-overweight-new-study-reveals-first-time-5376148/',
                            source: 'India.com',
                            time: '14 hours ago',
                            snippet: 'People have become rather aware of proper intake of Vitamin C, thanks to the COVID-19 pandemic. Vitamin C is an important immune-support nutrient and is vital in helping the body protect itself from severe viral illnesses.'
                          }
                        ],
                        idsForDedup: [ '/m/07zqy /m/07zry', '/m/07zqy /m/0hk_v', '/m/07zry /m/0hk_v' ],
                        id: 'NZ_lnk_m6oWXwEwAACMRM_en',
                        title: 'Vitamin, Vitamin C, Nutrient',
                        entityNames: [ 'Vitamin', 'Vitamin C', 'Nutrient' ]
                    }                 
                ]
            }}
    ];
});

it('feed incorrect data objects: undefined as input', async ()=>{
    // if there is any error, the function will return an empty array
    expect(await rawEventGroupParser(undefined)).toEqual([]);
});

it('feed incorrect data objects: multi-undefined as input', async ()=>{
    // if there is any error, the function will return an empty array
    expect(await rawEventGroupParser(undefined,undefined,undefined,undefined,undefined)).toEqual([]);
});

it('feed incorrect data objects: all undefined arguments except dataSource as input (google)', async ()=>{
    // if there is any error, the function will return an empty array
    expect(await rawEventGroupParser(undefined,undefined,undefined,undefined, "google")).toEqual([]);
});

it('feed incorrect data objects: all undefined arguments except dataSource as input (truthy)', async ()=>{
    // if there is any error, the function will return an empty array
    expect(await rawEventGroupParser(undefined,undefined,undefined,undefined, true)).toEqual([]);
});

it('feed non exist data object and data source as input (newsAPI) but no others arguments', async ()=>{
    // if there is any error, the function will return an empty array
    expect(await rawEventGroupParser(mockDataObjectFromNewsAPI,undefined,undefined,undefined, "newsAPI")).toEqual([]);
});

it('feed normal data object, data source, and other arguments as input (google)', async ()=>{
    // if there is any error, the function will return an empty array
    const response = await rawEventGroupParser(mockDataObjectFromGoogle[0],"en","nz","business", "google");
    const mockTitle = (mockDataObjectFromGoogle[0].storySummaries.trendingStories[0].entityNames).join('•')

    expect(response[0].category).toEqual("business");
    expect(response[0].language).toEqual("en");
    expect(response[0].region).toEqual("nz");
    expect(response[0].image).not.toBe(null);
    expect(response[0].eventTitle).toBe(mockTitle);
    
});

it('feed normal data object, data source, and other arguments with special chars as input (google)', async ()=>{
    // if there is any error, the function will return an empty array
    const response = await rawEventGroupParser(mockDataObjectFromGoogle[0],"@#$%#%^","G$#V&%B&^&*#@@@@@$4","&nbsp;", "google");
    const mockTitle = (mockDataObjectFromGoogle[0].storySummaries.trendingStories[0].entityNames).join('•')

    expect(response[0].category).toEqual("&nbsp;");
    expect(response[0].language).toEqual("@#$%#%^");
    expect(response[0].region).toEqual("G$#V&%B&^&*#@@@@@$4");
    expect(response[0].image).not.toBe(null);
    expect(response[0].eventTitle).toBe(mockTitle);
    
});

it('feed normal data object, data source, and other arguments with some nulls as input (google)', async ()=>{
    // if there is any error, the function will return an empty array
    const response = await rawEventGroupParser(mockDataObjectFromGoogle[0],null,"G$#V&%B&^&*#@@@@@$4","&nbsp;", "google");
    const mockTitle = (mockDataObjectFromGoogle[0].storySummaries.trendingStories[0].entityNames).join('•')

    expect(response[0].category).toEqual("&nbsp;");
    expect(response[0].language).toBe(null);
    expect(response[0].region).toEqual("G$#V&%B&^&*#@@@@@$4");
    expect(response[0].image).not.toBe(null);
    expect(response[0].eventTitle).toBe(mockTitle);
    
});
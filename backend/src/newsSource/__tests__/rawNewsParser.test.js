// Import testing JS file
import rawNewsParser from "../rawNewsParser";

// mock test data object

let mockDataObject = [{
    eventTitle: 'Ovarian cancer•Ovary',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixid=MnwzMTg0OTd8MHwxfHNlYXJjaHw2fHxPdmFyaWFuJTIwY2FuY2VyfGVufDB8MHx8fDE2NTE4NDE5MTY&ixlib=rb-1.2.1',
    description: 'Ovarian cancer, Ovary',
    publish: new Date("2022-05-07T03:51:47.930Z"),
    sources: 'Daily Express',
    category: 'health',
    region: 'nz',
    language: 'en',
    hotWords: [ 'Ovarian cancer', 'Ovary' ],
    keyWords: [ 'Ovarian cancer', 'Ovary' ],
    articles: [
        {
            articleTitle: 'Album Review: Chelsea Jade – Soft Spot...',
            url: 'https://music.mxdwn.com/2022/05/06/reviews/album-review-chelsea-jade-soft-spot/',
            source: 'mxdwn.com',
            time: '16 hours ago',
            snippet: 'Jade&#39;s Soft Spot for innovation In Chelsea Jade&#39;s newly released album Soft Spot, it is safe to say that she has found her sweet spot. Jade, born in South Africa and raised in New Zealand, released her second album just in time for warm days and breezy&nbsp;...'
        },
        {
            source: { id: null, name: 'Exystence.net' },
            author: 'exy',
            title: 'Chelsea Jade – Soft Spot (2022)',
            description: 'Both the new Soft Spot and 2018’s Personal Best, Chelsea Jade’s debut LP, open with brief introductory title tracks, and the contrast between them is as good a place as any to start parsing out the subtle difference in tone between the two records. The overtl…',
            url: 'http://exystence.net/blog/2022/05/05/chelsea-jade-soft-spot-2022/',
            urlToImage: null,
            publishedAt: '2022-05-05T07:49:56Z',
            content: 'Both the new Soft Spot and 2018s Personal Best, Chelsea Jades debut LP, open with brief introductory title tracks, and the contrast between them is as good a place as any to start parsing out the sub… [+3329 chars]',
            APISource: 'NewsAPI'
          }
    ]
}];

it ('Test abnormal input: falsy input', async ()=>{
    const falsyList = [false, null, undefined, [], ""]
    for (let testCase of falsyList){
        const response = await rawNewsParser(testCase);
        expect(response).toEqual([]);
    }
})



describe ('Test normal input by mock data object', ()=>{
    let response, filterSpcialChars;

    beforeAll( async ()=>{

        response = (await rawNewsParser(mockDataObject))[0]
        filterSpcialChars = ["&nbsp;","&amp;","&quot;","&lt;","&gt;","&prime;"
                            ,"&#39;","...","…"]
    },60000)

    it ('Event group content should be the same as it input', ()=>{
        expect(response.eventTitle).toBe(mockDataObject[0].eventTitle)
        expect(response.image).toBe(mockDataObject[0].image)
        expect(response.description).toBe(mockDataObject[0].description)
        expect(response.publish).toEqual(mockDataObject[0].publish)
        expect(response.sources).toEqual(mockDataObject[0].sources)
        expect(response.category).toEqual(mockDataObject[0].category)
        expect(response.region).toEqual(mockDataObject[0].region)
        expect(response.language).toEqual(mockDataObject[0].language)
        expect(response.hotWords).toEqual(mockDataObject[0].hotWords)
        expect(response.keyWords).toEqual(mockDataObject[0].keyWords)
    })

    it ('Article title should only contain letters', ()=>{
        const responseArticleGoogle = response.articles[0].title;
        const responseArticleNewsAPI = response.articles[1].title;

        for (let specialChar of filterSpcialChars){
            expect(responseArticleGoogle).toEqual(expect.not.stringContaining(specialChar))
            expect(responseArticleNewsAPI).toEqual(expect.not.stringContaining(specialChar))
        }

    })

    it ('Article description should only contain letters', ()=>{
        const responseArticleGoogle = response.articles[0].description;
        const responseArticleNewsAPI = response.articles[1].description;

        for (let specialChar of filterSpcialChars){
            expect(responseArticleGoogle).toEqual(expect.not.stringContaining(specialChar))
            expect(responseArticleNewsAPI).toEqual(expect.not.stringContaining(specialChar))
        }

    })

    it ('Article content should only contain letters', ()=>{
        const responseArticleGoogle = response.articles[0].content;
        const responseArticleNewsAPI = response.articles[1].content;

        for (let specialChar of filterSpcialChars){
            expect(responseArticleGoogle).toEqual(expect.not.stringContaining(specialChar))
            expect(responseArticleNewsAPI).toEqual(expect.not.stringContaining(specialChar))
        }

    })

    it ('Article tags should only contain letters', ()=>{
        const responseArticleGoogle = response.articles[0].tags;
        const responseArticleNewsAPI = response.articles[1].tags;
        for (let specialChar of filterSpcialChars){
            for (let tag of responseArticleGoogle){
                expect(tag).toEqual(expect.not.stringContaining(specialChar))
            }
            for (let tag of responseArticleNewsAPI){
                expect(tag).toEqual(expect.not.stringContaining(specialChar))
            }
        }
    })

    it('Article image should be update by fetchImageFromUnsplash()', ()=>{
        const responseArticleGoogle = response.articles[0].image;
        const responseArticleNewsAPI = response.articles[1].image;
        expect(responseArticleGoogle).not.toBe(null)
        expect(responseArticleNewsAPI).not.toBe(null)
    })

    it('Article publish time should be a valid Date object', ()=>{
        const responseArticleGoogle = new Date(response.articles[0].publish);
        const responseArticleNewsAPI = new Date(response.articles[1].publish);
        expect(responseArticleGoogle).toBeInstanceOf(Date);
        expect(responseArticleNewsAPI).toBeInstanceOf(Date);
    })


})





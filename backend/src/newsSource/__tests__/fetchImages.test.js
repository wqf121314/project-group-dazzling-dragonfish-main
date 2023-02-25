// Import testing JS file
import fetchImages from '../fetchImages'

let keywordListNormal = [];
let keywordListAbnormal = [];
const spliter = "," 
const defaultImageURL = "https://www.rnz.co.nz/assets/news/88747/eight_col_uni_of_auckland.jpg?1478597590";

beforeAll( ()=>{
    keywordListNormal = 'Ovarian cancer,Ovary';
    keywordListAbnormal = '+-&%#@@,Apple';
})

describe ('Test abnormal input', ()=>{

    it ('Input: falsy arguments', async ()=>{
        const falsyList = [false, null, undefined, [], ""]
        for (let testCase of falsyList){
            const response = await fetchImages(testCase);
            expect(response).toEqual(defaultImageURL);
        }
    })

    it ('Input: Some abnormal keyword but at least one keyword is normal', async ()=>{
        const response = await fetchImages(keywordListAbnormal, ",");
        expect(response).not.toEqual(defaultImageURL);
    })

    it ('Input: Some abnormal keyword but at least one keyword is normal but not input spliter', async ()=>{
        const response = await fetchImages(keywordListAbnormal);
        expect(response).toEqual(defaultImageURL);
    })
})

it ('Input: Normal keyword with correct spliter', async ()=>{
    const response = await fetchImages(keywordListNormal);
    expect(response).not.toEqual(defaultImageURL);
})

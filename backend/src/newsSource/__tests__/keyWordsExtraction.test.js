// Import testing JS file
import keyWordsExtraction from "../keyWordsExtraction";

/* This function tends to extract keyword list from a sentence
*  The test function will focus on whatever input, the result 
*  either an empty array or an array contain numbers of keywords.
*/

it ('Test abnormal input: falsy input', ()=>{
    const falsyList = [false, null, undefined]
    for (let testCase of falsyList){
        const response = keyWordsExtraction(testCase);
        expect(response).toEqual([]);
    }
})

it ('Test abnormal input: non string input', ()=>{
    const falsyList = [false, null, undefined]
    const response = keyWordsExtraction(falsyList);
    expect(response).toEqual([]);
})

it ('Test normal string input but with mixed wrong coding', ()=>{
    const inputStr = "å®èç¢¼ï¼è¨ and è³¼äººææ©èç¢¼ï¼"
    const response = keyWordsExtraction(inputStr);
    expect(response).toEqual([]);
})

it ('Test normal string input but wrong coding', ()=>{
    const inputStr = "å®èç¢¼ï¼è¨è³¼äººææ©èç¢¼ï¼"
    const response = keyWordsExtraction(inputStr);
    expect(response).toEqual([]);
})

it ('Test normal string but empty', ()=>{
    const inputStr = ""
    const response = keyWordsExtraction(inputStr);
    expect(response).toEqual([]);
})

it ('Test normal string input', ()=>{
    const inputStr = "University of Auckland is my home"
    const response = keyWordsExtraction(inputStr);
    expect(response).toEqual(['University', 'Auckland','home']);
})

it ('Test normal string input', ()=>{
    const inputStr = "University of Auckland can enrol 6 classes per semester"
    const response = keyWordsExtraction(inputStr);
    // n-gram test
    expect(response).toEqual(['University','Auckland','enrol classes', 'semester' ]);
})

it ('Test normal string input', ()=>{
    const inputStr = "University of Auckland - is my %home"
    const response = keyWordsExtraction(inputStr);
    // the function will remove non word character, after keyword extraction
    // we will have three keywords: "University", "Auckland -" , "%home"
    // we these keywords pass through the filter, only first keyword will still there.
    expect(response).toEqual(['University']);
})







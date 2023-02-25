import keyword_extractor  from 'keyword-extractor';
const log4js = require("../utils/log4js")

export default function keyWordsExtraction(sentence){

    // extract keyword by "keyword-extractor"
    // reference page: https://www.npmjs.com/package/keyword-extractor
    // install guide: $ npm install keyword-extractor

    let extraction_result = [];
    
    try{
        extraction_result = keyword_extractor.extract(sentence,{
            language:"english",
            remove_digits: true,
            return_changed_case: false,
            remove_duplicates: true,
            return_max_ngrams: 3 
        });

        log4js.debug(`[keyWordsExtraction] extract keywords finish with total ${extraction_result.length} keyword in the list`)
        return removeRedundantKeyWords(extraction_result);
    }catch (err){
        log4js.error(`[keyWordsExtraction] extract keywords error due to ${err}`)
        return [];
    }
}

function removeRedundantKeyWords(oriKeyWordsList){

    let filteredKeyWordsList = [];
    for ( let keyword of oriKeyWordsList) {
        const excludeReg = /\W/i;
        const matchResult = keyword.match(excludeReg);
        if (matchResult == null){
            filteredKeyWordsList.push(keyword);
        }else{
            const tempVerifiedArray = keyword.split(" ");
            let failCount = 0;
            for (let tempKeyWord of tempVerifiedArray){
                const verifiedMatchResult = tempKeyWord.match(excludeReg);
                if (verifiedMatchResult != null){
                    failCount += 1;
                }
            }
            if (failCount==0){
                filteredKeyWordsList.push(keyword);
            }
        }
    }
    return filteredKeyWordsList;
} 




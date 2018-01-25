/**
 * 
 * parseSearchResult.js
 * 
 * 
 * 
 */

const parseSearchResult = (searchResult, maxLength) => {
    let ptr = 0;
    let len = 0;
    let isInBracket = true;

    while (len <= maxLength) {
        if (ptr >= searchResult.length) {
            return searchResult.length;
        }

        if (isInBracket && searchResult[ptr] == '>') {
            isInBracket = false;
            ptr++;
        } else if (!isInBracket && searchResult[ptr] == '<') {
            isInBracket = true;
            ptr++;
        } else if (isInBracket) {
            ptr++;
        } else {
            ptr++;
            len++;
        }
    }
    return ptr;
};

module.exports = {
    parseSearchResult
};

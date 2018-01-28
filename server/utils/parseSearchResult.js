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
        } else if (!isInBracket && searchResult[ptr] == '<') {
            isInBracket = true;
        } else if (isInBracket) {
            // Do nothing.
        } else {
            len++;
        }
        ptr++;
    }
    return ptr;
};

module.exports = {
    parseSearchResult
};

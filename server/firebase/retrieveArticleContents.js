/**
 * 
 * retrieveArticleContents.js
 * 
 * This module uploads retrives the markdown content of a particular article (public url).
 * 
 */

const BUCKET_NAME = 'algorithm-helper-storage.appspot.com';

const retrieveArticleContents = (gcsStorage, filePath) => {
    const gcsStorageBucket = gcsStorage.bucket(BUCKET_NAME);
    const file = gcsStorageBucket.file(filePath);

    return new Promise((resolve, reject) => {
        file.download({
            destination: './temp/temp.md'
        })
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    retrieveArticleContents
};

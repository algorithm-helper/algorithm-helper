/**
 * 
 * retrieveArticleSignedUrl.js
 * 
 * This module uploads retrives the signed url of a particular article (public url).
 * 
 */

const BUCKET_NAME = 'algorithm-helper-storage.appspot.com';

const retrieveArticleSignedUrl = (gcsStorage, filePath) => {
    const gcsStorageBucket = gcsStorage.bucket(BUCKET_NAME);
    const file = gcsStorageBucket.file(filePath);

    return new Promise((resolve, reject) => {
        file.getSignedUrl({
            action: 'read',
            expires: '03-09-2491'
        })
        .then((signedUrls) => {
            resolve(signedUrls[0]);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    retrieveArticleSignedUrl
};

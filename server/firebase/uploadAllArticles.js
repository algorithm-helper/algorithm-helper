/**
 * 
 * uploadAllArticles.js
 * 
 * This module uploads all articles from the content/categories/ folder to Firebase.
 * 
 */

const BUCKET_NAME = 'algorithm-helper-storage.appspot.com';

const uploadAllArticles = (gcsStorage, urls) => {
    const gcsStorageBucket = gcsStorage.bucket(BUCKET_NAME);

    urls.forEach((url) => {
        gcsStorageBucket
            .upload(url.src, {
            destination: url.dest
            })
            .then(() => {
                console.log(`[*]: ${url.src} uploaded to Firebase.`);
            })
            .catch((err) => {
                console.log(err);
            });
    });    
};

module.exports = {
    uploadAllArticles
};

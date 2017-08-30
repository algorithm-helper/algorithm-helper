/**
 * 
 * isValidTopic.js
 * 
 * Checks if the topic exists, and returns a Promise. If true, resolve the
 * Promise with the topicData, otherwise reject the Promise.
 * 
 */

const isValidTopic = (topic, categoryData) => {
    let topicData = categoryData.topics.find((x) => {
        return x.topic == topic;
    });

    return new Promise((resolve, reject) => {
        if (!topicData) {
            reject({ topic: true });
        } else {
            resolve(topicData);
        }
    });
 };

 module.exports = {
     isValidTopic
 };

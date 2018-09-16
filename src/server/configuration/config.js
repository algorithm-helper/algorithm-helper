module.exports = {
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-1',
  },
  mongodb: {
    url: process.env.MLAB_MONGODB_URL || 'mongodb://localhost:27017/AlgorithmHelper',
    dbName: 'AlgorithmHelper',
  },
  elasticsearch: {
    fieldsUsed: ['title', 'description', 'articleContent'],
    indexName: 'algorithmhelper',
    logLevel: 'trace',
    maxTimeout: 5000,
    typeName: 'article',
    url: process.env.AWS_ELASTICSEARCH_URL || 'http://localhost:9200',
  },
};

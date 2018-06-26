/**
 * Converts yaml to JSON.
 */
const fs = require('fs');
const YAML = require('yamljs');

const indexObj = YAML.load('data/index.yaml');
fs.writeFileSync('./data/index.json', JSON.stringify(indexObj));

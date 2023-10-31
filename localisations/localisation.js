const yaml = require('js-yaml');
const fs = require('fs');

function Localisation(localName) {
    this.localName = localName
    this.localDoc = yaml.load(fs.readFileSync('localisations/' + localName + '.yml', 'utf8'));

    this.get = function(key) {
        return this.localDoc[key]
    }
}

module.exports = Localisation
const fs = require('fs');
const path = require('path');

module.exports = function(source) {
    const callback = this.async();

    const i18nPath = path.resolve(__dirname, '../i18n.json');
  
    fs.readFile(i18nPath, 'utf-8', (err, data) => {
        if (err) return callback(err);
      
        const i18nData = JSON.parse(data);
    
        console.log(i18nData,'data');
        const result = source.replace(/i18n\('([^']+)'\)/g, (match, key) => {
            return `"${i18nData[key]}"` || match;
        });        
        console.log(result,'result');
        callback(null, result);
    });
};

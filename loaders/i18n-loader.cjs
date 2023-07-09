module.exports = function(source) {
    const options = this.getOptions();
    const i18nData = options.i18nData;

    const result = source.replace(/i18n\('([^']+)'\)/g, (match, key) => {
        return `"${i18nData[key]}"` || match;
    });
    console.log(result,'result');
    this.callback(null, result);
};
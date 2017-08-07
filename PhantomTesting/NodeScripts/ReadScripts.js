module.exports = function(callback) {
    var readJson = require('read-package-json');
    readJson('regression-tests/package.json', console.error, false, function (er, data) {
        if (er) {
            return;
        }
        callback(null, JSON.stringify(data)); 
    });
};
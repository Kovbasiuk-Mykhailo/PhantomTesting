module.exports = function (callback, script) {
    var npm = require('npm');

    npm.load({ prefix: 'regression-tests'}, function (er) {
        if (er) { return; }
        npm.commands.run([script], function(res) {
            callback(null, true);     
        });
    });
};
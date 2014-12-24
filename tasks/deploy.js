module.exports = function (grunt) {
    'use strict';

    // Internal lib.
    var gitDeploy = require('./lib/git-deploy').init(grunt);

    grunt.registerTask('deploy', 'Deploy prod bits to Azure Website task', function () {
        var deployURL = "https://libra@ddonkey.scm.azurewebsites.net:443/ddonkey.git";
        grunt.log.writeln(deployURL);
        gitDeploy.deploy(deployURL, 'dist');
    });
};
require('shelljs/global');

exports.init = function (grunt) {
    'use strict';

    var exports = {};

    // Deploy the git repository 'drop_name' to target azure webiste endpoint 'git_url'
    exports.deploy = function (git_url, drop_name) {
        var splits = git_url.split("/"),
            dirName = splits[splits.length - 1];

        // pull latest builds or clone if repository doesn't exist
        if (test('-e', dirName)) {
            cd(dirName);
            exec('git pull');
        } else {
            var result = exec('git clone ' + git_url + ' ' + dirName);
            if (result.code !== 0) {
                grunt.fail.fatal('Failed to clone remote git repository');
            }
            cd(dirName);
        }

        var matches = pwd().match(dirName + "$");
        if (matches === null ||
            matches.length !== 1 ||
            matches[0] !== dirName) {
            grunt.fail.fatal('Direcotry [' + dirName + '] does not exist for deploy');
        }

        // remove all files except git history
        ls('-A', '*').forEach(function (file) {
            if (file !== '.git') {
                rm('-rf', file);
            }
        });

        // add new published files
        cp('-rf', '../' + drop_name + '/*', '.');
        // TODO: Check it if it's true before run the command.
        exec('git config core.autocrlf false');
        exec('git add --all');
        exec('git commit --allow-empty -m "grunt deploy"');
        // current: push the current branch to a branch of the same name.
        exec('git config push.default current');
        exec('git push');

        // Exit the current distribution directory for loop deployment.
        cd('..');
    };

    return exports;
};
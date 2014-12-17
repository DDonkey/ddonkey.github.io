'use strict';

/**
 * @ngdoc function
 * @name ddonkeyApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ddonkeyApp
 */
angular.module('ddonkeyApp')
  .controller('AuthoringCtrl', ['$scope', function ($scope) {
        /* global Markdown */
        var defaultConverter = Markdown.getSanitizingConverter();
                    
        defaultConverter.hooks.chain("preBlockGamut", function (text, rbg) {
            return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
              return "<blockquote>" + rbg(inner) + "</blockquote>\n";
            });
        });
        
        var editor = new Markdown.Editor(defaultConverter);
        
        editor.run();

        $scope.mdTopic = "This is the *first* editor.";
  }]);

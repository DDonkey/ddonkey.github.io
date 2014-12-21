'use strict';

/**
 * @ngdoc function
 * @name ddonkeyApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the ddonkeyApp
 */
angular.module('ddonkeyApp')
  .controller('AuthoringCtrl', ['$scope', 'topicModel', 'github', '$stateParams', '$state', '$modal',
    function ($scope, topicModel, github, $stateParams, $state, $modal) {
        $scope.content = "";

        /* global Markdown */
        var defaultConverter = Markdown.getSanitizingConverter();
                    
        defaultConverter.hooks.chain("preBlockGamut", function (text, rbg) {
            return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
              return "<blockquote>" + rbg(inner) + "</blockquote>\n";
            });
        });
        
        var editor = new Markdown.Editor(defaultConverter);
        
        var ace1 = ace.edit("wmd-input");
        ace1.setValue("", -1);
        ace1.getSession().setUseWrapMode(true);
        editor.run(ace1);

        var contentUrl = "https://api.github.com/repos/" + $stateParams['owner'] + "/" + 
          $stateParams['repo'] + "/contents/" + $stateParams['path']+ "?ref=master";

        github.getBlobs(contentUrl).success(function(item) {
            topicModel.selectedTopic = item;
            var rawContent = decodeURIComponent(escape(window.atob(item["content"])));
            $scope.content = rawContent;
            ace1.setValue(rawContent, -1);
          });

        $scope.checkin = function() {
          $modal.open({
              templateUrl: 'views/components/checkin-dialog.html',
              controller: ['$scope', '$modalInstance',
                  function($scope, $modalInstance) {
                      $scope.title = "Checkin Comments";
                      $scope.info = {
                        message: ""
                      }
                      $scope.ok = function () {
                          github.updateFile($stateParams['owner'], $stateParams['repo'], $stateParams['path'], {
                            path: topicModel.selectedTopic.path,
                            message: $scope.info.message,
                            content: window.btoa(unescape(encodeURIComponent(ace1.getSession().getValue()))),
                            sha: topicModel.selectedTopic.sha,
                            branch: 'master'
                          }).then(function(response) {
                            $modalInstance.close();
                          });
                      };
                  }]
          }); 
        };
  }]);

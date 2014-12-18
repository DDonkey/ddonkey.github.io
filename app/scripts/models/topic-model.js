'use strict';

/**
 * @ngdoc service
 * @name ddonkeyApp.github
 * @description
 * # github
 * Service in the ddonkeyApp.
 */
angular.module('ddonkeyApp')
  .service('topicModel', ['$q', function($q) {
    var topicModel = {
        selectedTopic: null
    };

    return topicModel;
  }]);

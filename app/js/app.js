'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ui.router',
  'phonecatAnimations',
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/phones");

    $stateProvider
        .state('phones', {
          url: "/phones",
          templateUrl: 'partials/phone-list.html',
          controller: 'PhoneListCtrl'
        })
        .state('detail', {
          url: 'phones/:phoneId',
          templateUrl: 'partials/phone-detail.html',
          controller: 'PhoneDetailCtrl'
        });
  }]);

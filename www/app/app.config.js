(function() {
  angular
    .module('app')
    .config(configure);

  function configure($stateProvider, $urlRouterProvider) {
    configureUiRouterStates($stateProvider);
    $urlRouterProvider.otherwise('/error');
  }

  function configureUiRouterStates($stateProvider) {
    $stateProvider
      .state('errorScreen', {
        url: '/error',
        controller: 'ErrorCtrl as vm',
        templateUrl: 'app/home/error.html'
      });

    // Home state houses nav bar
    $stateProvider
      .state('home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl as vm',
        abstract: true
      });

    //Campaign views
    $stateProvider
      .state('home.campaigns', {
        url: '/campaigns',
        templateUrl: 'app/campaigns/campaigns.html',
        controller: 'CampaignsCtrl as vm'
      })
      .state('home.campaigns.campaign', {
        parent: 'home',
        url: '/campaigns/campaign?campaignId',
        templateUrl: 'app/campaigns/campaign.html',
        controller: 'CampaignCtrl as vm'
      });
  }
})();

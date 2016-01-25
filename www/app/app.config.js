(function() {
  angular
    .module('app')
    .config(configure);

  function configure($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    configureUiRouterStates($stateProvider);
    configureAngularMaterialTheme($mdThemingProvider);
    $urlRouterProvider.otherwise('/home/campaigns');
  }

  function configureUiRouterStates($stateProvider) {
//    $stateProvider
//      .state('errorScreen', {
//        url: '/error',
//        controller: 'ErrorCtrl as vm',
//        templateUrl: 'app/home/error.html'
//      });

    // Home state houses nav bar
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl as vm',
        abstract: true
      });

    //Campaign views
    $stateProvider
      .state('home.campaigns', {
        url: '/campaigns',
        templateUrl: 'app/campaigns/campaigns.html',
        controller: 'CampaignsCtrl as vm',
        data: { pageTitle: 'Campaigns' }
      })
      .state('home.campaigns.campaign', {
        parent: 'home',
        url: '/campaigns/campaign?campaignId',
        templateUrl: 'app/campaigns/campaign.html',
        controller: 'CampaignCtrl as vm'
      });
  }

  function configureAngularMaterialTheme($mdThemingProvider) {
    // Define a custom color palette with our app's colors.
    $mdThemingProvider
        .definePalette('bluegreen', {
          '50': 'ffffff',
          '100': '91B0B3',
          '200': '00A6AE',
          '300': '008A91',
          '400': '47B7C3',
          '500': 'ffffff',
          '600': '004548',
          '700': 'd32f2f',
          '800': 'c62828',
          '900': '47B7C3',
          'A100': 'ffffff',
          'A200': 'ff5252',
          'A400': 'ff1744',
          'A700': 'd50000',
          'contrastDefaultColor': 'light',
          'contrastLightColors': ['900']
        });

    // Define a white palette to use for our accents.
    var whitePalette = $mdThemingProvider
        .extendPalette('grey', {
          '100': 'ffffff',
          '700': '00A6AE',
          'A200': 'ffffff',
          'contrastDefaultColor': 'dark',
          'contrastDarkColors': ['50']
        });
    $mdThemingProvider
        .definePalette('white', whitePalette);

    // Setup the default theme of our app with our color palettes.
    $mdThemingProvider
        .theme('default')
        .primaryPalette('bluegreen')
        //.accentPalette('white')
        //.backgroundPalette('bluegreen');

    console.log($mdThemingProvider);
  }

})();

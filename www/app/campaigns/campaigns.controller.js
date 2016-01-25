(function() {
  angular
    .module('app')
    .controller('CampaignsCtrl', CampaignsCtrl);

  var vm;

  function CampaignsCtrl($state, serverDataService) {
    vm = this;
    vm.$state = $state;
    vm.serverDataService = serverDataService;
    vm.getCampaigns = vm.serverDataService.getCampaigns;
    vm.activate();
  }

  CampaignsCtrl.prototype.activate = function () {
    vm.getCampaigns.then(function (campaigns) {
      vm.campaigns = campaigns;
    });
  }

  CampaignsCtrl.prototype.openCampaign = function (campaignId) {
    vm.$state.go('.campaign', {
        campaignId: campaignId
      });
  }
})();

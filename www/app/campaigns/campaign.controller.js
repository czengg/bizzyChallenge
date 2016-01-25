(function () {
  angular
    .module('app')
    .controller('CampaignCtrl', CampaignCtrl);

  var vm;

  function CampaignCtrl($state, $stateParams, serverDataService, $rootScope) {
    vm = this;
    vm.$state = $state;
    vm.serverDataService = serverDataService;
    vm.$rootScope = $rootScope;
    if ($stateParams.campaignId)
      vm.campaignId = $stateParams.campaignId;
    vm.getCampaigns = vm.serverDataService.getCampaigns;
    vm.activate();
  }

  CampaignCtrl.prototype.activate = function () {
    vm.getCampaigns.then(function (campaigns) {
      vm.campaign = campaigns[vm.campaignId];
      vm.createGraph();
    });
  }

  CampaignCtrl.prototype.createGraph = function () {
    vm.$rootScope.barChart = {};

    vm.$rootScope.barChart.type = "BarChart";

    var clicked = 0,
        opened = 0,
        sent = vm.campaign.emails.length
    ;
    vm.campaign.emails.map(function (email) {
      if (email.Clicked)
        clicked ++;
      if (email.Opened)
        opened ++;
    });

    vm.$rootScope.barChart.data = {
      "cols": [
        {id: "i", label: "Interaction", type: "string"},
        {id: "n", label: "# Of Users", type: "number"}
      ],
      "rows": [
        { c: [ { v: "Clicked" }, { v: clicked } ] },
        { c: [ { v: "Opened" }, { v: opened } ] },
        { c: [ { v: "Sent" }, { v: sent } ] },
      ]
    };
  }
})();

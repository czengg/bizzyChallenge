(function() {
  angular
    .module('app')
    .factory('serverDataService', serverDataService);

  function serverDataService($http, $q, API_URL, API_ROUTES) {
    var service = {
      getCampaigns: getCampaigns(),
      getCustomers: getServerData(API_ROUTES.CUSTOMERS),
      getEmails: getServerData(API_ROUTES.EMAILS),
      getOrders: getServerData(API_ROUTES.ORDERS)
    };

    return service;
  }

  function getCampaigns() {
    var
      emails,
      campaigns = {},
      campaignsArray = []
    ;

    emails = getServerData(API_ROUTES.EMAILS);
    emails.map(function (email) {
      if (campaigns[email.date])
        campaigns[email.date].push(email);
      else
        campaigns[email.date] = new Array(email);
    });

    for (var date in campaigns) {
      campaignsArray.push({
        name: 'Campaign ' + date,
        date: date,
        emails: campaigns[date]
      });
    }

    return campaignsArray;
  }

  function getServerData(apiRoute) {
    $http.get(API_URL + apiRoute, {
      headers: {
        'Content-Type': 'application/json'
      },
      cache: true
    }).success(
      function (data, status, headers, config) {
        return data;
      }).error(
      function (data, status, headers, config) {
        if (status === 401)
          $state.go('error');
      });
  }
})();

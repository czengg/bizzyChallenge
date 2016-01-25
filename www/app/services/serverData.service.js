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

    function getCampaigns() {
      var
        emails,
        campaigns = {},
        campaignsArray = [],
        status,
        defer = $q.defer();
      ;

      getServerData(API_ROUTES.EMAILS).then(function (res) {
        res.data.map(function (email) {
          if (campaigns[email['Send Date']])
            campaigns[email['Send Date']].push(email);
          else
            campaigns[email['Send Date']] = new Array(email);
        });

        for (var date in campaigns) {
          status = Math.floor(Math.random() * 3) + 1;

          switch (status) {
            case 1:
              status = 'new';
              break;
            case 2:
              status = 'hot';
              break;
            default:
              status = 'none';
          }

          campaignsArray.push({
            id: campaignsArray.length,
            name: 'Campaign ' + date,
            date: new Date(date),
            emails: campaigns[date],
            status: status
          });

          defer.resolve(campaignsArray);
        }
      });

      return defer.promise;
    }

    function getServerData(apiRoute, callback) {
      return $http.get(API_URL + apiRoute, {
        headers: {
          'Content-Type': 'application/json'
        },
        cache: true
      }).success(
        function (data, status, headers, config) {
          if (callback)
            return callback(data);
          return data;
        }).error(
        function (data, status, headers, config) {
          if (status === 401)
            $state.go('error');
        });
    }

    return service;
  }
})();

(function() {
  angular
    .module('app')
    .constant('API_URL', 'http://bizzyinterview.herokuapp.com/')
    // All routes for api calls.
    .constant('API_ROUTES', {
      CUSTOMERS: 'customers',
      EMAILS: 'emails',
      ORDERS: 'orders'
    });
})();

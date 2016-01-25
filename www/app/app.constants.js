(function() {
  angular
    .module('app')
    .constant('API_URL', 'data/')
    // All routes for api calls.
    .constant('API_ROUTES', {
      CUSTOMERS: 'customers.json',
      EMAILS: 'emails.json',
      ORDERS: 'orders.json'
    });
})();

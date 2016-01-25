(function () {
  angular
    .module('app')
    .controller('HomeCtrl', HomeCtrl);

  var vm;

  function HomeCtrl($state, $mdSidenav, $rootScope) {
    vm = this;
    vm.$state = $state;
    vm.$mdSidenav = $mdSidenav;
    vm.$rootScope = $rootScope;
    vm.menuItems = [
      {
        state: 'home.campaigns',
        title: 'CAMPAIGNS'
      },
      {
        state: 'customers',
        title: 'CUSTOMERS'
      },
      {
        state: 'orders',
        title: 'ORDERS'
      }
    ];
  }

  HomeCtrl.prototype.openMenu = function() {
    return vm.$mdSidenav('hamburger').open();
  }

  HomeCtrl.prototype.openMenuItem = function(menuItem) {
    vm.$state.go(menuItem).then(function() {
      vm.$mdSidenav('hamburger').close();
    });
  }
})();

'use strict';

angular.module('harpyid').controller('HarpyidController', ['$scope', '$window', '$http', 'Harpyid',
    function($scope, $window, $http, Harpyid) {

    $scope._ = _;
    $scope.username = $('.loggedUser').val();
    $scope.formData = {};
    $scope.websites = [];
    $scope.success = false;
    $scope.filterWebsite = '';

    function getWebsites() {
        $http.get('/websites')
            .success(function(websites) {
                $scope.websites = websites;
                $scope.message = {};
            })
            .error(function(err) {
                console.log('Error: ' + err);
                $scope.message = {
                   texto: 'Não foi possível obter a lista.'
                };
            });
    }
    getWebsites();

    $scope.saveWebsite = function(form) {
    	console.info('formData', $scope.formData);

    	$http.post('/websites', $scope.formData)
          .success(function(data) {
          	  $scope.success = true;
              $scope.formData = {};
              $scope.adminForm.$setPristine();
              getWebsites();
              $window.location.href = '/#!/admin/harpyid';
          })
          .error(function(data) {
              console.log('Error: ' + data);
         });
    }

   $scope.removeWebsite = function(website) {
       Harpyid.deleteWebsite(website._id)
          .success(function(data) {
              getWebsites();
              $window.location.href = '/#!/admin/harpyid';
          })
          .error(function(err) {
              $scope.mensagem = {
                   texto: 'Não foi possível remover o website.'
               };
               console.log(err);
         });
   }
  }
]);

angular.module('starter.controllers', ['chart.js', 'angular-jwt'])

.controller('SignInCtrl', function(AuthService, jwtHelper, $scope, $localStorage, $window, $state) {
  $scope.isAuthenticated = false;
  $scope.signIn = function(user) {
    //console.log(user.name, user.password);
    AuthService.signIn(user,function(response) {
                if (response.type == false) {
                    alert(response.data)    
                } else {
                    $localStorage.token = response.token;
                    //var tokenPayload = jwtHelper.decodeToken(response.data.token);
                    $state.go('tab.dash');   
                }
            }, function() {
                $rootScope.error = 'authenticate fail';
            });
}})

.controller('DashCtrl', function($scope) {
  $scope.labels = ["Protein", "Fat", "Cabohydrate"];
  $scope.data = [300, 500, 100];
  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function(AuthService, $scope, $window, $state) {
    $scope.signOut = function() {
            AuthService.signOut(function() {
                $state.go('/signIn');
            }, function() {
                alert("Failed to logout!");
            });
        };
    $scope.settings = {
      enableFriends: true
    };
});
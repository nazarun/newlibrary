//User login directive
app.directive('login', function(){
    return {
        replace: true,
        templateUrl: 'templates/login.html',
        controller: function($scope, $http, URLUSERS, $location, $window){
            $scope.loginStatus = true;
            $scope.loginFormStatus = true;
            $scope.signupFormStatus = false;           

            //show signup form
            $scope.showSignup = function(){
                $scope.loginFormStatus = false;
                $scope.signupFormStatus = true;
            }
            //show login form
            $scope.showLogin = function(){
                $scope.loginFormStatus = true;
                $scope.signupFormStatus = false;
            }
            //login POST
            $scope.userLogin = function(){
                $http({
                    method: 'POST',
                    url: URLUSERS,
                    data: $scope.formData,
                })
                .then(function(response){                  
                    $window.location.reload();                    
                    $location.path('/books');
                })
                .catch(function(err){
                    console.log(err);
                });
            }

            //signup POST
            $scope.userSignup = function(){
                $http({
                    method: 'POST',
                    url: URLUSERS,
                    data: $scope.formData,
                })
                .then(function(response){
                    $window.location.reload();                    
                    $location.path('/books');
                })
                .catch(function(err){
                    console.log(err);
                });

            }
        }
    }
});
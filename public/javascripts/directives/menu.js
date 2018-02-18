//Menu directive
app.directive('menu', function(){
    return {
        replace: true,
        templateUrl: 'templates/menu.html',
        controller: function($scope, $http, URLUSERS, $window){           
           $scope.menuStatus = true;
           $scope.userDataStatus = true;
           $scope.logoutStatus = true;

            //Button Books
            $scope.chooseBooks = function(){
                $scope.bookAddFormStatus = false;
                $scope.allBooks = true;
                $scope.bookEditFormStatus = false;
                $scope.loginStatus = false;
                $scope.bookDetailsStatus = false;
            };
            //Button Add
            $scope.chooseAddBook = function(){                
                $scope.bookAddFormStatus = true;
                $scope.allBooks = false;
                $scope.bookEditFormStatus = false;
                $scope.loginStatus = false;
                $scope.bookDetailsStatus = false;                                
            }; 
            //Button Edit
            $scope.chooseEditBook = function(){
                $scope.allBooks = false;
                $scope.bookAddFormStatus = false;
                $scope.bookEditFormStatus = true;
                $scope.loginStatus = false;
                $scope.bookDetailsStatus = false;            
            };
            //Button Login
            $scope.showLogin = function(){
                $scope.allBooks = false;
                $scope.bookAddFormStatus = false;
                $scope.bookEditFormStatus = false;
                $scope.loginStatus = true;
                $scope.bookDetailsStatus = false;                                          
            };

                //show user data            
                $http.get(URLUSERS + 'profile')
                .then(function successCallback(response){
                    $scope.userData = response.data;                                                                    
                }, function errorCallback(response) {                     
                    $scope.userData = response.data.error;                    
                });           
                //end of user data

            //logout
            $scope.logout = function(){
                $http.get(URLUSERS + 'logout')
                .then(function successCallback(response){                    
                    $scope.userData = "";
                    $scope.logoutStatus = false;
                    $window.location.reload();
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
                });
            }
            //end of logout
        }
    }
});
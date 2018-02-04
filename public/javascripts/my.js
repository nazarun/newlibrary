const app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

//Забираєм %2F та # з url сайту
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);

//Створюєм адреси
app.config(function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
});

//Контроллер
app.controller("defaultCtrl", function () {});

//Get all books directive
app.directive('allBooks', function(){
    return {
        replace: true,  
        templateUrl: 'templates/books.html',
        controller: function($scope, $http){
            $http.get('http://localhost:3000/books')
            .then(function(response) {
                $scope.booksList = response.data;
                console.log($scope.booksList);
                $scope.allBooks = true;
                $scope.menuStatus = true;                
                //pagination
                $scope.currentPage = 1;
                $scope.itemsPerPage = 5;                
                $scope.totalItems = $scope.booksList.length;
                $scope.paginate = function(value) {
                    var begin, end, index;
                    begin = ($scope.currentPage - 1) * $scope.itemsPerPage;
                    end = begin + $scope.itemsPerPage;
                    index = $scope.booksList.indexOf(value);
                    return (begin <= index && index < end);
                };
                //end pagination
                //rating
                
                //end rating
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
            //End showing all books

            //Show the book details
            $scope.showDetails = function(_id, author, title, description){
                $http.get('http://localhost:3000/books/' + _id)
                .then(function successCallback(response){
                    $scope.bookDetails = response.data;                    
                    $scope.bookTitle = title;
                    $scope.bookAuthor = author;
                    $scope.bookDescription = description; 
                    $scope.bookId = _id;                   
                    //console.log($scope.bookDetails);
                    $scope.file = response.data.fileUpload;                    
                    //console.log($scope.file);
                    //console.log($scope.bookId);
                    $scope.bookDetailsStatus = true;
                    $scope.bookEditFormStatus = false;

                }, function errorCallback(response){
                    console.log("Error!!!" + response.err);
                });
            }
            //End of book details            

            //Show edit book form
            $scope.editBook = function(_id, author, title, description, status){                
                $http.get('http://localhost:3000/books/' + _id + '/edit')
                .then(function successCallback(response) {
                    $scope.bookDetails = response.data;                    
                    $scope.bookTitle = title;
                    $scope.bookAuthor = author;
                    $scope.bookDescription = description;                    
                    $scope.bookStatus = status;  
                    $scope.bookId = _id;
                    $scope.action = 'http://localhost:3000/books/' + _id + '/edit';
                    $scope.bookEditFormStatus = true; //show edit form
                    $scope.bookDetailsStatus = false;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
            }
            //End of edit book form

            //Delete book
            $scope.deleteBook = function(_id){
                $http.get('http://localhost:3000/books/' + _id + '/delete')
                .then(function successCallback(response){
                    console.log("Deleted!");                    
                }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
            }
            //End of delete book
        }
    }
});


//Menu directive
app.directive('menu', function(){
    return {
        replace: true,
        templateUrl: 'templates/menu.html',
        controller: function($scope, $http){
           // $scope.allBooks = true;
           $scope.menuStatus = false;
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

            $http.get('http://localhost:3000/users/profile')
            .then(function successCallback(response){
                $scope.userData = response.data;
                console.log($scope.userData);
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            });
            //end of user data

            //logout
            $scope.logout = function(){
                $http.get('http://localhost:3000/users/logout')
                .then(function successCallback(response){
                    console.log("Logged out!");
                    $scope.userData = "";
                    $scope.logoutStatus = false;
                }, function errorCallback(response) {
                    console.log("Error!!!" + response.err);
            });
            }
            //end of logout
        }
    }
});

//Add book directive
app.directive('addBook', function(){
    return {
        replace: true,
        templateUrl: 'templates/add-book.html',
        controller: function($scope, $http){
            $scope.bookAddFormStatus = false;                                
        }
    }
});

//User create directive
app.directive('signup', function(){
    return {
        replace: true,
        templateUrl: 'templates/signup.html',
        controller: function($scope, $http){
            $scope.signUpStatus = false;                     
        }
    }
});

//User create directive
app.directive('login', function(){
    return {
        replace: true,
        templateUrl: 'templates/login.html',
        controller: function($scope, $http){
            $scope.loginStatus = false;
            //show signup form
            $scope.showSignup = function(){
                $scope.loginStatus = false;
                $scope.signUpStatus = true;
            }
            //show login form
            $scope.showLogin = function(){
                $scope.loginStatus = true;
                $scope.signUpStatus = false;
            }                       
        }
    }
});

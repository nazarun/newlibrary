const app = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngFileUpload']);

// //Get off %2F and # from url 
// app.config(['$locationProvider', function ($locationProvider) {
//     $locationProvider.hashPrefix('');
//     $locationProvider.html5Mode(true);
// }]);

// //Routing
// app.config(function ($routeProvider) {
//     $routeProvider
//         .when('/login', {
//             template: '<login></login>'
//             //templateUrl: 'templates/login.html'
//         })
//         .when('/books', {
//             template: '<all-books></all-books>'
//             //templateUrl: 'templates/books.html'
//         })
//         .when('/add', {
//             template: '<add-book></add-book>'
//             //templateUrl: 'templates/add-book.html'
//         })
//         .otherwise({
//             redirectTo: '/login'
//         });
// });

// app.constant('URLBOOKS', 'http://localhost:3000/books/');
// app.constant('URLUSERS', 'http://localhost:3000/users/');

//Controller
// app.controller("defaultCtrl", function () {});

//Get all books directive
// app.directive('allBooks', function(){
//     return {
//         replace: true,  
//         templateUrl: 'templates/books.html',
//         controller: function($scope, $http, URLBOOKS){ 

//             $http.get(URLBOOKS + 1)
//             .then(function(response) {
//                 $scope.booksList = response.data.documents;                
//                 console.log($scope.booksList);     
                
//                 $scope.allBooks = true;
//                 $scope.menuStatus = true;                

//                 $scope.nextPage =  response.data.nextPage;
//                 $scope.prevPage =  response.data.prevPage;   
                
//             }, function errorCallback(response) {
//                 console.log("Error!!!" + response.err);
//             });
//             //End showing all books

//             //pagination
//             $scope.getNext = function(page){
//                 $http.get(URLBOOKS + page)
//                 .then(function(response){
//                     $scope.booksList = response.data.documents;
//                     $scope.nextPage =  response.data.nextPage;
//                     $scope.prevPage =  response.data.prevPage; 
//                 })
//             }

//             $scope.getPrev = function(page){
//                 $http.get(URLBOOKS + page)
//                 .then(function(response){
//                     $scope.booksList = response.data.documents;
//                     $scope.nextPage =  response.data.nextPage;
//                     $scope.prevPage =  response.data.prevPage;  
//                 })
//             }

//             //search
//             $scope.searchBook = function(){
//                 var obj = {search : $scope.search}
//                 $http.post(URLBOOKS + 'search',  obj)
//                 .then(function(response){
//                     $scope.booksList = response.data;
//                     $scope.search = '';                    
//                 })
//             }
  

//             //Show the book details
//             $scope.showDetails = function(_id, author, title, description){                
//                 $http.get(URLBOOKS + '1/' +_id)
//                 .then(function successCallback(response){
//                     $scope.bookDetails = response.data;                    
//                     $scope.bookTitle = title;
//                     $scope.bookAuthor = author;
//                     $scope.bookDescription = description; 
//                     $scope.bookId = _id;                   
//                     console.log($scope.bookDetails);
//                     $scope.file = response.data.fileUpload;                    
//                     //console.log($scope.file);
//                     //console.log($scope.bookId);
//                     $scope.bookDetailsStatus = true;
//                     $scope.bookEditFormStatus = false;

//                 }, function errorCallback(response){
//                     console.log("Error!!!" + response.err);
//                 });
//             }
//             //End of book details            

            

//             //Delete book
//             $scope.deleteBook = function(_id){
//                 $http.delete(URLBOOKS + _id)
//                 .then(function successCallback(response){                                    
//                     console.log("Deleted!");
//                 }, function errorCallback(response) {
//                 console.log("Error!!!" + response.err);
//                 });
//             }
//             //End of delete book
//         }
//     }
// });


// //Menu directive
// app.directive('menu', function(){
//     return {
//         replace: true,
//         templateUrl: 'templates/menu.html',
//         controller: function($scope, $http, URLUSERS, $window){           
//            $scope.menuStatus = true;
//            $scope.userDataStatus = true;
//            $scope.logoutStatus = true;
// $scope.userData = undefined;
//             //Button Books
//             $scope.chooseBooks = function(){
//                 $scope.bookAddFormStatus = false;
//                 $scope.allBooks = true;
//                 $scope.bookEditFormStatus = false;
//                 $scope.loginStatus = false;
//                 $scope.bookDetailsStatus = false;
//             };
//             //Button Add
//             $scope.chooseAddBook = function(){
//                 $scope.bookAddFormStatus = true;
//                 $scope.allBooks = false;
//                 $scope.bookEditFormStatus = false;
//                 $scope.loginStatus = false;
//                 $scope.bookDetailsStatus = false;
//             }; 
//             //Button Edit
//             $scope.chooseEditBook = function(){
//                 $scope.allBooks = false;
//                 $scope.bookAddFormStatus = false;
//                 $scope.bookEditFormStatus = true;
//                 $scope.loginStatus = false;
//                 $scope.bookDetailsStatus = false;            
//             };
//             //Button Login
//             $scope.showLogin = function(){
//                 $scope.allBooks = false;
//                 $scope.bookAddFormStatus = false;
//                 $scope.bookEditFormStatus = false;
//                 $scope.loginStatus = true;
//                 $scope.bookDetailsStatus = false;                                          
//             };

//             //show user data            
//                 $http.get(URLUSERS + 'profile')
//                 .then(function successCallback(response){
//                     $scope.userData = response.data;                                                  
//                 }, function errorCallback(response) { 
//                 console.log("Error!!!" + response.err);
//                 });           
//             //end of user data

//             //logout
//             $scope.logout = function(){
//                 $http.get(URLUSERS + 'logout')
//                 .then(function successCallback(response){                    
//                     $scope.userData = "";
//                     $scope.logoutStatus = false;
//                     $window.location.reload();
//                 }, function errorCallback(response) {
//                     console.log("Error!!!" + response.err);
//                 });
//             }
//             //end of logout
//         }
//     }
// });

// //Add book directive
// app.directive('addBook', function(){
//     return {
//         replace: true,
//         templateUrl: 'templates/add-book.html',
//         controller: function($scope, $http, URLBOOKS, Upload){
//             $scope.bookAddFormStatus = true;

//             $scope.submit = function(file){  
//                 Upload.upload({
//                     url: URLBOOKS + 'create',                    
//                     data: {
//                         file: file,
//                         author: $scope.author,
//                         title: $scope.title,
//                         description: $scope.description,
//                         status: $scope.status,                        
//                     }
//                 }).then(function(response){
//                     console.log('New book added');
//                     $scope.file = "";
//                     $scope.author = "";
//                     $scope.title = "";
//                     $scope.description = "";
//                     $scope.status = "";
//                     $scope.addBookForm.$setPristine();
                                        
//                 }, function (response) {
//                     console.log('Error status: ' + response.status);
//                 });
               
//             } 
//             $scope.reset = function(){
//                 $scope.file = "";
//                 $scope.author = "";
//                 $scope.title = "";
//                 $scope.description = "";
//                 $scope.status = "";
//                 $scope.addBookForm.$setPristine();
//             }                               
//         }
//     }
// });

//Edit book directive
// app.directive('editBook', function(){
//     return{
//         replace: true,
//         templateUrl: 'templates/edit-book.html',
//         controller: function($scope, $http, URLBOOKS, Upload){
//             $scope.bookEditFormStatus = false;

//             //Show edit book form
//             $scope.editBook = function(_id, author, title, description, status){                
//                 $http.get(URLBOOKS + '1/' + _id)
//                 .then(function successCallback(response) {
//                     $scope.bookDetails = response.data;                    
//                     $scope.title = title;
//                     $scope.author = author;
//                     $scope.description = description;                    
//                     $scope.status = status;  
//                     $scope.id = _id;
//                     console.log($scope.bookDetails);
//                     $scope.bookEditFormStatus = true; 
//                     $scope.bookDetailsStatus = false;
//             }, function errorCallback(response) {
//                 console.log("Error!!!" + response.err);
//             });
//             }
//             //End of edit book form

//             //Handle POST request
//             $scope.updateBook = function(file){
//                 var data = {
//                     file: file,
//                     author: $scope.author,
//                     title: $scope.title,
//                     description: $scope.description,
//                     status: $scope.status,
//                     id: $scope.id, //uses id from hidden input               
//                 }
//                 Upload.upload({
//                     url: URLBOOKS + data.id,                    
//                     data: data,
//                 })
//                 .then(function(response){
//                     console.log('The book has been edited');
//                     $scope.file = "";
//                     $scope.author = "";
//                     $scope.title = "";
//                     $scope.description = "";
//                     $scope.status = "";
//                     $scope.id = "";
//                     $scope.addBookForm.$setPristine();
                                        
//                 }, function (response) {
//                     console.log('Error status: ' + response.status);
//                 });
               
//             } 
//             $scope.reset = function(){
//                 $scope.file = "";
//                 $scope.author = "";
//                 $scope.title = "";
//                 $scope.description = "";
//                 $scope.status = "";
//                 $scope.addBookForm.$setPristine();
//             }     

//         }
//     }
// });




// //User login directive
// app.directive('login', function(){
//     return {
//         replace: true,
//         templateUrl: 'templates/login.html',
//         controller: function($scope, $http, URLUSERS, $location, $window){
//             $scope.loginStatus = true;
//             $scope.loginFormStatus = true;
//             $scope.signupFormStatus = false;           

//             //show signup form
//             $scope.showSignup = function(){
//                 $scope.loginFormStatus = false;
//                 $scope.signupFormStatus = true;
//             }
//             //show login form
//             $scope.showLogin = function(){
//                 $scope.loginFormStatus = true;
//                 $scope.signupFormStatus = false;
//             }
//             //login POST
//             $scope.userLogin = function(){
//                 $http({
//                     method: 'POST',
//                     url: URLUSERS,
//                     data: $scope.formData,
//                 })
//                 .then(function(response){                  
//                     $window.location.reload();                    
//                     $location.path('/books');
//                 })
//                 .catch(function(err){
//                     console.log(err);
//                 });
//             }

//             //signup POST
//             $scope.userSignup = function(){
//                 $http({
//                     method: 'POST',
//                     url: URLUSERS,
//                     data: $scope.formData,
//                 })
//                 .then(function(response){
//                     $window.location.reload();                    
//                     $location.path('/books');
//                 })
//                 .catch(function(err){
//                     console.log(err);
//                 });

//             }
//         }
//     }
// });

// //Rating
// app.controller('StarCtrl', ['$scope', function ($scope) {
//             $scope.maxRating = 5;
//             $scope.ratedBy = 0;
//             $scope.rateBy = function (star) {
//                 $scope.ratedBy = star;
//             }
//         }]);
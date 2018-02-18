//Get off %2F and # from url 
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);

//Routing
app.config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            template: '<login></login>'
        })
        .when('/books', {            
            templateUrl: 'templates/books.html',
            controller: 'listBooksController'
        })
        .when('/add', {            
            templateUrl: 'templates/add-book.html',
            controller: 'AddBookController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

app.constant('URLBOOKS', 'http://localhost:3000/books/');
app.constant('URLUSERS', 'http://localhost:3000/users/');
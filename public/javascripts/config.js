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
            //templateUrl: 'templates/login.html'
        })
        .when('/books', {
            template: '<all-books></all-books>'
            //templateUrl: 'templates/books.html'
        })
        .when('/add', {
            template: '<add-book></add-book>'
            //templateUrl: 'templates/add-book.html'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

app.constant('URLBOOKS', 'http://localhost:3000/books/');
app.constant('URLUSERS', 'http://localhost:3000/users/');
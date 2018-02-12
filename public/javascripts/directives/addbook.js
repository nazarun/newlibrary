//Add book directive
app.directive('addBook', function(){
    return {
        replace: true,
        templateUrl: 'templates/add-book.html',
        controller: function($scope, $http, URLBOOKS, Upload){
            $scope.bookAddFormStatus = true;

            $scope.submit = function(file){  
                Upload.upload({
                    url: URLBOOKS + 'create',                    
                    data: {
                        file: file,
                        author: $scope.author,
                        title: $scope.title,
                        description: $scope.description,
                        status: $scope.status,                        
                    }
                }).then(function(response){
                    console.log('New book added');
                    $scope.file = "";
                    $scope.author = "";
                    $scope.title = "";
                    $scope.description = "";
                    $scope.status = "";
                    $scope.addBookForm.$setPristine();
                                        
                }, function (response) {
                    console.log('Error status: ' + response.status);
                });
               
            } 
            $scope.reset = function(){
                $scope.file = "";
                $scope.author = "";
                $scope.title = "";
                $scope.description = "";
                $scope.status = "";
                $scope.addBookForm.$setPristine();
            }                               
        }
    }
});
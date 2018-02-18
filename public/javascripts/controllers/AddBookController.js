
app.controller('AddBookController', function($scope, $http, URLBOOKS, Upload){
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
            $scope.addBookError = false;
            $scope.bookAdded = response.data;
            $scope.file = "";
            $scope.author = "";
            $scope.title = "";
            $scope.description = "";
            $scope.status = "";
            $scope.addBookForm.$setPristine();                                        
        }, function (response) {                    
            $scope.addBookError = response.data.error;            
        });       
    }

    $scope.reset = function(){
        $scope.addBookError = false;
        $scope.file = "";
        $scope.author = "";
        $scope.title = "";
        $scope.description = "";
        $scope.status = "";
        $scope.addBookForm.$setPristine();
        $scope.bookAdded = "";
    }       

});
app.controller('editBookController', function($scope, $http, URLBOOKS, Upload){	

    //Show edit book form
    $scope.editBook = function(_id, author, title, description, status){                
        $http.get(URLBOOKS + '1/' + _id)
        .then(function successCallback(response) {
            $scope.bookDetails = response.data;                    
            $scope.title = title;
            $scope.author = author;
            $scope.description = description;                    
            $scope.status = status;  
            $scope.id = _id;            
            $scope.bookEditFormStatus = true; 
            //$scope.bookDetailsStatus = false;
        }, function errorCallback(response) {
            console.log("Error!!!" + response.err);
        });
    }
    //End of edit book form

    //Handle POST request
    $scope.updateBook = function(file){
        var data = {
            file: file,
            author: $scope.author,
            title: $scope.title,
            description: $scope.description,
            status: $scope.status,
            id: $scope.id, //uses id from hidden input               
        }
        Upload.upload({
            url: URLBOOKS + data.id,                    
            data: data,
        })
        .then(function(response){                    
            $scope.editBookError = false;
            $scope.bookEdited = response.data;
            $scope.file = "";
            $scope.author = "";
            $scope.title = "";
            $scope.description = "";
            $scope.status = "";
            $scope.id = "";
            $scope.addBookForm.$setPristine();                                        
        }, function (response) {
            $scope.editBookError = response.data.error;                    
        });

    } 
    // $scope.reset = function(){
    //     $scope.editBookError = false;
    //     $scope.file = "";
    //     $scope.author = "";
    //     $scope.title = "";
    //     $scope.description = "";
    //     $scope.status = "";
    //     $scope.addBookForm.$setPristine();
    //     $scope.bookEdited = "";
    // }
        $scope.cancel = function(){
            $scope.bookEditFormStatus = false;
        }


});
app.controller('listBooksController', function($scope, $http, URLBOOKS){
	$http.get(URLBOOKS + 1)
    .then(function(response) {
        $scope.booksList = response.data.documents;       
        $scope.allBooks = true;
        $scope.menuStatus = true;                

        $scope.nextPage =  response.data.nextPage;
        $scope.prevPage =  response.data.prevPage;       
    }, function errorCallback(response) {        
        $scope.errorMsg = response.err;
    });
    //End showing all books

    //pagination
    $scope.getNext = function(page){
        $http.get(URLBOOKS + page)
        .then(function(response){
            $scope.booksList = response.data.documents;
            $scope.nextPage =  response.data.nextPage;
            $scope.prevPage =  response.data.prevPage; 
        })
    }

    $scope.getPrev = function(page){
        $http.get(URLBOOKS + page)
        .then(function(response){
            $scope.booksList = response.data.documents;
            $scope.nextPage =  response.data.nextPage;
            $scope.prevPage =  response.data.prevPage;  
        })
    }

    //search
    $scope.searchBook = function(){
    console.log($scope.search); 
    var obj = {search: $scope.search};       
        $http({
            method: 'POST',
            url: URLBOOKS + 'search',
            data: obj,
        })
        .then(function(response){
            $scope.booksList = response.data;
            $scope.search = '';                                
        }, function errorCallback(response){            
            $scope.errorMsg = response.err;
        });
    }


    //Show the book details
    $scope.showDetails = function(_id, author, title, description){                
        $http.get(URLBOOKS + '1/' +_id)
        .then(function successCallback(response){
            $scope.bookDetails = response.data;                    
            $scope.bookTitle = title;
            $scope.bookAuthor = author;
            $scope.bookDescription = description; 
            $scope.bookId = _id;    
            $scope.file = response.data.fileUpload;           
            $scope.bookDetailsStatus = true;
            $scope.bookEditFormStatus = false;

        }, function errorCallback(response){
            $scope.errorMsg = response.err;
        });
    }
    //End of book details            

    

    //Delete book
    $scope.deleteBook = function(_id){
        $http.delete(URLBOOKS + _id)
        .then(function successCallback(response){                                    
            console.log("Deleted!");
        }, function errorCallback(response) {
        $scope.errorMsg = response.err;
        });
    }
    //End of delete book
});
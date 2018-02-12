//Get all books directive
app.directive('allBooks', function(){
    return {
        replace: true,  
        templateUrl: 'templates/books.html',
        controller: function($scope, $http, URLBOOKS){ 

            $http.get(URLBOOKS + 1)
            .then(function(response) {
                $scope.booksList = response.data.documents;                
                //console.log($scope.booksList);     
                
                $scope.allBooks = true;
                $scope.menuStatus = true;                

                $scope.nextPage =  response.data.nextPage;
                $scope.prevPage =  response.data.prevPage;   
                
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
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
                var obj = {search : $scope.search}
                $http.post(URLBOOKS + 'search',  obj)
                .then(function(response){
                    $scope.booksList = response.data;
                    $scope.search = '';                    
                })
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
                    console.log($scope.bookDetails);
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

            

            //Delete book
            $scope.deleteBook = function(_id){
                $http.delete(URLBOOKS + _id)
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
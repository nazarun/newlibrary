//Controller
app.controller("defaultCtrl", function () {});


//Rating
app.controller('StarCtrl', ['$scope', function ($scope) {
    $scope.maxRating = 5;
    $scope.ratedBy = 0;
    $scope.rateBy = function (star) {
        $scope.ratedBy = star;
    }
}]);
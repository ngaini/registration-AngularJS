myApp.controller('CheckInsController',['$scope','$rootScope', '$location','$firebaseObject', '$firebaseArray','$routeParams','FIREBASE_URL', function($scope, $rootScope,$location ,$firebaseObject, $firebaseArray,$routeParams, FIREBASE_URL){

    $scope.whichmeeting = $routeParams.mId;
    $scope.whichuser = $routeParams.uId;

    var ref = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+'/checkins');
    var checkinsList = $firebaseArray(ref);
    $scope.checkins = checkinsList;
     $scope.addCheckin = function()
    {
        var checkinsInfo = $firebaseArray(ref);
        var myData={
            firstname : $scope.user.fname,
            lastname : $scope.user.lname,
            email: $scope.user.email,
            date: Firebase.ServerValue.TIMESTAMP

        }; //myData

        checkinsInfo.$add(myData).then(function(){
            $location.path('/checkins/'+$scope.whichuser+'/'+$scope.whichmeeting+'/checkinsList');
        }); //send data to firebase
    }; //addCheckin

    $scope.deleteCheckin = function(id){
        var refDel = new Firebase(FIREBASE_URL+'users/'+$scope.whichuser+'/meetings/'+$scope.whichmeeting+ '/checkins/'+id);
        var record = $firebaseObject(refDel);
        record.$remove(id);
    };
}]); //controller
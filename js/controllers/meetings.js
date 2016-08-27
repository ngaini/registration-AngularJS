myApp.controller('MeetingsController',['$scope','$rootScope','$firebaseAuth','$firebaseArray','FIREBASE_URL', function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){

    var ref= new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser){
        if(authUser){
            var meetingsRef = new Firebase(FIREBASE_URL+'users/'+$rootScope.currentUser.$id+ '/meetings');
            var meetingsInfo = $firebaseArray(meetingsRef);
            console.log(meetingsInfo);

            $scope.meetings = meetingsInfo;


            // to make sure meeting data is loaded
            //it is a method of $firebaseArray
            meetingsInfo.$loaded().then(function(data){
                $rootScope.howManyMeetings = meetingsInfo.length;
            });

            //watch for any changes to the meetingsInfo object ig yes execute the function
            //it is a method of $firebaseArray
            meetingsInfo.$watch(function(data){
                $rootScope.howManyMeetings = meetingsInfo.length;
            });

            $scope.addMeeting = function(){
                meetingsInfo.$add({
                    name: $scope.meetingname,
                    date: Firebase.ServerValue.TIMESTAMP
                }).then(function(){
                    $scope.meetingname ='';
                }); //promise
            }; // addMeeting
            
            $scope.deleteMeeting = function(key){
                console.log(key);
                meetingsInfo.$remove(key);
            }; //delete meeting
        }  // user Authenticated
    }); // on Auth
    // $scope.message = "Welcome to my app";

}]);
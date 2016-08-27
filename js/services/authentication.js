
//this factory returns an object with our different functions
myApp.factory('Authentication',['$rootScope','$firebaseAuth','$location', '$firebaseObject','FIREBASE_URL',function($rootScope, $firebaseAuth, $location, $firebaseObject, FIREBASE_URL){

    //reference to store firebase object
    var ref = new Firebase(FIREBASE_URL);

    //variable to hold firebase authentication data
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser){
       if(authUser)
       {
           var userRef = new Firebase(FIREBASE_URL+'users/'+authUser.uid);
           var userObj = $firebaseObject(userRef);
           $rootScope.currentUser = userObj;
       }
        else
       {
           $rootScope.currentUser='';
       }
    });

    var myObject = {
        login: function(user){

            auth.$authWithPassword({
                email: user.email,
                password: user.password
            }).then(function(regUser){
                //send user to success page
                $location.path('/meetings');
            }).catch(function(error){
                $rootScope.message = error.message ;

            });
        }, // login

        logout: function(){
            return auth.$unauth();
        },//logout

        requireAuth:function(){
            return auth.$requireAuth();
        }, //requireAuth

        register: function(user){
            auth.$createUser({
                email: user.email,
                password: user.password
            }).then(function(regUser){

                var regRef = new Firebase(FIREBASE_URL+'users').child(regUser.uid).set({
                    date: Firebase.ServerValue.TIMESTAMP,
                    regUser:regUser.uid,
                    firstname: user.fname,
                    lastname: user.lname,
                    email: user.email
                }); //user info

                myObject.login(user);
            }).catch(function(error){
                $rootScope.message = error.message;

            });// create user
        }//register
    };

    return myObject;
}]); // factory




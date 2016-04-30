app.controller('authController', function($scope,$http,$location, $rootScope) {

    $scope.user  = {username:'',password:''};
    $scope.alert = '';
    $scope.qustions=null;

    $scope.getLeader = function(){
        $http.get('/leaderboard').
            success(function(data){
                if(data["error"] == "login"){
                    $location.url('/');
                }
                $scope.leaderboard = data;
            }).
            error(function(){
                $scope.alert = "Cannot get LeaderBoard";
            })
    } ;


    $scope.login = function(user){
        $http.post('/auth/login', user).
            success(function(data) {
                $scope.loggeduser = data;
                $rootScope.currentuser = $scope.loggeduser;
                console.log($rootScope.currentuser);
                $location.path('/user');
            }).
            error(function() {
                $scope.alert = 'Login failed'
            });

    };

    $scope.signup = function(user){
        $http.post('/auth/signup', user).
            success(function(data) {
                $scope.alert = data.alert;
             }).
            error(function() {
                $scope.alert = 'Registration failed'
            });

    };

    $scope.checkTest = function(){
        console.log($scope.loggeduser.flag);
        return $scope.loggeduser.flag;
    };

    $scope.getQuestion = function(){
        $http.get('/questions')
        .success(function(data){
            $scope.questions = data;
            console.log($scope.questions);
        }).
        error(function(){
            $.scope.alert = "could not fetch questions";
        })
    };

    $scope.userinfo = function() {
        this.getLeader();
        $scope.getQuestion();
        $http.get('/auth/currentuser').
            success(function (data) {
                if(data["loggedIn"] == false)
                    $scope.check = false;
                else {
                    $scope.check = true;
                    $rootScope.currentuser = data;
                    $scope.loggeduser = data;
                    console.log($rootScope.currentuser);
                }
            }).
            error(function () {
                $scope.alert = 'Login failed'
            });
    };

    $scope.getOption = function(index, option){
        var ques = $scope.questions[index];
        var tmp = "option"+option;
        console.log(ques);
        console.log(tmp);
        return ques[tmp];
    }

    $scope.get = function(index){
        answers = $scope.loggeduser.answer;
        var tmp = 0;
        for(i=0;i<answers.length; i++){
            if(answers[i][index]){
                tmp =1;
                return [$scope.getOption(index, answers[i][index]), true];
            }
        }
        if(tmp == 0){
            return ["You have not attempted this question", false];
        }
        console.log(answers);
    };

    
    $scope.signin = function(){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
        console.log($scope.loggeduser);
        if($scope.loggeduser)
            $location.url('/user');
    };

    $scope.logout = function(){
        $http.get('/auth/logout')
            .success(function() {
                $scope.loggeduser = {};
                $rootScope.currentuser = {};
                $location.path('/signin');

            })
            .error(function() {
                $scope.alert = 'Logout failed'
            });
    };

});

var app = angular.module('myApp', ['ngRoute'])
.run(function($rootScope){
    $rootScope.test = false;
    $rootScope.currentUser = false;
})
.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/signin', {
                templateUrl: '/partials/signin.html',
                controller: 'authController'
            }).
            when('/signup', {
                templateUrl: '/partials/signup.html',
                controller: 'authController'
            }).
            when('/user', {
                templateUrl: '/partials/userinfo.html',
                controller: 'authController'
            }).
            when('/quiz', {
                templateUrl: '/partials/quiz.html',
                controller: 'quizController'
            }).
            when('/review', {
                templateUrl: '/partials/quizReview.html',
                controller: 'authController'
            }).
            otherwise({
                redirectTo: '/signin'
            });
    }]);
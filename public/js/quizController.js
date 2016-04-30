app.controller('quizController', function($scope, $http,$location, $rootScope, $timeout){
	
	$scope.q = 0;
	$scope.o = 0;
	$scope.final = [];
	$scope.alert = "Time Starts now";

	$scope.add = function(tmp, index){
		var flag = 0;
		for(i=0; i < $scope.final.length; i++){
			if($scope.final[i][index]){
				$scope.final[i][index] = tmp[index];
				$scope.final[i]['flag'] = tmp['flag'];
				flag=1;
			}
		}
		if(flag == 0)
			$scope.final.push(tmp);
		console.log($scope.final);

	};
	$scope.saveAnswer = function(index, option){
		var tmp = {};
		if (option == $scope.questions[index].answer){
			tmp[index] = option;
			tmp["flag"] = true;
		}
		else{
			tmp[index] = option;
			tmp["flag"] =  false;
		}
		$scope.alert = "Answer Saved";
		this.add(tmp, index);
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

	$scope.checkUser = function(){
		if($scope.loggeduser.flag == 1){
			alert("you have already answerd the quiz");
			$location.url('/user');
		}
	};

	$scope.signin = function(){
		console.log("AAAAAAAAAAAAAAAAAAAAAAAAA");
		console.log($scope.loggeduser);
		if($scope.loggeduser)
			$location.url('/user');
	};
	
	$scope.submitAnswer = function(){
		var score = 0;
		for(i=0; i<$scope.final.length; i++){
			if($scope.final[i]['flag'] == true)
				score += 5;
		}
		$http.post('/finishQuiz', {"answer": $scope.final, "score":score}).
		success(function(data){
			$location.url('/user');
		}).
		error(function(){
            $scope.alert = "Cannot get LeaderBoard";
        });
        console.log('/user');
        $location.url('/user');
	};

	$scope.countdown = 3;
	var myTimeout = null;

	$scope.onTimeout = function(){
		if($scope.countdown == 0){
			$scope.$broadcast('timer-stopped', 0);
			$timeout.cancel(myTimeout);
			return;
		}
		$scope.countdown --;
		myTimeout = $timeout($scope.onTimeout, 1000);
	}

	$scope.$on('timer-stopped', function(event, remaining){
		if(remaining==0){
			console.log("you ran out of time");
			alert("You ran out of time");
			$scope.submitAnswer();
		}
	});

	$scope.quiz = function(){
		this.getQuestion();
		//this.countDowner();
		myTimeout = $timeout($scope.onTimeout, 1000);

		console.log($scope.questions);
		$http.get('/auth/currentuser')
		.success(function(data){
			if(data["loggedIn"] == false)
				$scope.check=false;
			else{
				$scope.check=true;
				$rootScope.currentuser=data;
				$scope.loggeduser = data;
				console.log($scope.loggeduser);
				if($scope.loggeduser.flag == 1 ){
					alert("you can answer only once");
					$location.url("/user");
				}
				else{
					$http.get('/startQuiz')
					.success(function(data){
						console.log(data);
					})
					.error(function(){
						console.log('error');
					})
				}
			}
			
		}).
		error(function(){
			$scope.alert = "Login failed";
			$location.url('/signin');
		});

	};	

});
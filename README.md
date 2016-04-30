# QuizApp

This is a simple app created using the MEAN stack. 
### To install dependencies 
```
$ npm install
```
Install bower dependencies
```
$ bower install
```
Start the server
```
$ node server
```
or 
```
$ npm start
```


### directory structure

```
+-- _config
|	+-- db.js 					#information regarding the mongoDB
+-- _public
|	+-- _additionals 			#Theme files for the custom bootstrap theme
|	+-- _js
|	|	+-- app.js 				#basic routing for the application
|	|	+-- authController.js 	#Controller for passport and userInfo
|	|	+-- quizController.js 	#Controller for answering the quiz questions
|	+-- _partials 				#different pages
|	|	+-- quiz.html
| 	| 	+-- quizReview.html
| 	| 	+-- signin.html
|	|	+-- signup.html
|	|	+-- userinfo.html
|	+-- index.html 				#Layout for the pages
+--	_server
|	+-- _models
|	|	+--	questionmodel.js 	#Model for quiz questions
|	|	+-- usermodel.js 		#Model for users
|	+-- _routes
|	|	+-- auth.js
|	|	+-- basic.js
+-- package.json
+-- server.js 					#Entry point to the application
+-- bower.json
```

### API to add questions.
#### method: POST
structure:
```
{
	"question": "The question you want to ask",
	"option1":  "Option One",
	"option2": "option two",
	"option3": "option three", 
	"option4": "option four",
	"answer": "Correct Answer- 1/2/3/4"
}
```
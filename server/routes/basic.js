var path = require('path');

    module.exports = function(app) {

       // basic routes to handle request
        app.get('/', function(req, res) {
                console.log("Main route");
                res.sendFile(path.join(__dirname, '../../public', 'index.html'));

        });

        loggedin = function(req, res, next){
        	if(req.user){
        		next();
        	}else{
        		res.redirect('/#/login');
        	}
        }

        app.get('/#/user', loggedin, function(req, res){
        	console.log("/user");
        	res.sendFile(path.join(__dirname, '../../public', 'userinfo.html'));
        })



    };


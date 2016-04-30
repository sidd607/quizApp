
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var QuestionSchema = new Schema({

	question: {
		type: String,
		trim: true
	}, 
	option1: {
		type: String,
		trim: true
	},
	option2: {
		type: String,
		trim: true
	},
	option3: {
		type: String, 
		trim: true
	},
	option4: {
		type: String,
		trim: true
	},
	point: {
		type: Number,
		trim:true
	},
	answer: {
		type: Number,
		trim: true
	}
})
mongoose.model('Question', QuestionSchema);
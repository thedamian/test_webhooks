const http = require("http"); 
const express = require("express"); 
const app = express();
const port =  5009;

const cors = require('cors'); // cors middleware to have a great API experience
app.use(express.json()); // Now express no longer needs the body-parser middleware and has it's own.
app.use(cors());
//for Regular forms
app.use(express.urlencoded({extended: true})); // Regular 
app.use(express.json())

const morgan = require('morgan');
app.use(morgan('combined'))


const process = (type, req,res) => {

	const endpoint = req.path;

	console.log(" -------------------------- New " + type + " request --------------------------")
	console.log("req.headers",req.headers);
	if (req.params) {
	const path = req.params.path;
	console.log("path:",path);
	}
	if (req.query) {
		console.log("QueryString:", req.query)
	}
	if (req.body) {
		console.log("body:",req.body);
	}
	
	if (req.is('application/json')) {
		res.json({
			"message":`Successfully Accepted a post to ${endpoint}`,
			"body:": req.body ?? "No Body",
			"headers": req.headers,
			})

	} else {
		res.send("Thank you! Success");
	}

	console.log("-------------------------- END -------------------------- \n")
}

app.use((req, res, next) => {
	process(req.method,req,res);
});


var server = http.createServer(app); 
server.listen(port); // Point it to the port we defined above.
console.log("server up on http://localhost:"  +port);

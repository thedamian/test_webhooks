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

	console.log(`-------------------------- New ${type} request -------------------------- \n`)

	let reply = {"message":`Successfully Accepted a ${type} request to ${req.url}`};
	
	if (req.headers) {
		 reply.url = req.url.split("?")[0];
	}
	console.log("req.query",req.query)
	if (Object.keys(req.query).length > 0) {
		reply.query = req.query
	}
	if (req.body) {
		reply.body = req.body;
	}
	if (req.headers) {
		reply.headers = req.headers;
	}
	
	let replyText = "";	
	for (let [key, value] of Object.entries(reply)) {
		if (value) {
			if (key == "body" || key == "headers") {
				replyText += key + ": <BR />\n"
				for (let [key2, value2] of Object.entries(reply[key])) {
					replyText += `   ${key2}: ${JSON.stringify(value2)}<BR />\n`
				}
			} else {
				replyText += `${key}: ${JSON.stringify(value)}<BR />\n`
			}
		}
	}
	
	console.log(replyText.replaceAll("<BR />",""))

	if (req.is('application/json')) {
		res.json(reply)
	} else {
		res.send(replyText)
	}

	console.log("-------------------------- END -------------------------- \n")
}

app.use((req, res, next) => {
	process(req.method,req,res);
});


var server = http.createServer(app); 
server.listen(port); // Point it to the port we defined above.
console.log("server up on http://localhost:"  +port);

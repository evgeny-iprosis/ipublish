const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const pup = require('./puppeteer.js');
const bodyParser = require('body-parser');

//sqlite db models
const Report = require('./models/appreport');
const Application = require('./models/application');
const Schedule = require('./models/schedule');
const Run = require('./models/runs');

function sendReportSecure(args) {
	let interval = args.interval;
	pup.snapshotSecure(args);
	Run.add({
		name: args.name,
		email: args.email,
		date: '' + new Date()
	});
	setTimeout(sendReportSecure, interval, args);
}

function sendReportNonSecure(args) {
	let interval = args.interval;
	pup.snapshotNonSecure(args);
	Run.add({
		name: args.name,
		email: args.email,
		date: '' + new Date()
	});
	setTimeout(sendReportNonSecure, interval, args);
}

// Body Parser Middleware
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
	//res.render('contact');
});
//start server
app.listen(port, () => console.log(`server listening on port ${port}`));

app.post('/send', (req, res) => {
	console.log(req.body);
	pup.takeSS(req.body.email);
	return res.redirect('/success');
});

app.get('/success', (req, res) => {
	res.render('success');
});

// app.get('/try', (req, res) => {
// 	//console.log(req.body);
// 	console.log('Trying custom mail...');
// 	const args = {
// 		url:
// 			'http://35.156.190.99:8080/BOE/OpenDocument/opendoc/openDocument.jsp?sIDType=CUID&iDocID=AXb0jR1xevFLlX5hpPUGu.4',
// 		width: 800,
// 		height: 600,
// 		email: 'evgeny.grin@gmail.com',
// 		login: 'administrator',
// 		password: 'iProsis!@3'
// 	};
// 	//pup.snapshotNonSecure(args);
// 	pup.snapshotSecure(args);
// 	//return res.redirect("/success");
// 	console.log('Done');
// 	res.send({ status: 'done' });
// });

app.get('/reports', (req, res) => {
	Report.all((err, reports) => res.status(200).json(reports));
});

app.post('/newcshedule', (req, res) => {
	console.log('Got post job request : ');
	console.log(req.body);
	let newSchedule = req.body;
	res.status(200).json(newSchedule);

	let calculatedInterval = newSchedule.interval * newSchedule.intervalUnit;
	let url = newSchedule.url;
	if (newSchedule.user) {
		url = url + '?USER=' + newSchedule.user;
	}
	delete newSchedule.id;

	const args = {
		url: url,
		width: newSchedule.width,
		height: newSchedule.height,
		email: newSchedule.email,
		login: newSchedule.login,
		password: newSchedule.password,
		interval: calculatedInterval,
		name: newSchedule.name
	};

	if (newSchedule.isSecure) {
		console.log('Secure run...');
		sendReportSecure(args);
	} else {
		console.log('Non-Secure run...');
		sendReportNonSecure(args);
	}
	Schedule.add(newSchedule);
	res.status(201).json();
});

app.post('/newapp', (req, res) => {
	console.log('Got new app request : ');
	console.log(req.body);
	let newApp = req.body;
	Application.add(newApp);
	res.status(201).json();
});

// todo : by some reason method delete didn't work. Need to check or re-implement it with post...
// BTW delete in this case works fine with postman. Looks like the issue related to observer.
app.get('/delapp/:id', (req, res) => {
	console.log('Got new delete request for item : ');
	console.log(req.params.id);
	Application.delete(req.params.id);
	res.status(201).send({});
});

app.get('/listapps', (req, res) => {
	Application.all((err, applications) => res.status(200).json(applications));
});

app.get('/listschedules', (req, res) => {
	Schedule.all((err, schedules) => res.status(200).json(schedules));
});

app.get('/listlogs', (req, res) => {
	Run.all((err, runs) => res.status(200).json(runs));
});

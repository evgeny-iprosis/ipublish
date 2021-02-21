//Require modules
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const pup = require('./puppeteer.js');
const bodyParser = require('body-parser');

//sqlite db models
const Application = require('./models/application');
const Schedule = require('./models/schedule');
const Run = require('./models/runs');
const Role = require('./models/role');

//TODO for every model - implement full CRUD

function sendReportSecure(args) {
	let interval = args.interval;
	pup.snapshotSecure(args);
	Run.add({
		name: args.name,
		email: args.email,
		date: '' + new Date(),
	});
	setTimeout(sendReportSecure, interval, args);
}

function sendReportNonSecure(args) {
	let interval = args.interval;
	pup.snapshotNonSecure(args);
	Run.add({
		name: args.name,
		email: args.email,
		date: '' + new Date(),
	});
	setTimeout(sendReportNonSecure, interval, args);
}

// Body Parser Middleware
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

//start server
app.listen(port, () => console.log(`server listening on port ${port}`));

app.post('/newcshedule', (req, res) => {
	let newSchedule = req.body;
	console.log('Sheduler arguments as come from front-end', newSchedule);
	//TODO handle response
	res.status(200).json(newSchedule);
	let calculatedInterval = newSchedule.interval * newSchedule.intervalUnit;
	let url = newSchedule.url;
	// check if app defined by cuid
	if (newSchedule.cuid) {
		// iProsis BO server
		// TODO - understand how to get customer server? Same one where the app is deployed? .env Options?
		let serverUrl = 'http://35.156.190.99:8080';
		// TODO define it in .env
		let standardBOAppPrefix = 'BOE/OpenDocument/opendoc/openDocument.jsp?sIDType=CUID&iDocID=';
		url = serverUrl + '/' + standardBOAppPrefix + newSchedule.cuid;
	}
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
		name: newSchedule.name,
	};

	if (newSchedule.isSecure) {
		sendReportSecure(args);
	} else {
		sendReportNonSecure(args);
	}
	Schedule.add(newSchedule);
	res.status(201).json();
});

app.post('/newapp', (req, res) => {
	let newApp = req.body;
	Application.add(newApp, (err) => {
		if (err) {
			console.log('Error inserting application');
			console.log(err.message);
		}
	});
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
	Application.all((err, applications) => {
		if (err) {
			console.log('Error getting applications list');
			console.log(err.message);
		} else {
			res.status(200).json(applications);
		}
	});
});

app.get('/listschedules', (req, res) => {
	Schedule.all((err, schedules) => res.status(200).json(schedules));
});

app.get('/listlogs', (req, res) => {
	Run.all((err, runs) => res.status(200).json(runs));
});

// roles CRUD
app.post('/newrole', (req, res) => {
	let newRole = req.body;
	Role.add(newRole, (err) => {
		if (err) {
			console.log('Error inserting role');
			console.log(err.message);
			res.status(500).json({ error: err.message });
		} else {
			res.status(201).json();
		}
	});
});

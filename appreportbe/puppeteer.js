var request = require('request');
const puppeteer = require('puppeteer');
var urlencode = require('urlencode');
const mailer = require('./mailer');

exports.snapshotSecure = function (args) {
	const login = args.login;
	const password = args.password;
	const body =
		'<attrs xmlns="http://www.sap.com/rws/bip"> \r\n  <attr name="userName" type="string">' +
		login +
		'</attr>\r\n  <attr name="password" type="string">' +
		password +
		'</attr>\r\n  <attr name="auth" type="string" possibilities="secEnterprise,secLDAP,secWinAD,secSAPR3">secEnterprise</attr>\r\n</attrs>';

	var options = {
		method: 'POST',
		url: 'http://35.156.190.99:6405/biprws/logon/long',
		headers: {
			'cache-control': 'no-cache',
			authorization: 'Basic Og==',
			accept: 'application/json',
			'content-type': 'application/xml',
		},
		body: body,
	};

	request(options, function (error, response, body) {
		//TODO better to replace "request" by node-fetch
		if (error) {
			throw new Error(error);
		}
		var res = JSON.parse(body);
		var encodedToken = urlencode.encode(res.logonToken);
		args.url = args.url + '&token=' + encodedToken;
		//taking screenshot
		makeSnapShot(args);
	});
};

exports.snapshotNonSecure = function (args) {
	makeSnapShot(args);
};

function makeSnapShot(args) {
	let url = args.url;
	const width = args.width;
	const height = args.height;
	const email = args.email;

	console.log('Anapshot args in puppeeteer');
	console.log(args);

	//TODO in each await - make sure handle errors by catch. Or use then..catch instad of await
	(async () => {
		const browser = await puppeteer.launch({
			args: ['--disable-features=site-per-process'],
			headless: true,
		});

		const page = await browser.newPage();
		await page.setViewport({
			width: width,
			height: height,
		});

		await page.setDefaultNavigationTimeout(0); // disable timeout errors

		var startDate = new Date();
		await page.goto(url, {
			waitUntil: 'networkidle0',
		});
		var endDate = new Date();
		console.log('Time:' + (endDate.getTime() - startDate.getTime()) / 1000 + 's');
		await page.screenshot({
			path: './image/report.png',
		});
		await browser.close();

		mailer.sendMail(email);
		//TODO make sure mailer.sendMail to return value, possibly original promise.
		//Then resolve/catch the promise here, or return to caller
		console.log('  <' + email + '>');
	})();
}

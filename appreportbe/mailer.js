const nodemailer = require('nodemailer');
//sending email with the screenshot
const fs = require('fs');

//SMTP definitions
//TODO - to be moved to.env and.gitignore for security
//The definitions for gmail server should NOT be used for production. Require setting-on "Less segure apps" for this google account
//For production - use definition of customer's SMTP server, or anyway close it with customer
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const SMTP_SECURE = true;
const SMTP_USER = 'heshbonapp@gmail.com';
const SMTP_PASS = 'Asdf12#$';

exports.sendMail = function (email) {
	var mailTo;
	//SMTP transport
	let transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: SMTP_PORT,
		secure: SMTP_SECURE,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});
	//Mail options
	let mailOptions = {
		from: 'heshbonapp@gmail.com',
		to: email,
		subject: 'Automatic Application Report',
		text: '',
		html: '<h1 style="text-align:center">Application Report</h1><img src="cid:unique@image"/>',
		attachments: [
			{
				filename: 'report.png',
				path: __dirname + '/image/report.png',
				cid: 'unique@image', //to make embedded image
			},
		],
	};
	// Send mail
	transporter
		.sendMail(mailOptions)
		//TODO: better logging, save logs in DB or log file
		.then((response) => {
			console.log('Mail sucsesfully sent!');
		})
		.catch((err) => {
			console.log('Error sending mail');
		});
};

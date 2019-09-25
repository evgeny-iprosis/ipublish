const nodemailer = require('nodemailer');
//sending email with the screenshot
const fs = require('fs');

exports.sendMail = async function(email) {
	var mailTo;
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: 'evgeny.grin@iprosis.com',
			pass: 'Ksvu43&&'
		}
	});

	// setup email data with unicode symbols
	// "<iframe src='cid:unique2@cid' width='100px' height=50%>" +
	// '</iframe>',
	// streamSource: fs.createReadStream(
	// 	__dirname + '/image/signature.mht'
	// ),
	let mailOptions = {
		from: 'evgeny.grin@iprosis.com', // sender address
		to: email, // list of receivers
		subject: 'Automatic Application Report', // Subject line
		text: '', // plain text body
		html:
			"<h1 style='text-align:center'>Application Report<br><img src='cid:unique@cid'></h1>",
		
			
		attachments: [
			{
				filename: 'report.png',
				path: __dirname + '/image/report.png',
				cid: 'unique@cid'
			}
		]
	};

	console.log('HTML : ');
	console.log(mailOptions.html);

	// send mail with defined transport object
	let info = await transporter.sendMail(mailOptions);
};

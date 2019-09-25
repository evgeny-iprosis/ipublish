const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
//const exphbs = require('express-handlebars');
const pup = require('./puppeteer.js');
const bodyParser = require('body-parser');

function sendReport(mail, interval) {
  console.log('sending mail to mail, with interval : ', mail, interval);
  pup.takeSS(mail);
  var to = setTimeout(sendReport, interval, mail, interval);
  //console.log('New inteval : ', to);
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

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
  //pup.takeSS(req.body.email);
  //return res.redirect('/success');
});

app.get('/success', (req, res) => {
  res.render('success');
});

app.get('/try/:mail/:interval', (req, res) => {
  console.log('Trying custom mail and interval');
  var mail = req.params.mail;
  var interval = req.params.interval;
  console.log('Params mail and interval are : ', mail, interval);
  //   function sendReport() {
  //     console.log(
  //       'Sending report request with mail, interval : ',
  //       mail,
  //       interval
  //     );
  //     pup.takeSS(mail);
  //   }
  //sendReport(mail, interval);
  //return res.redirect("/success");
});

app.post('/try', (req, res) => {
  console.log('Got post job request : ');
  console.log(req.body);
  //res.status(200).json(req.body);
  res.send('this is response !!!');

  //var mail = req.params.mail;
  //var interval = req.params.interval;
  //console.log('Params mail and interval are : ', mail, interval);
  //   function sendReport() {
  //     console.log(
  //       'Sending report request with mail, interval : ',
  //       mail,
  //       interval
  //     );
  //     pup.takeSS(mail);
  //   }
  //sendReport(mail, interval);
  //return res.redirect("/success");
});

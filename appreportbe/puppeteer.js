var request = require('request');
const puppeteer = require('puppeteer');
var urlencode = require('urlencode');
const mailer = require('./mailer');

exports.snapshotSecure = function(args) {
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
      'content-type': 'application/xml'
    },
    body: body
  };

  console.log('Options : ');
  console.log(options);

  request(options, function(error, response, body) {
    if (error) throw new Error(error);

    // console.log('Response :');
    // console.log(response);

    console.log('Body :');
    console.log(body);

    var res = JSON.parse(body);
    var encodedToken = urlencode.encode(res.logonToken);

    console.log('Token : ');
    console.log(res.logonToken);
    console.log(encodedToken);

    args.url = args.url + '&token=' + encodedToken;

    console.log('Url with token : ');
    console.log(args.url);

    //taking screenshot
    makeSnapShot(args);
  });
};

exports.snapshotNonSecure = function(args) {
  makeSnapShot(args);
};

function makeSnapShot(args) {
  let url = args.url;
  const width = args.width;
  const height = args.height;
  const email = args.email;
  //const token = args.token;

  //url = url + token;

  console.log('args');
  console.log(args);

  (async () => {
    const browser = await puppeteer.launch({
      args: ['--disable-features=site-per-process'],
      headless: true
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: width,
      height: height
    });

    await page.setDefaultNavigationTimeout(0); // disable timeout errors

    var startDate = new Date();
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });
    //'networkidle0'
    //'domcontentloaded'

    var endDate = new Date();
    console.log(
      'Time:' + (endDate.getTime() - startDate.getTime()) / 1000 + 's'
    );

    await page.screenshot({
      path: './image/report.png'
    });

    await browser.close();

    mailer.sendMail(email);
    console.log('Report was sent to <' + email + '>');
  })();
}

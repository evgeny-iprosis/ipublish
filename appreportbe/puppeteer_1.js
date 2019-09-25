var request = require('request');
const puppeteer = require('puppeteer');
var urlencode = require('urlencode');
const mailer = require('./mailer');

exports.takeSS = function(email) {
  (async () => {
    const browser = await puppeteer.launch({
      args: ['--disable-features=site-per-process'],
      headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });
    var url = 'http://zolotomet.com';

    console.log('url : ', url);
    //await page.goto(url);
    var startDate = new Date();
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });
    //await page.frames().find(f => f.name() === "iframe");
    var endDate = new Date();
    console.log(
      'Time:' + (endDate.getTime() - startDate.getTime()) / 1000 + 's'
    );
    // await page.evaluate(() => {
    //   setTimeout(function() {}, 700);
    //   document
    //     .getElementById('openDocChildFrame')
    //     .contentWindow.document.getElementById('ICON_HIDE_RIGHT_PANEL_control')
    //     .click();
    //   document.getElementsByClassName('openRightPanel')[0].style.display =
    //     'none';
    // });

    setTimeout(function() {
      page.screenshot({
        path: './image/report.png'
      });
    }, 500);

    setTimeout(function() {
      browser.close();
    }, 2000);

    mailer.sendMail(email);
    console.log('Report was sent to <' + email + '>');
  })();
};

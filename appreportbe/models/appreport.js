const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/appreports.db', err => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  const sql =
    'CREATE TABLE IF NOT EXISTS reports (id integer primary key,' +
    'appName VARCHAR(255),' +
    'appUrl VARCHAR(255),' +
    'appMail VARCHAR(255),' +
    'sendInterval INTEGER,' +
    'startingDate VARCHAR(255),' +
    'login VARCHAR(255),' +
    'pssword VARCHAR(255),' +
    'isSecure TINYINT(4),' +
    'width INTEGER,' +
    'height INTEGER,' +
    'isPaused TINYINT(4)' +
    ')';
  db.run(sql);
  //   db.run('INSERT INTO todos(title, date) VALUES(?,?)', 'buy the milk', 'date1');
  //   db.run('INSERT INTO todos(title, date) VALUES(?,?)', 'rent a car', 'date2');
  //   db.run(
  //     'INSERT INTO todos(title, date) VALUES(?,?)',
  //     'feed the catttttttt',
  //     'date3'
  //   );
});

class Report {
  constructor() {}

  static all(callback) {
    db.all('SELECT * FROM reports', callback);
  }

  static add(report) {
    const sql =
      'INSERT INTO reports(appName, appUrl, appMail, sendInterval, startingDate, login, pssword, isSecure, isPaused, width, height) VALUES(?,?,?,?,?,?,?,?,?,?,?)';
    db.run(
      sql,
      report.appName,
      report.appUrl,
      report.appMail,
      report.sendInterval,
      report.startingDate,
      report.login,
      report.password,
      report.isSecure,
      report.isPaused,
      report.width,
      report.height
    );
  }

  //   static update(todo, callback){
  //     console.log(todo);
  //     const sql = 'UPDATE todos SET title = ? WHERE id = ?';
  //     db.run(sql, todo.title, todo.id, callback);
  //   };

  //   static delete(id, callback){
  //     const sql = 'DELETE FROM todos where id = ?';
  //     db.run(sql, id, callback);
  //   };
}

module.exports = Report;

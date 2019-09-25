const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/appreports.db', err => {
	if (err) {
		console.error(err.message);
	}
});

db.serialize(() => {
	const sql =
		'CREATE TABLE IF NOT EXISTS applications (id integer primary key,' +
		'name VARCHAR(255),' +
		'url VARCHAR(255)' +
		')';
	db.run(sql);
});

class Application {
	constructor() {}

	static all(callback) {
		db.all('SELECT * FROM applications', callback);
	}

	static delete(id) {
		const sql = 'DELETE FROM applications where id = ?';
		db.run(sql, id);
	}

	static add(application) {
		const sql = 'INSERT INTO applications(name, url) VALUES(?,?)';
		db.run(sql, application.name, application.url);
	}
}

module.exports = Application;

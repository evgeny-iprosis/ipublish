const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/appreports.db', err => {
	if (err) {
		console.error(err.message);
	}
});

db.serialize(() => {
	const sql =
		'CREATE TABLE IF NOT EXISTS runs (id integer primary key,' +
		'name VARCHAR(255),' +
		'email VARCHAR(255),' +
		'date VARCHAR(255)' +
		')';
	db.run(sql);
});

class Run {
	constructor() {}

	static all(callback) {
		db.all('SELECT * FROM runs', callback);
	}

	static delete(id) {
		const sql = 'DELETE FROM runs where id = ?';
		db.run(sql, id);
	}

	static add(run) {
		const sql = 'INSERT INTO runs(name, email, date) VALUES(?,?,?)';
		db.run(sql, run.name, run.email, run.date);
	}
}

module.exports = Run;

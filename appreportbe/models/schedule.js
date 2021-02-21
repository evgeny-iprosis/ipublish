const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/appreports.db', err => {
	if (err) {
		console.error(err.message);
	}
});

db.serialize(() => {
	const sql =
		'CREATE TABLE IF NOT EXISTS schedules (id integer primary key,' +
		'appId INTEGER,' +
		'email VARCHAR(255),' +
		'start VARCHAR(255),' +
		'interval INTEGER,' +
		'intervalUnit INTEGER,' +
		'login VARCHAR(255),' +
		'password VARCHAR(255),' +
		'isSecure TINYINT(4),' +
		'width INTEGER,' +
		'height INTEGER,' +
		'user VARCHAR(255),' +
		'status TINYINT(4)' +
		')';

	db.run(sql);
});

class Schedule {
	constructor() {}

	static all(callback) {
		db.all('SELECT * FROM schedules', callback);
	}

	static add(schedule) {
		const sql =
			'INSERT INTO schedules(appId, email, start, interval, intervalUnit, login, password, isSecure, width, height, user, status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
		db.run(
			sql,
			schedule.appId,
			schedule.email,
			schedule.start,
			schedule.interval,
			schedule.intervalUnit,
			schedule.login,
			schedule.password,
			schedule.isSecure,
			schedule.width,
			schedule.height,
			schedule.user,
			schedule.status
		);
	}
}

module.exports = Schedule;

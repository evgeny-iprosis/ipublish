const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/appreports.db', err => {
	if (err) {
		console.error(err.message);
	}
});

db.serialize(() => {
	const sql =
		'CREATE TABLE IF NOT EXISTS roles (id integer primary key,' +
		'name VARCHAR(255) NOT NULL UNIQUE,' +
		'mailSubject VARCHAR(255),' +
		'mailBody VARCHAR(1024)' +
		')';
	db.run(sql);
});

class Role {
	constructor() {}

	static getAll(callback) {
		db.all('SELECT * FROM roles', callback);
	}

	static getAllNamesDistinct(callback) {
		db.all('SELECT DISTINCT name FROM roles', callback);
	}

	static getByName(name, callback) {
		const sql = 'SELECT * FROM roles where name = ?';
		db.all(sql, [name], callback);
	}

	static getById(id, callback) {
		const sql = 'SELECT * FROM roles where id = ?';
		db.all(sql, [id], callback);
	}

	static add(role, callback) {
		const sql =
			'INSERT INTO roles(name, mailSubject, mailBody) VALUES(?,?,?)';
		db.run(sql, [role.name, role.mailSubject, role.mailBody], callback);
	}
	static delete(id, callback) {
		const sql = 'DELETE FROM roles where id = ?';
		db.run(sql, [id], callback);
	}
}

module.exports = Role;

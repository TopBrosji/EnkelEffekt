const sqlite3 = require('sqlite3').verbose();

// Koble til databasen (eller opprett den hvis den ikke finnes)
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

// Initialiser databasen med tabeller og data
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS dishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        votes INTEGER DEFAULT 0
    )`);

    // Legg til eksempler på matretter
    const stmt = db.prepare('INSERT INTO dishes (name, votes) VALUES (?, ?)');
    stmt.run('Pizza', 0);
    stmt.run('Sushi', 0);
    stmt.run('Burger', 0);
    stmt.run('Taco', 0);
    stmt.finalize();
});

// Lukk databasen
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});

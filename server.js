const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Koble til databasen
let db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.use(express.json());
app.use(express.static('public'));

// Hent alle matretter
app.get('/api/dishes', (req, res) => {
    db.all('SELECT * FROM dishes ORDER BY votes DESC', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

// Stem på en matrett
app.post('/api/vote', (req, res) => {
    const { id } = req.body;
    db.run('UPDATE dishes SET votes = votes + 1 WHERE id = ?', [id], function(err) {
        if (err) {
            return console.error(err.message);
        }
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

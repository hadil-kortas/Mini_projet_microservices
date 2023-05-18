const sqlite3 = require('sqlite3').verbose();
// Connexion la base de données
let db = new sqlite3.Database('./books.sqlite', (err) => {
if (err) {
console.error(err.message);
throw err;
}
console.log('Base de données connectée.');
});
// Création de la table "books"
db.run(`CREATE TABLE IF NOT EXISTS books (
id INTEGER PRIMARY KEY AUTOINCREMENT,
title TEXT NOT NULL,
author TEXT NOT NULL UNIQUE,
publicationYear NUMBER NOT NULL
)`);
// Modèle de données pour représenter un livre
class Book {
constructor(title, author, publicationYear) {
this.title = title;
this.author = author;
this.publicationYear = publicationYear;
}
// Enregistrer un nouvel livre dans la base de données
save(callback) {
db.run(`INSERT INTO books (title, author, publicationYear) VALUES (?, ?, ?)`,
[this.title, this.author, this.publicationYear], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`livre ${this.title} ajouté avec l'ID ${this.lastID}`);
callback(null, this.lastID);
});
}
// Rechercher tous les livres dans la base de données
static findAll(callback) {
db.all(`SELECT * FROM books`, [], function(err, rows) {
if (err) {
console.error(err.message);
return callback(err);
}
const books = rows.map(row => new Book(row.title, row.author,
row.publicationYear));
callback(null, books);
});
}

5

// Rechercher un livre par ID dans la base de données
static findById(id, callback) {
db.get(`SELECT * FROM books WHERE id = ?`, [id], function(err, row) {
if (err) {
console.error(err.message);
return callback(err);
}
if (!row) {
return callback(new Error('livre non trouvé'));
}
const book = new Book(row.title, row.author, row.publicationYear);
callback(null, book);
});
}
// Mettre à jour un livre dans la base de données
static updateById(id, title, author, publicationYear, callback) {
db.run(`UPDATE users SET title = ?, author = ?, publicationYear = ? WHERE id = ?`,
[title, author, publicationYear, id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Livre avec l'ID ${id} mis à jour.`);
callback(null);
});
}
// Supprimer un livre de la base de données
static deleteById(id, callback) {
db.run(`DELETE FROM books WHERE id = ?`, [id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Livre avec l'ID ${id} supprimé.`);
callback(null);
});
}
}
module.exports = db;
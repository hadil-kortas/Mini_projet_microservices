const sqlite3 = require('sqlite3').verbose();
// Connexion la base de données
let db = new sqlite3.Database('./customers.sqlite', (err) => {
if (err) {
console.error(err.message);
throw err;
}
console.log('Base de données connectée.');
});
// Création de la table "customers"
db.run(`CREATE TABLE IF NOT EXISTS customers (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
email TEXT NOT NULL UNIQUE,
phone NUMBER NOT NULL
)`);
// Modèle de données pour représenter un client
class Customer {
constructor(name, email, phone) {
this.name = name;
this.email = email;
this.phone = phone;
}
// Enregistrer un nouvel client dans la base de données
save(callback) {
db.run(`INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)`,
[this.name, this.email, this.phone], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`client ${this.name} ajouté avec l'ID ${this.lastID}`);
callback(null, this.lastID);
});
}
// Rechercher tous les clients dans la base de données
static findAll(callback) {
db.all(`SELECT * FROM customers`, [], function(err, rows) {
if (err) {
console.error(err.message);
return callback(err);
}
const customers = rows.map(row => new Customer(row.name, row.email,
row.phone));
callback(null, customers);
});
}


// Rechercher un client par ID dans la base de données
static findById(id, callback) {
db.get(`SELECT * FROM customers WHERE id = ?`, [id], function(err, row) {
if (err) {
console.error(err.message);
return callback(err);
}
if (!row) {
return callback(new Error('client non trouvé'));
}
const customer = new Customer(row.name, row.email, row.phone);
callback(null, customer);
});
}
// Mettre à jour un client dans la base de données
static updateById(id, name, email, phone, callback) {
db.run(`UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?`,
[name, email, phone, id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Client avec l'ID ${id} mis à jour.`);
callback(null);
});
}
// Supprimer un client de la base de données
static deleteById(id, callback) {
db.run(`DELETE FROM customers WHERE id = ?`, [id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Client avec l'ID ${id} supprimé.`);
callback(null);
});
}
}
module.exports = db;
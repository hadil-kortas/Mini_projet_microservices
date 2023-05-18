const sqlite3 = require('sqlite3').verbose();
// Connexion la base de données
let db = new sqlite3.Database('./orders.sqlite', (err) => {
if (err) {
console.error(err.message);
throw err;
}
console.log('Base de données connectée.');
});
// Création de la table "orders"
db.run(`CREATE TABLE IF NOT EXISTS orders (
id INTEGER PRIMARY KEY AUTOINCREMENT,
customerId INTEGER NOT NULL,
bookId INTEGER NOT NULL ,
quantity NUMBER NOT NULL ,
totalAmount FLOAT NOT NULL
)`);
// Modèle de données pour représenter une commande
class Order {
constructor(customerId, bookId, quantity, totalAmount) {
this.customerId = customerId;
this.bookId = bookId;
this.quantity = quantity;
this.totalAmount = totalAmount;
}
// Enregistrer une nouvelle commande dans la base de données
save(callback) {
db.run(`INSERT INTO orders (customerId, bookId, quantity, totalAmount) VALUES (?, ?, ?)`,
[this.customerId, this.bookId, this.quantity, this.totalAmount], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`commande ${this.customerId} ajouté avec l'ID ${this.lastID}`);
callback(null, this.lastID);
});
}
// Rechercher tous les commandes dans la base de données
static findAll(callback) {
db.all(`SELECT * FROM orders`, [], function(err, rows) {
if (err) {
console.error(err.message);
return callback(err);
}
const orders = rows.map(row => new Order(row.customerId, row.bookId,
row.quantity, row.totalAmount));
callback(null, orders);
});
}


// Rechercher une commande par ID dans la base de données
static findById(id, callback) {
db.get(`SELECT * FROM orders WHERE id = ?`, [id], function(err, row) {
if (err) {
console.error(err.message);
return callback(err);
}
if (!row) {
return callback(new Error('commande non trouvé'));
}
const order = new Order(row.customerId, row.bookId, row.quantity, row.totalAmount);
callback(null, order);
});
}
// Mettre à jour une commande dans la base de données
static updateById(id, customerId, bookId, quantity, totalAmount) {
db.run(`UPDATE orders SET customerId = ?, bookId = ?, quantity = ?, totalAmount = ?  WHERE id = ?`,
[customerId, bookId, quantity, totalAmount, id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Commande avec l'ID ${id} mis à jour.`);
callback(null);
});
}
// Supprimer une commande de la base de données
static deleteById(id, callback) {
db.run(`DELETE FROM orders WHERE id = ?`, [id], function(err) {
if (err) {
console.error(err.message);
return callback(err);
}
console.log(`Commande avec l'ID ${id} supprimé.`);
callback(null);
});
}
}
module.exports = db;
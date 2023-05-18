// orderResolver.js
const db = require('./models');
// Implémentation des résolveurs GraphQL
const orderResolver = {
order: ({ id }) => {
return new Promise((resolve, reject) => {
db.get(`SELECT * FROM orders WHERE id = ?`, [id], (err, row) => {
if (err) {
reject(err);
} else {
resolve(row);
}
});
});
},
orders: () => {
return new Promise((resolve, reject) => {
db.all(`SELECT * FROM orders`, [], (err, rows) => {
if (err) {
reject(err);
} else {
resolve(rows);
}
});
});
},
addOrder: ({ customerId, bookId, quantity, totalAmount }) => {
return new Promise((resolve, reject) => {
db.run(`INSERT INTO orders (customerId, bookId, quantity, totalAmount) VALUES (?, ?, ?, ?)`,
[customerId, bookId, quantity, totalAmount], function(err) {
if (err) {
reject(err);
} else {
resolve({ id: this.lastID, customerId, bookId, quantity, totalAmount });
}
});
});
},

updateOrder: ({ id, customerId, bookId, quantity, totalAmount }) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE orders SET customerId = ?, bookId = ?, quantity = ?, totalAmount = ? WHERE id = ?',
        [customerId, bookId, quantity, totalAmount, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, customerId, bookId, quantity, totalAmount });
          }
        }
      );
    });
  },

deleteOrder: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM orders WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(`Commande avec l'ID ${id} supprimé.`);
        }
      });
    });
  }
};
module.exports = orderResolver;
// bookResolver.js
const db = require('./models');
// Implémentation des résolveurs GraphQL
const bookResolver = {
book: ({ id }) => {
return new Promise((resolve, reject) => {
db.get(`SELECT * FROM books WHERE id = ?`, [id], (err, row) => {
if (err) {
reject(err);
} else {
resolve(row);
}
});
});
},
books: () => {
return new Promise((resolve, reject) => {
db.all(`SELECT * FROM books`, [], (err, rows) => {
if (err) {
reject(err);
} else {
resolve(rows);
}
});
});
},
addBook: ({ title, author, publicationYear }) => {
return new Promise((resolve, reject) => {
db.run(`INSERT INTO books (title, author, publicationYear) VALUES (?, ?, ?)`,
[title, author, publicationYear], function(err) {
if (err) {
reject(err);
} else {
resolve({ id: this.lastID, title, author, publicationYear });
}
});
});
},

updateBook: ({ id, title, author, publicationYear }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE books SET title = ?, author = ?, publicationYear = ? WHERE id = ?',
      [title, author, publicationYear, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id, title, author, publicationYear });
        }
      }
    );
  });
},

deleteBook: ({ id }) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM books WHERE id = ?`, [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(`Livre avec l'ID ${id} supprimé.`);
        }
      });
    });
  }
};
module.exports = bookResolver;
// Week1 queries.js - PLP Bookstore

// Switch to the correct DB in a JS-compatible way (works when loaded with `load()`):
db = db.getSiblingDB("plp_bookstore");

// -------- BASIC CRUD (examples) --------
// 1. Find all books in a specific genre
db.books.find({ genre: "Technology" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 2018 } });

// 3. Find books by a specific author
db.books.find({ author: "Brian Mbura" });

// 4. Update the price of a specific book
db.books.updateOne({ title: "The Silent Hour" }, { $set: { price: 1800 } });

// 5. Delete a book by its title
db.books.deleteOne({ title: "Broken Earth" });

// -------- ADVANCED QUERIES --------
// 6. Books in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Projection (only title, author, price)
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8. Sorting by price ascending
db.books.find().sort({ price: 1 });

// 9. Sorting by price descending
db.books.find().sort({ price: -1 });

// 10. Pagination example - page 1 (5 per page)
db.books.find().limit(5);

// 11. Pagination example - page 2
db.books.find().skip(5).limit(5);

// -------- AGGREGATION PIPELINES --------
// 12. Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" }, totalBooks: { $sum: 1 } } },
  { $sort: { avgPrice: -1 } }
]);

// 13. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 14. Group books by decade and count
db.books.aggregate([
  {
    $addFields: {
      decade: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] }
    }
  },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
]);

// -------- INDEXING --------
// 15. Create an index on title
db.books.createIndex({ title: 1 });

// 16. Create a compound index on author + published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 17. Explain example (execution stats)
db.books.find({ title: "Code Masters" }).explain("executionStats");

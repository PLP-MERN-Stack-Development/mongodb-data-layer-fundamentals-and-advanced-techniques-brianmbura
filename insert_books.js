const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://127.0.0.1:27017");

async function run() {
  try {
    await client.connect();
    const db = client.db("library");
    const books = db.collection("books");

    const sampleBooks = [
      { title: "Atomic Habits", author: "James Clear", year: 2018, pages: 306, genre: "Self-help" },
      { title: "The Alchemist", author: "Paulo Coelho", year: 1988, pages: 197, genre: "Fiction" },
      { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", year: 1997, pages: 336, genre: "Finance" },
      { title: "Deep Work", author: "Cal Newport", year: 2016, pages: 296, genre: "Productivity" },
      { title: "Clean Code", author: "Robert C. Martin", year: 2008, pages: 464, genre: "Programming" }
    ];

    await books.insertMany(sampleBooks);
    console.log("Books successfully inserted!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();

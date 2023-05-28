const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.error("Failed! ", err));

const asc = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Auther = mongoose.model("Auther", asc);

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // relation between models Book and Auther
    // auther: {
    //   type: mongoose.Schema.Types.ObjectId, // fetch id the auther
    //   ref: "Auther",
    // },
    auther: [asc], // this case accepting only schema
  }),
);

async function createAuther(name, description, age) {
  const auther = Auther({ name, description, age });
  const result = await auther.save(); // save in database
  console.log(`create auther: ${result}`);
}
// createAuther("Amjad", "description1", 45);

async function createBook(name, description, auther) {
  const book = Book({ name, description, auther });
  const result = await book.save();
  console.log(`create book: ${result}`);
}
// more in order of outbut - recommended
// createBook("node", "description", "62238b387d7f246b04c2fa16");

// faster in terms of performance and less codes
// createBook("sqlDB", "description", [
//   new Auther({ name: "Fares", description: "description", age: 40 }),
//   new Auther({ name: "Samer", description: "description", age: 30 }),
//   new Auther({ name: "Basel", description: "description", age: 20 }),
// ]);

// fetch all books
async function getBooks() {
  const books = await Book.find().populate("auther", "-_id name age"); // fetch name and age without id from auther
  // .select("-_id name description"); // fetch name and description without id from Book
  console.log(`all books: ${books}`);
}
// getBooks();

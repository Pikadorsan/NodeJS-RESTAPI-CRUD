const mongoose = require('mongoose');
var { buildSchema } = require('graphql');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
  });
const BookModel = mongoose.model('users', bookSchema);

var schema = buildSchema(`
    input BookInput {
      title: String
      author: String
    }
    type Book {
      id: ID!
      title: String
      author: String
    }
    type Query {
      getBook(id: ID!): Book
      getBooks: [Book!]!
    }
    type Mutation {
      createBook(input: BookInput): Book
      updateBook(id: ID!, input: BookInput): Book
    }
`);

var root = {
  getBook: async ({ id }) => {
    try {
      const book = await BookModel.findById(id);
      if (!book) {
        throw new Error(`Book with id ${id} not found.`);
      }
      return {
        id: book.id,
        title: book.title,
        author: book.author,
      };
    } catch (err) {
      throw new Error(`Error while fetching book with id ${id}: ${err}`);
    }
  },

  getBooks: async () => {
    try {
      const books = await BookModel.find({});
      return books.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
      }));
    } catch (err) {
      throw new Error(`Error while fetching books: ${err}`);
    }
  },

  createBook: async ({ input }) => {
    try {
      const book = await BookModel.create(input);
      return {
        id: book.id,
        title: book.title,
        author: book.author,
      };
    } catch (err) {
      throw new Error(`Error while creating book: ${err}`);
    }
  },

  updateBook: async ({ id, input }) => {
    try {
      const book = await BookModel.findByIdAndUpdate(id, input, {
        new: true,
      });
      if (!book) {
        throw new Error(`Book with id ${id} not found.`);
      }
      return {
        id: book.id,
        title: book.title,
        author: book.author,
      };
    } catch (err) {
      throw new Error(`Error while updating book with id ${id}: ${err}`);
    }
  },
};

module.exports = {
    schema,
    root
};

/*
mutation {
  createBook(input: {author: "Ałtuł Duck", title: "W PUSTYNI I W PUSZCZY"}) {
    id
  }
}
*/
require('dotenv').config();

const password = process.env.DB_PASSWORD;
const username = process.env.DB_USERNAME;

module.exports = {
  mongoURI: `mongodb+srv://${username}:${password}@practice-w9vfa.mongodb.net/test?retryWrites=true&w=majority`,
};

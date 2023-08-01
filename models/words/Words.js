const db = require("../../db/connection");

class Words {
  constructor(word, pronunciation, added_by) {
    this.word = word;
    this.pronunciation = pronunciation;
  }

  async addWord() {
    try {
      const sql = `INSERT INTO words SET ?`;
      const wordValues = {
        word: this.word,
        pronunciation: this.pronunciation,
      };
      const [data, _] = await db.query(sql, wordValues);
      return data;
    } catch (error) {
      console.log(error + "--- add word ---");
    }
  }

  static async getAllWords() {
    try {
      const sql = `SELECT * FROM words AS w
                    INNER JOIN word_definition AS wd
                    ON w.word_id = wd.word_id

                    INNER JOIN word_part_of_speech AS wps
                    ON wd.definition_id = wps.definition_id
                    GROUP BY word;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all words ---");
    }
  }

  static async getRandomWord() {
    try {
      // get word
      const sqlWord = `SELECT * FROM words AS w
                  WHERE LENGTH(word) <= 5
                  ORDER BY RAND()
                  LIMIT 1`;
      const [word, _1] = await db.execute(sqlWord);

      // get definitions of word
      const sqlDefinition = `SELECT * FROM word_definition AS wd
                            LEFT JOIN word_part_of_speech AS wps
                            on wd.definition_id = wps.definition_id
                            WHERE word_id = '${word[0].word_id}'`;
      const [definition, _2] = await db.execute(sqlDefinition);

      return { wordData: word[0], definitionData: definition };
    } catch (error) {
      console.log(error + "--- get random word ---");
    }
  }

  static async getWordById(word_id) {
    try {
      const sql = `SELECT * FROM words WHERE word_id = '${word_id}';`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get word by id ---");
    }
  }

  static async getWord(word) {
    try {
      const sql = `SELECT * FROM words WHERE word = '${word}' LIMIT 1;`;
      const [data, _] = await db.execute(sql);
      return data[0];
    } catch (error) {
      console.log(error + "--- get word ---");
    }
  }
}

module.exports = Words;

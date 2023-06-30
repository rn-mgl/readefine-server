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
}

module.exports = Words;

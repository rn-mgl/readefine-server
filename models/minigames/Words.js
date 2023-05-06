const db = require("../../db/connection");

class Words {
  constructor(word, definition, syllable, part_of_speech, pronunciation, usage, added_by) {
    this.word = word;
    this.definition = definition;
    this.syllable = syllable;
    this.part_of_speech = part_of_speech;
    this.pronunciation = pronunciation;
    this.usage = usage;
    this.added_by = added_by;
  }

  async createWord() {
    try {
      const sql = "INSERT INTO words SET ?;";
      const wordValues = {
        word: this.word,
        definition: this.definition,
        syllable: this.syllable,
        part_of_speech: this.part_of_speech,
        pronunciation: this.pronunciation,
        usage: this.usage,
        added_by: this.added_by,
      };
      const [data, _] = await db.query(sql, wordValues);
      return data;
    } catch (error) {
      console.log(error + "--- create word ---");
    }
  }

  static async updateWord(
    word_id,
    word,
    definition,
    syllable,
    part_of_speech,
    pronunciation,
    usage,
    added_by
  ) {
    try {
      const sql = `UPDATE words SET ?
                    WHERE word_id = '${word_id}';`;
      const wordValues = {
        word,
        definition,
        syllable,
        part_of_speech,
        pronunciation,
        usage,
        added_by,
      };
      const [data, _] = await db.query(sql, wordValues);
      return data;
    } catch (error) {
      console.log(error + "--- update word---");
    }
  }

  static async deleteWord(word_id) {
    try {
      const sql = `DELETE FROM words
                    WHERE word_id = '${word_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- delete word---");
    }
  }

  static async getAllWords() {
    try {
      const sql = `SELECT * FROM words;`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get all words---");
    }
  }

  static async getWord(word_id) {
    try {
      const sql = `SELECT * FROM words
                    WHERE word_id = '${word_id}';`;
      const [data, _] = await db.execute(sql);
      return data;
    } catch (error) {
      console.log(error + "--- get word---");
    }
  }
}

module.exports = Words;

const db = require("../../db/connection");

class WordPartOfSpeech {
  constructor(definition_id, part_of_speech) {
    this.definition_id = definition_id;
    this.part_of_speech = part_of_speech;
  }

  async addPartOfSpeech() {
    try {
      const sql = `INSERT INTO word_part_of_speech (definition_id, part_of_speech) VALUES (?, ?) ;`;
      const partOfSpeechValues = [this.definition_id, this.part_of_speech];
      const [data, _] = await db.execute(sql, partOfSpeechValues);
      return data;
    } catch (error) {
      console.log(error + "--- add part of speech ---");
    }
  }
}

module.exports = WordPartOfSpeech;

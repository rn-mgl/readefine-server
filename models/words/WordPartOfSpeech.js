const db = require("../../db/connection");

class WordPartOfSpeech {
  constructor(definition_id, part_of_speech, added_by) {
    this.definition_id = definition_id;
    this.part_of_speech = part_of_speech;
    this.added_by = added_by;
  }

  async addPartOfSpeech() {
    try {
      const sql = `INSERT INTO word_part_of_speech SET ? ;`;
      const partOfSpeechValues = {
        definition_id: this.definition_id,
        part_of_speech: this.part_of_speech,
        added_by: this.added_by,
      };
      const [data, _] = await db.query(sql, partOfSpeechValues);
      return data;
    } catch (error) {
      console.log(error + "--- add part of speech ---");
    }
  }
}

module.exports = WordPartOfSpeech;

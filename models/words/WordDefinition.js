const db = require("../../db/connection");

class WordDefinition {
  constructor(word_id, definition, example) {
    this.word_id = word_id;
    this.definition = definition;
    this.example = example;
  }

  async addDefinition() {
    try {
      const sql = `INSERT INTO word_definition SET ? ;`;
      const definitionValues = {
        word_id: this.word_id,
        definition: this.definition,
        example: this.example,
      };
      const [data, _] = await db.query(sql, definitionValues);
      return data;
    } catch (error) {
      console.log(error + "--- create definition ---");
    }
  }
}

module.exports = WordDefinition;

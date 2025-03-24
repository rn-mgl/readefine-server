const db = require("../../db/connection");

class Story {
  constructor(title, author, book_cover, audio, lexile, genre) {
    this.title = title;
    this.author = author;
    this.book_cover = book_cover;
    this.audio = audio;
    this.lexile = lexile;
    this.genre = genre;
  }

  async createStory() {
    try {
      const sql = `INSERT INTO story (title, author, book_cover, audio, lexile, genre) 
                  VALUES (?, ?, ?, ?, ?, ?);`;
      const storyValues = [
        this.title,
        this.author,
        this.book_cover,
        this.audio,
        this.lexile,
        this.genre,
      ];
      const [data, _] = await db.execute(sql, storyValues);
      return data;
    } catch (error) {
      console.log(error + "--- create story ---");
    }
  }

  static async updateStory(
    story_id,
    title,
    author,
    book_cover,
    audio,
    lexile,
    genre
  ) {
    try {
      const sql = `UPDATE story title = ? author = ? book_cover = ? audio = ? lexile = ? genre = ?
                    WHERE story_id = ?;`;
      const storyValues = [
        title,
        author,
        book_cover,
        audio,
        lexile,
        genre,
        story_id,
      ];
      const [data, _] = await db.execute(sql, storyValues);
      return data;
    } catch (error) {
      console.log(error + "--- update story ---");
    }
  }

  static async deleteStory(story_id) {
    try {
      const sql = `DELETE FROM story
                    WHERE story_id = ?;`;
      const storyValues = [story_id];
      const [data, _] = await db.execute(sql, storyValues);
      return data;
    } catch (error) {
      console.log(error + "--- delete story ---");
    }
  }

  static async getAllStories(
    searchFilter,
    lexileRangeFilter,
    sortFilter,
    dateRangeFilter
  ) {
    const lexileFrom = lexileRangeFilter.from ? lexileRangeFilter.from : 0;
    const lexileTo = lexileRangeFilter.to ? lexileRangeFilter.to : 1400;
    const dateFrom = dateRangeFilter.from
      ? dateRangeFilter.from
      : "19990101T123000.000Z";
    const dateTo = dateRangeFilter.to ? dateRangeFilter.to : new Date();
    try {
      const sql = `SELECT s.author, s.book_cover, s.audio,
                  s.date_added, s.genre, s.lexile, s.story_id, t.test_id, s.title,

                  CASE 
                    WHEN t.story_id IS NOT NULL THEN 1 ELSE 0
                  END AS has_test
                  
                  FROM story AS s

                  LEFT JOIN test AS t
                  ON s.story_id = t.story_id
                  
                  WHERE s.${searchFilter.toSearch} LIKE ?
                  AND 
                      s.lexile >= ?
                  AND 
                      s.lexile <= ?
                  AND 
                      CAST(s.date_added AS DATE) >= ?
                  AND 
                      CAST(s.date_added AS DATE) <= ?
                  ORDER BY s.${sortFilter.toSort} ${sortFilter.sortMode};`;

      const storyValues = [
        `%${searchFilter.searchKey}%`,
        lexileFrom,
        lexileTo,
        dateFrom,
        dateTo,
      ];

      const [data, _] = await db.execute(sql, storyValues);

      return data;
    } catch (error) {
      console.log(error + "--- get all stories ---");
    }
  }

  static async getAllUserStories(userId, searchFilter, sortFilter, userLexile) {
    const lexileFrom = parseInt(userLexile) - 100;
    const lexileTo = parseInt(userLexile) + 50;

    try {
      const sql = `SELECT s.author, s.book_cover, s.audio,
                  s.date_added, s.genre, s.lexile, s.story_id, t.test_id, s.title, rs.read_by,

                  CASE
                    WHEN rs.read_by = ? THEN 1 ELSE 0
                  END AS is_read,

                  CASE
                    WHEN tt.taken_by = ? THEN 1 ELSE 0
                  END AS is_taken

                  FROM story AS s

                  LEFT JOIN test AS t
                  ON s.story_id = t.story_id

                  LEFT JOIN read_story AS rs
                  ON s.story_id = rs.story_id
                  AND rs.read_by = ?

                  LEFT JOIN taken_test AS tt
                  ON t.test_id = tt.test_id
                  AND tt.taken_by = ?

                  WHERE s.${searchFilter.toSearch} LIKE ?
                  AND 
                      s.lexile >= ?
                  AND 
                      s.lexile <= ?
                  ORDER BY s.${sortFilter.toSort} ${sortFilter.sortMode};`;

      const storyValues = [
        userId,
        userId,
        userId,
        userId,
        `%${searchFilter.searchKey}%`,
        lexileFrom,
        lexileTo,
      ];

      const [data, _] = await db.execute(sql, storyValues);

      return data;
    } catch (error) {
      console.log(error + "--- get all stories ---");
    }
  }

  static async getStory(story_id) {
    try {
      const sql = `SELECT * FROM story
                    WHERE story_id = ?;`;
      const storyValues = [story_id];
      const [data, _] = await db.execute(sql, storyValues);
      return data[0];
    } catch (error) {
      console.log(error + "--- get story ---");
    }
  }
}

module.exports = Story;

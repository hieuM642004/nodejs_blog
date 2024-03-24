const commentService = require("../services/comment");



class commentController {
  //ADD COMMENT
  static async addComment(req, res) {
    try {
      await commentService.addComment(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //GET ALL COMMENTS
  static async getAllComments(req, res) {
    try {
      await commentService.getAllComments(req, res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = commentController;

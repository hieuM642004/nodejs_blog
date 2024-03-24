const Comment = require("../models/Comment");



class commentService {
  //ADD COMMENt
static async addComment  (req, res)  {
    try {
      const newComment = new Comment(req.body);
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  }

  //GET ALL GENRESS
static async getAllComments  (req, res)  {
    try {
      const comments = await Comment.find();
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  }

//   //GET AN GENRES
//   getAnGenres: async (req, res) => {
//     try {
//       const genres = await Genres.findById(req.params.id);
//       res.status(200).json(genres);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   //UPDATE GENRES
//   updateGenres: async (req, res) => {
//     try {
//       const genres = await Genres.findById(req.params.id);
//       await genres.updateOne({ $set: req.body });
//       res.status(200).json("Updated successfully!");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },

//   //DELETE GENRES
//   deleteGenres: async (req, res) => {
//     try {
//       await Genres.findByIdAndDelete(req.params.id);
//       res.status(200).json("Deleted successfully!");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   },
};

module.exports = commentService;
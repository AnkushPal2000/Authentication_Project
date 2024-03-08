const express = require("express");
const { getNotes, createNote, deleteNote, updateNote } = require("../controller/noteController");
const auth = require("../middlewares/auth")
const noteRouter = express.Router();


noteRouter.get('/get-notes', auth, getNotes);

noteRouter.post('/create-notes', auth, createNote);

noteRouter.delete('/delete-notes/:id', auth, deleteNote);

noteRouter.put('/update-notes/:id', auth, updateNote);

module.exports = noteRouter;  //exporting the router so it can be used in server.js
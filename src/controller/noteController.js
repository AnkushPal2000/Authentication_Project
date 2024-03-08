const noteModel = require('../models/note');

const createNote = async (req, resp) => {

    const { title, description } = req.body;
    console.log(req.body)

    const newNote = new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });
    try {
        console.log(newNote);
        await newNote.save();
        resp.status(201).json(newNote);

    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Something went wrong in CREATE----NOTE" });
    }


}
const updateNote = async (req, resp) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const newNote = {
        title: title,
        description: description,
        userId: req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id, newNote, { new: true });
        resp.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Something went wrong in UPDATE---NOTE" });
    }
}
const deleteNote = async (req, resp) => {
    const id = req.params.id;

    try {
        const note = await noteModel.findByIdAndDelete(id);
        resp.status(202).json(note)
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Something went wrong in DELETE---NOTE" });
    }

}
const getNotes = async (req, resp) => {

    try {
        const notes = await noteModel.find({ userId: req.userId })
        resp.status(200).json(notes)
    } catch (error) {
        console.log(error);
        resp.status(500).json({ message: "Something went wrong in DELETE---NOTE" });
    }
}

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNotes
}
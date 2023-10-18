import {
  noteModel
} from "../../../database/models/notes.model.js"

import jwt from "jsonwebtoken"

const addNote = async (req, res) => {

  const {title,desc,createdBy} = req.body
  await noteModel.insertMany({title,desc,createdBy})
  res.json({ message: "success"})
  
}

const showAllNotesByUser = async (req, res) => {

  const {userID} = req.params
  let allNotes = await noteModel.find({createdBy: userID}).populate('createdBy', 'name -_id')
  res.json({allNotes})

}
const updateNote = async (req, res) => {
  const {
    title,
    desc,
    id
  } = req.body

  let note = await noteModel.findByIdAndUpdate(id, {
    title,
    desc
  }, {
    new: true
  })
  if (!note) return res.json({
    message: "note not found",
    note
  })
  res.json({
    message: "success",
    note
  })
}
const deleteNote = async (req, res) => {
  const {
    id
  } = req.body

  let note = await noteModel.findByIdAndDelete(id)
  if (!note) return res.json({
    message: "note not found",
    note
  })
  res.json({
    message: "success Deleted",
    note
  })
}

const showAllNotes = async (req, res) => {

  let allNotes = await noteModel.find({}).populate('createdBy', 'name -_id')
  res.json({
    allNotes
  })
}

export {
  addNote,
  showAllNotesByUser,
  updateNote,
  deleteNote,
  showAllNotes
}
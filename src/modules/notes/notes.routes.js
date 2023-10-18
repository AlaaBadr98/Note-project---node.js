import express from "express"
import * as notesController from './notes.controller.js'
import { auth } from "../../middleware/auth.js"

const notesRouter = express.Router()

notesRouter.get('/notesByUser/:userID',auth,notesController.showAllNotesByUser)
notesRouter.get('/allNotes',notesController.showAllNotes)
notesRouter.post('/addNote',notesController.addNote)
notesRouter.post('/updateNote',notesController.updateNote)
notesRouter.delete('/deleteNote',notesController.deleteNote)


export default notesRouter 
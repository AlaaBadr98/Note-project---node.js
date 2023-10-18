import {dbConnection} from './database/dbConnection.js'
import express from 'express'
import userRouter from './src/modules/user/user.router.js'
import notesRouter from './src/modules/notes/notes.routes.js'
import { bootstrap } from './src/app.routes.js'
const app = express()
const port = 5000
app.use(express.json())
bootstrap(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

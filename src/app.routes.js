import { dbConnection } from "../database/dbConnection.js"
import { AppError } from "./app.error.js";
import notesRouter from "./modules/notes/notes.routes.js";
import userRouter from "./modules/user/user.router.js";


export const bootstrap = (app)=>{
    dbConnection();
    app.use("/auth",userRouter);
    app.use("/note",notesRouter);

    app.all("*",(req,res,next)=>{
        next(new AppError("Page Not Found", 404))
    })
    app.use((err, req, res, next) => {
        console.log(err);
        const error = err.message;
        const code = err.statusCode || 500;
        process.env.MODE == "PRODUCTION"
          ? res.status(code).json({ message: "Error", error })
          : res.status(code).json({ message: "Error", error, stack: err.stack });
      });
} 
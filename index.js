import express from "express"
import mongoose from "mongoose"
import multer from "multer"

import { UserController, PostController } from "./controllers/index.js"
import { auth, valid } from "./utils/index.js"

import * as Validation from "./validation.js"


const app = express()
app.listen(1111, (err) => err ? console.log("SERVER ERROR", err) : console.log("SERVER OK"))
app.use(express.json()) // * MANDATORY understand json

mongoose.connect("mongodb+srv://enotowitch:qwerty123@cluster0.9tnodta.mongodb.net/test2?retryWrites=true&w=majority")
	.then(console.log("DB OK")).catch(err => console.log("DB ERROR", err))

// ! user
app.post("/register", Validation.user, valid, UserController.register)
app.post("/login", Validation.user, valid, UserController.login)
app.post("/auth", auth, UserController.auth)
// ? user

// ! post
app.get("/post", PostController.getAll)
app.get("/post/:id", PostController.getOneSimple)
app.get("/post2/:id", PostController.getOneComplex)

app.delete("/post/:id", PostController.remove)
app.patch("/post/:id", auth, Validation.post, valid, PostController.update)

app.post("/post", auth, Validation.post, valid, PostController.create)
// ? post

// ! multer
const storage = multer.diskStorage({
	"destination": (req, file, cb) => {
		cb(null, "upload")
	},
	"filename": (req, file, cb) => {
		cb(null, file.originalname)
	}
})

const upload = multer({ storage })

app.post("/upload", upload.single("image"), (req, res) => {
	res.json({
		url: `upload/${req.file.originalname}`
	}
	)
})

app.use("/upload", express.static("upload")) // * MANDATORY understand /upload
// ? multer
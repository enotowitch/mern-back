import { body } from "express-validator"

export const user = [
	body("email").isEmail(),
	body("password").isLength({ min: 5 })
]

export const post = [
	body("title").isLength({ min: 5 }),
	body("text").isLength({ min: 5 })
]
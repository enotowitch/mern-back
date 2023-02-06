import { validationResult } from "express-validator"

export const valid = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		console.log(errors.array())
		return res.status(500).json(errors.array())
	}

	next()
}
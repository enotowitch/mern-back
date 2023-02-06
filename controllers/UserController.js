import UserModel from "../models/User.js";

import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async (req, res) => {

	try {

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			console.log(errors.array())
			return res.status(500).json(errors.array())
		}

		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)

		const doc = await new UserModel({
			email: req.body.email,
			passwordHash: hash
		})

		const user = await doc.save()

		const { passwordHash, ...userData } = user._doc

		res.json({ ...userData })

	} catch (err) {
		console.log(err)
		res.status(500).json({
			msg: "ERR: createUser"
		})
	}
}

export const login = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email })

		if (user) {
			const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash)
			if (isValidPass) {

				const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "30d" })

				const { passwordHash, ...userData } = user._doc

				res.json({ ...userData, token })
			}
		}

	} catch (err) {
		console.log(err)
		res.status(500).json({
			msg: "ERR: login 2"
		})
	}

}

export const auth = async (req, res) => {
	try {
		const user = await UserModel.findById({ _id: req.userId })

		const { passwordHash, ...userData } = user._doc

		res.json({ ...userData })

	} catch (err) {
		console.log(err)
		res.status(500).json({
			msg: "ERR: auth 2"
		})
	}
}
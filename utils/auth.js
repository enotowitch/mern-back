import jwt from "jsonwebtoken"

export const auth = async (req, res, next) => {

	try {
		const token = req.headers.authorization && req.headers.authorization.replace(/Bearer /, "")

		if (!token) {
			return res.status(500).json({
				msg: "ERR: token"
			})
		}

		const decoded = jwt.verify(token, "secret123")

		if (!decoded) {
			return res.status(500).json({
				msg: "ERR: decoded"
			})
		}

		req.userId = decoded.id
		next()

	} catch (err) {
		console.log(err)
		return res.status(500).json({
			msg: "ERR: auth"
		})
	}

}
import PostModel from "../models/Post.js"


export const create = async (req, res) => {

	try {

		const doc = new PostModel({
			...req.body,
			user: req.userId,
		})

		const post = await doc.save()

		res.json(post)

	} catch (err) {
		console.log(err)
		return res.status(500).json({ msg: "ERR: create post 1" })
	}
}

export const getAll = async (req, res) => {
	const post = await PostModel.find().populate("user").exec() // * populate("user").exec()
	res.json(post)
}

export const getOneSimple = async (req, res) => {
	const post = await PostModel.findById(req.params.id)
	res.json(post)
}

export const getOneComplex = async (req, res) => {
	const post = await PostModel.findOneAndUpdate(
		{
			_id: req.params.id
		},
		{
			$inc: { viewCount: 1 }
		},
		{ returnDocument: "after" }
	)
	res.json(post)
}

export const remove = async (req, res) => {

	const postId = req.params.id

	PostModel.findByIdAndDelete(
		{ _id: postId },
		(err, doc) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					msg: "ERR: remove post 1"
				})
			}

			if (!doc) {
				console.log(err)
				return res.status(500).json({
					msg: "ERR: remove post 2: no doc"
				})
			}

			res.json({
				success: true
			})
		}
	)


}

export const update = async (req, res) => {
	try {

		const postId = req.params.id

		const post = await PostModel.updateOne(
			{ _id: postId },
			{
				...req.body,
				user: req.userId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						msg: "ERR: update error 1"
					})
				}

				if (!doc) {
					console.log(err)
					return res.status(500).json({
						msg: "ERR: update error 2"
					})
				}

				res.json(post)
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			msg: "ERR: update error 3"
		})
	}
}

export const tags = async (req, res) => {
	const posts = await PostModel.find().limit(5).exec() // * limit

	const tags = posts.map(post => post.tags)
	res.json(tags.flat())
}
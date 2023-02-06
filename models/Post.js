import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		unique: true
	},
	text: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	viewCount: {
		type: Number,
		default: 0
	},
	tags: {
		type: Array,
		default: []
	}
},
	{
		timestamps: true
	}
)

export default mongoose.model("Post", PostSchema)
const mongoose = require("mongoose");

const db = async () => {
	try {
		await mongoose
			.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
			.then(() => {
				console.log("MongoDB connected");
			})
			.catch((error) => {
				console.log("MongoDB connection error:", error.message);
			});
	} catch (error) {
		console.log("MongoDB connection error:", error.message);
	}
};

module.exports = db;

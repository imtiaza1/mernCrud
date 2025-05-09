const userModel = require("../models/userModels");

const createUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const user = await userModel.create({
			name,
			email,
			password,
		});
		res.status(201).json({
			message: "User created successfully",
			success: true,
			user,
		});
	} catch (error) {
		console.log(error.message);
	}
};
const getUser = async (req, res) => {
	try {
		const users = await userModel.find();
		res.status(200).json({
			message: "Users fetched successfully",
			success: true,
			data: users,
		});
	} catch (error) {
		console.log();
		res.status(500).json({
			message: `Internal server error ${error.message}`,
			success: false,
		});
	}
};
const getUserById = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await userModel.findById(id);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}
		res.status(200).json({
			message: "User fetched successfully",
			success: true,
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			message: `Internal server error,${error.message}`,
			success: false,
		});
	}
};

const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, email, password } = req.body;
		const user = await userModel.findByIdAndUpdate(
			id,
			{
				name,
				email,
				password,
			},
			{ new: true }
		);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}
		res.status(200).json({
			message: "User updated successfully",
			success: true,
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			message: `Internal server error,${error.message}`,
			success: false,
		});
	}
};
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await userModel.findByIdAndDelete(id);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}
		res.status(200).json({
			message: "User deleted successfully",
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: `Internal server error,${error.message}`,
			success: false,
		});
	}
};

module.exports = {
	createUser,
	getUser,
	getUserById,
	updateUser,
	deleteUser,
};

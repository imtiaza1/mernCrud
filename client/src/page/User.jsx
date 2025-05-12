import { PencilAltIcon, TrashIcon, EyeIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import Message from "../utils";
import Spinner from "../Spinner";
import DetailsDialog from "../DetailsDialog";
import EditUserDialog from "../EditUserDialog";
const UserPage = () => {
	// for Spinner
	const [loading, setLoading] = useState(true);
	// Delete users
	const DeleteUser = async (e) => {
		const userId = e;
		try {
			const url = `http://localhost:5000/api/users/delete/${userId}`;
			const response = await fetch(url, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			if (data.success) {
				Message.handleSuccess(data.message);
				getAllUser();
			}
		} catch (error) {
			console.log("Error while deleting user", error.message);
		}
	};
	// Fetching all users
	const [getUser, setGetUser] = useState([]);
	const getAllUser = async () => {
		try {
			const url = "http://localhost:5000/api/users/getallusers";
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
			const userData = data.data;
			setGetUser(userData);
			setLoading(false);
		} catch (error) {
			console.log("error while fetching data", error.message);
		} finally {
			setLoading(false);
		}
	};
	// handle form data and send it to database
	const [formUser, setFormUser] = useState({
		name: "",
		email: "",
		password: "",
	});
	const formSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const url = "http://localhost:5000/api/users/create";
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formUser),
			});
			const data = await res.json();
			const { success, message } = data;
			if (success) {
				Message.handleSuccess(message);
				getAllUser();
			}
			if (!success) {
				Message.handleError(message);
			}
		} catch (error) {
			console.log("Error while creating user", error.message);
		}
	};
	const data = (e) => {
		const { name, value } = e.target;
		const newUser = { ...formUser, [name]: value };
		setFormUser(newUser);
	};
	// handle user details
	const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
	const [userDetails, setUserDetails] = useState(null);
	const handleClickDetails = (user) => {
		setUserDetails(user);
		setDetailsDialogOpen(true);
	};
	const handleDetailsDialogClose = () => {
		setDetailsDialogOpen(false);
	};
	// handle edit user and Edit dailog
	const [editDialogOpen, setDialogOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);
	const handleEditClick = (user) => {
		setSelectedUser(user);
		setDialogOpen(true);
	};
	//handle EditdialogClose
	const handleEditDialogClose = () => {
		setDialogOpen(false);
	};
	//handle update user
	const handleUserUpdate = async (updatedData) => {
		// Make your API call here
		try {
			const url = `http://localhost:5000/api/users/update/${updatedData._id}`;
			const { email, name, password } = updatedData;
			const res = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					name,
					password,
				}),
			});
			const data = await res.json();
			const { success, message } = data;
			if (success) {
				Message.handleSuccess(message);
				getAllUser();
			}
			if (!success) {
				Message.handleError(message);
			}
		} catch (error) {
			console.log("Error while updating user", error.message);
		}
	};
	useEffect(() => {
		getAllUser();
	}, []);
	return (
		<div className="flex min-h-screen bg-zinc-800 text-white">
			{/* Form in the Corner */}
			<div className="w-1/3 p-8 bg-zinc-900 rounded-2xl shadow-xl">
				<h2 className="text-2xl font-bold text-center mb-6">Create User</h2>
				<form className="space-y-4" onSubmit={formSubmitHandler}>
					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-1">
							Name
						</label>
						<input
							type="text"
							name="name"
							onChange={data}
							value={formUser.name}
							className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-600"
							placeholder="Enter your name"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-1">
							Email
						</label>
						<input
							type="email"
							name="email"
							onChange={data}
							value={formUser.email}
							className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-400"
							placeholder="Enter your email"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-zinc-300 mb-1">
							Password
						</label>
						<input
							type="password"
							name="password"
							onChange={data}
							value={formUser.password}
							className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-600 rounded-xl focus:outline-none focus:ring-1 focus:ring-green-400"
							placeholder="Enter your password"
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
					>
						Create User
					</button>
				</form>
			</div>

			{/* Right Side: Data List */}
			<div className="w-2/3 p-8 bg-zinc-900 rounded-2xl shadow-xl ml-6">
				<h2 className="text-2xl font-bold text-center mb-6">User List</h2>

				{loading ? (
					<Spinner />
				) : (
					<div className="space-y-4">
						{/* Example User */}
						{getUser.map((user) => {
							return (
								<div
									key={user._id}
									className="flex justify-between items-center bg-zinc-800 p-4 rounded-xl"
								>
									<div className="text-white">
										<h3 className="text-lg font-semibold">{user.name}</h3>
										<p className="text-sm text-zinc-400">{user.email}</p>
									</div>
									<div className="flex space-x-4 text-blue-500">
										<button
											onClick={() => handleClickDetails(user)}
											className="hover:text-blue-300 flex items-center space-x-1"
										>
											<EyeIcon className="w-5 h-5" />
											<span>Details</span>
										</button>
										<button
											onClick={() => handleEditClick(user)}
											className="hover:text-blue-300 flex items-center space-x-1 text-green-500"
										>
											<PencilAltIcon className="w-5 h-5" />
											<span>Edit</span>
										</button>
										<EditUserDialog />
										<button
											onClick={() => DeleteUser(user._id)}
											className="hover:text-blue-300 flex items-center space-x-1 text-red-500"
										>
											<TrashIcon className="w-5 h-5" />
											<span>Delete</span>
										</button>
									</div>
									<EditUserDialog
										open={editDialogOpen}
										onClose={handleEditDialogClose}
										userData={selectedUser}
										onSubmit={handleUserUpdate}
									/>
									<DetailsDialog
										DetailsOpen={detailsDialogOpen}
										DetailsClose={handleDetailsDialogClose}
										DetailsUser={userDetails}
									/>
								</div>
							);
						})}
						{getUser.length === 0 && (
							<div className="text-center text-zinc-400">
								<p>No users found.</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserPage;

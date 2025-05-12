import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditUserDialog({ open, onClose, userData, onSubmit }) {
	const [formData, setFormData] = useState({
		name: userData?.name || "",
		email: userData?.email || "",
		password: userData?.password || "",
	});

	useEffect(() => {
		setFormData({
			name: userData?.name || "",
			email: userData?.email || "",
			password: userData?.password || "",
		});
	}, [userData]);

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ ...userData, ...formData });
		onClose(); // Close dialog
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<div className="bg-zinc-900 text-white rounded-lg p-4">
					<DialogTitle className="text-white">Edit User</DialogTitle>
					<DialogContent>
						<div className="flex flex-col gap-4 mt-2">
							<input
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Name"
								className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<input
								name="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="Email"
								className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<input
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Password"
								className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</DialogContent>
					<DialogActions className="mt-4">
						<Button onClick={onClose} className="text-white bg-blue-600">
							Cancel
						</Button>
						<Button type="submit" className="text-white">
							Save
						</Button>
					</DialogActions>
				</div>
			</form>
		</Dialog>
	);
}

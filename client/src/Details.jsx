import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";

const DetailsDialog = ({ open, onClose, user }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<div className="bg-zinc-800 text-white p-2 rounded-md">
				<form>
					<DialogTitle>User Details</DialogTitle>
					<DialogContent className="flex flex-col gap-4 mt-2">
						<input
							value={user?.name || ""}
							readOnly
							className="border p-2 rounded bg-zinc-700 text-white"
							placeholder="Name"
						/>
						<input
							value={user?.email || ""}
							readOnly
							className="border p-2 rounded bg-zinc-700 text-white"
							placeholder="Email"
						/>
						<input
							type="password"
							value={user?.password || ""}
							readOnly
							className="border p-2 rounded bg-zinc-700 text-white"
							placeholder="Password"
						/>
						<input
							value={user?._id || ""}
							readOnly
							className="border p-2 rounded bg-zinc-700 text-white"
							placeholder="User ID"
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={onClose} className="text-white">
							Close
						</Button>
					</DialogActions>
				</form>
			</div>
		</Dialog>
	);
};

export default DetailsDialog;

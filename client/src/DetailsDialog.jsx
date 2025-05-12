import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";

const DetailsDialog = ({ DetailsOpen, DetailsClose, DetailsUser }) => {
	return (
		<Dialog open={DetailsOpen} onClose={DetailsClose}>
			<div className="bg-zinc-900 text-white p-4 rounded">
				<DialogTitle>User Details</DialogTitle>
				<DialogContent>
					<div className="space-y-2 mt-2">
						<div>
							<p className="text-sm text-zinc-400">Name</p>
							<p className="text-lg font-medium">
								{DetailsUser?.name || "not found"}
							</p>
						</div>
						<div>
							<p className="text-sm text-zinc-400">Email</p>
							<p className="text-lg font-medium">
								{DetailsUser?.email || "Not Found"}
							</p>
						</div>
						<div>
							<p className="text-sm text-zinc-400">Password</p>
							<p className="text-lg font-medium">
								{DetailsUser?.password || "not found"}
							</p>
						</div>
						<div>
							<p className="text-sm text-zinc-400">User ID</p>
							<p className="text-lg font-medium">
								{DetailsUser?._id || "not found"}
							</p>
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={DetailsClose} className="text-white">
						Close
					</Button>
				</DialogActions>
			</div>
		</Dialog>
	);
};

export default DetailsDialog;

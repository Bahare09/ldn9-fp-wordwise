import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./DeleteButton.css";

const DeleteButton = ({ itemId, onDelete }) => {
	const { getAccessTokenSilently } = useAuth0();

	const handleDelete = async () => {
		try {
			const token = await getAccessTokenSilently();
			const response = await fetch(`/api/history/${itemId}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				console.log(response);
				onDelete(itemId);
			} else {
				throw new Error("Failed to delete history item");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<button className="delete-button" onClick={handleDelete}>
			Delete
		</button>
	);
};

export default DeleteButton;

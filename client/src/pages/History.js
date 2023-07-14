import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import "./History.css";
import DeleteButton from "../components/DeleteButton";
import Header from "../components/Header";
import Footer from "../components/Footer";

const History = () => {
	const { getAccessTokenSilently, user } = useAuth0();
	const [accessToken, setAccessToken] = useState("");
	const [historyData, setHistoryData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHistoryData = async () => {
			const token = await getAccessTokenSilently();
			setAccessToken(token);
			setLoading(false);

			// Make the GET request to retrieve user's history data
			const response = await fetch(`/api/history/${user.email}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setHistoryData(data);
			} else {
				throw new Error("Failed to retrieve history data");
			}
		};

		fetchHistoryData();
	}, [getAccessTokenSilently, user.email]);

	const handleDeleteItem = (deletedItemId) => {
		// Remove the deleted item from the historyData state
		setHistoryData((prevData) =>
			prevData.filter((item) => item.id !== deletedItemId)
		);
	};

	return (
		<div className="history-page-wrapper">
		<div className="h"></div>
			<Header />
			<main className="history-main-section">
				<h1 className="history-title">Your Saved Corrections</h1>
				<ul className="history-list">
					{loading ? (
						<li>Loading...</li>
					) : (
						historyData.map((item) => (
							<li key={item.id} className="history-item">
								<div className="item-box">
									<div className="input-output-alternative-history">
										<div className="item-field">
											<span className="item-label">Input:</span>
											<span>{item.input}</span>
										</div>
										<div className="item-field">
											<span className="item-label">Output:</span>
											<span>{item.output}</span>
										</div>
										<div className="item-field">
											<span className="item-label">Alternative:</span>
											<span>{item.alternative}</span>
										</div>
									</div>
									<div className="timestamp-delete-container">
										<div className="time-stamp-container">
											<span>{item.stamp}</span>
										</div>
										<div className="delete-button-container">
											<DeleteButton
												itemId={item.id}
												onDelete={handleDeleteItem}
											/>
										</div>
									</div>
								</div>
							</li>
						))
					)}
				</ul>
			</main>
			<Footer />
		</div>
	);
};

export default History;

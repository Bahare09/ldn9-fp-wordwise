import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

const History = () => {
	const { getAccessTokenSilently, user } = useAuth0();
	const [accessToken, setAccessToken] = useState("");
	const [historyData, setHistoryData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchHistoryData = async () => {
			const token = await getAccessTokenSilently();
			setAccessToken(token);
			console.log(token);
			setLoading(false);

			// Make the GET request to retrieve user's history data
			const response = await fetch(`/api/history?email=${user.email}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setHistoryData(data);
				//
			} else {
				throw new Error("Failed to retrieve history data");
			}
		};

		fetchHistoryData();
	}, [getAccessTokenSilently, user.email]);

	return (
		<div>
			<h1>History Page</h1>

			<ul>
				{loading ? (
					<li>Loading...</li>
				) : (
					historyData.map((item) => (
						<li key={item.id}>
							<div>Input: {item.input}</div>
							<div>Output: {item.output}</div>
							<div>Alternative: {item.alternative}</div>
							<div>Email: {item.email}</div>
							<div>Timestamp: {item.stamp}</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default History;

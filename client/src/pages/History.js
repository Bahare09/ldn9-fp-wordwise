import React from "react";
//import "./History.css";

const History = () => {
	// Replace with your history data or API calls
	const historyData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

	return (
		<div className="history-page">
			<div className="history-container">
				{historyData.map((item) => (
					<div key={item.id}>
						<p>message</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default History;

import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
const Profile = () => {
	const { user, isAuthenticated } = useAuth0();
	return (
		isAuthenticated && (
			<article className="app">
				{user?.picture && <img src={user.picture} alt={user?.name} />}
				<h2>{user?.name}</h2>
				<ul>
					{Object.keys(user).map((objkey, index) => (
						<li key={index}>
							{objkey}: {user[objkey]}
						</li>
					))}
				</ul>
			</article>
		)
	);
};
export default Profile;
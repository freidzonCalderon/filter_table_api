import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const SearchUsers = () => {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");

	const URL = "https://jsonplaceholder.typicode.com/users";

	const getData = async () => {
		try {
			const res = await axios.get(URL);
			setUsers(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	let response = [];
	if (!search) {
		response = users;
	} else {
		response = users.filter((user) =>
			user.name.toLowerCase().includes(search.toLowerCase())
		);
	}

	return (
		<div>
			<div>
				<div className="container mt-5">
					<h1 className="text-center mb-3">Filter Data Application</h1>
					<input
						type="text"
						className="form-control text-center"
						placeholder="Search by Name..."
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						value={search}
					/>
				</div>

				<div className="container mt-5">
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Name</th>
								<th scope="col">Username</th>
								<th scope="col">Email</th>
							</tr>
						</thead>
						<tbody>
							{response.map((user) => {
								return (
									<tr key={user.id}>
										<th scope="row">{user.id} </th>
										<td>{user.name}</td>
										<td>{user.username}</td>
										<td>@{user.email}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default SearchUsers;

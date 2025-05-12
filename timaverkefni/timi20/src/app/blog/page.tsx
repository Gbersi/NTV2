"use client";

import { fakeGetAllUsers, type User } from "@/api/api";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const Blog = () => {
	const [users, setUsers] = useState<User[] | null>(null);

	const getUsers = useCallback(async () => {
		const response = await fakeGetAllUsers();
		setUsers(response);
	}, []);

	useEffect(() => {
		getUsers();
	}, [getUsers]);

	if (!users) {
		return <p>Loading...</p>;
	}

	return (
		<div className="p-20">
			<p>Welcome to my blog page</p>
			{/* <Link className="border border-red-500" href={"/blog/asdf"}>
				Go to missing blog
			</Link>
			<Link className="border border-red-500" href={"/blog/1"}>
				Go to existing
			</Link> */}
			{users.map((user) => (
				<div key={user.id} className="m-16 border border-red-500">
					<p>{user.name}</p>
					<p>User bio: {user.bio}</p>
					<p>Location: {user.location}</p>
					<p>id: {user.id}</p>
					<Link href={`/blog/${user.id}`} className="border border-blue-600">
						<p>Go to page for this user!</p>
					</Link>
				</div>
			))}
		</div>
	);
};

export default Blog;

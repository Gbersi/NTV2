"use client";

import Link from "next/link";

const Home = () => {
	return (
		<div className="p-20">
			<p>Welcome to the Home page</p>
			<Link className="border border-red-500" href={"/blog"}>
				Go to blog
			</Link>
		</div>
	);
};

export default Home;

"use client";

import { fakeGetUserFunction, type User } from "@/api/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {
	params: Promise<{ slug: string }>;
};

const BlogWithInfo = ({ params }: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>(null);
	const queryParams = useSearchParams();
	const ageParams = queryParams.get("age");
	const time = queryParams.get("time");

	const getSlug = useCallback(async () => {
		const { slug } = await params;
		const response = await fakeGetUserFunction(Number(slug));
		if (typeof response === "string") {
			setError(response);
		} else {
			setUser(response);
		}
	}, [params]);

	useEffect(() => {
		getSlug();
	}, [getSlug]);

	if (error) {
		return <p>{error}</p>;
	}

	if (user === null) {
		return <p>Loading...</p>;
	}

	return (
		<div className="p-20">
			<Link href={"/blog"}>Go back</Link>
			<p>{user.name}</p>
			{ageParams && <p>age params! {ageParams}</p>}
			{time && <p>time params! {time}</p>}
		</div>
	);
};

export default BlogWithInfo;

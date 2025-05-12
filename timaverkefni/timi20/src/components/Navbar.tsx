"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
	const pathname = usePathname();
	console.log({ pathname });

	const isBlog = pathname.includes("blog");

	return (
		<nav>
			<ol className="flex justify-around border border-red-500">
				<li>
					<Link
						className="border border-cyan-700"
						href="/"
						style={pathname === "/" ? { backgroundColor: "red" } : {}}
					>
						Home
					</Link>
				</li>
				<li>
					<Link
						className="border border-cyan-700 "
						style={pathname.includes("/blog") ? { backgroundColor: "red" } : {}}
						href="/blog"
					>
						Blog
					</Link>
				</li>
			</ol>
		</nav>
	);
};

export default NavBar;

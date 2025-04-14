import { useState } from "react";

export default function Scoreboard() {
	const [isPlayerA, setIsPlayerA] = useState(true);
	return (
		<div className="bg-white text-black">
			{isPlayerA ? (
				<Counter person="Taylor" key="taylor" />
			) : (
				<Counter person="Sarah" key="sarah" />
			)}
			<button
				className="border rounded m-4"
				type="button"
				onClick={() => {
					setIsPlayerA(!isPlayerA);
				}}
			>
				Next player!
			</button>
		</div>
	);
}

function Counter({ person }: { person: string }) {
	const [score, setScore] = useState(0);
	const [hover, setHover] = useState(false);

	let className = "counter";
	if (hover) {
		className += " hover";
	}

	return (
		<div
			className={className}
			onPointerEnter={() => setHover(true)}
			onPointerLeave={() => setHover(false)}
		>
			<h1>
				{person}&apos;s score: {score}
			</h1>
			<button
				className="border rounded m-4"
				type="button"
				onClick={() => setScore(score + 1)}
			>
				Add one
			</button>
		</div>
	);
}

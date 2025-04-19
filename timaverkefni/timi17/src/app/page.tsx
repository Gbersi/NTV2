"use client";

import { type Ref, useImperativeHandle, useRef, useState } from "react";
import MagicBox from "./MagicBox";

type CounterMethods = {
	incrementCount: () => void;
	decrementCount: () => void;
};

type CounterProps = {
	message?: string;
	ref: Ref<CounterMethods>;
};

const Counter = ({ ref }: CounterProps) => {
	const [state, setState] = useState(0);

	useImperativeHandle(
		ref,
		() => ({
			incrementCount: () => {
				setState((s) => s + 1);
			},
			decrementCount: () => {
				setState((s) => s - 1);
			},
		}),
		[],
	);

	return (
		<div className="border rounded">
			<p>Counter component, count state:</p>
			<p>{state}</p>
		</div>
	);
};

const Home = () => {
	const [state, setState] = useState("");
	const inputValueRef = useRef("");
	const [count, setCount] = useState(0);

	const inputRef = useRef<HTMLInputElement>(null);
	const counterRef = useRef<CounterMethods>(null);

	const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

	return (
		<div className="p-20">
			{/* <p>home</p>
			<input
				ref={inputRef}
				className="border rounded"
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						inputRef.current?.blur();
					}
				}}
			/>
			<button
				type="button"
				onClick={() => {
					setState(inputValueRef.current);
				}}
			>
				<p>submit value</p>
			</button>
			<button
				type="button"
				onClick={() => {
					clearInterval(intervalRef.current);

					intervalRef.current = setInterval(() => {
						setCount((s) => s + 1);
					}, 1000);
				}}
				className="border"
			>
				<p>start counting</p>
			</button>
			<button
				type="button"
				onClick={() => {
					inputRef.current?.focus();
				}}
			>
				Focus input!
			</button>
			<div>
				<p>Input value: {state}</p>
			</div>
			<div>
				<p>{count} seconds have passed since you pressed the button</p>
			</div>
			<div className="border rounded m-4">
				<Counter ref={counterRef} />
				<button
					type="button"
					onClick={() => {
						counterRef.current?.incrementCount();
					}}
				>
					Increment counter
				</button>
				<button
					type="button"
					onClick={() => {
						counterRef.current?.decrementCount();
					}}
				>
					Decrement counter
				</button>
			</div> */}
			<MagicBox />
		</div>
	);
};

export default Home;

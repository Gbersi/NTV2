"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const sleep = async (durationInMs: number) => {
	const coinFlipPromise = new Promise((resolve) => {
		setTimeout(() => {
			resolve("heads");
		}, durationInMs);
	});
	await coinFlipPromise;
	console.log("done sleeping");
};

const flipACoin = async () => {
	const coinFlipPromise = new Promise((resolve, reject) => {
		setTimeout(() => {
			// math.random returns a random number between 0 and 1
			const wasHeads = Math.random() > 0.5;
			if (wasHeads) {
				resolve("heads");
			} else {
				reject("tails");
			}
		}, 3000);
	});

	try {
		const coinFlipResult = await coinFlipPromise;
		console.log(coinFlipResult);
	} catch (e) {
		console.log("e", e);
	}
};
const chainPromises = async () => {
	console.log("started");
	await sleep(3000)
		.then(async () => {
			console.log(1);
		})
		.catch((error) => {
			console.log("error 1", error);
		})
		.then(async () => {
			console.log(2);
		})
		.catch((error) => {
			console.log("error 2", error);
		})
		.then(async () => {
			console.log(3);
			await sleep(3000);
		})
		.catch((error) => {
			console.log("error 3", error);
		});
	// .finally(async () => {
	// 	console.log("finally");
	// 	await getData();
	// });
};

const allPromises = async () => {
	const promise1 = await sleep(3000);
	const promise2 = await sleep(300);
	const promise3 = await sleep(100);
	// const promise4 = await getData();
	const foo = Promise.all([promise1, promise2, promise3]); //, promise4]);
};

const timeoutPromise = async () => {
	// Promise.race([getData(), sleep(3000)]); // could implement a different function instead of sleep that would display a message
};

type Drink = {
	idDrink: string;
	strDrink: string;
};

const isNodeError = (data: unknown): data is NodeJS.ErrnoException => {
	if (data && typeof data === "object" && "message" in data && "name" in data) {
		return true;
	}
	return false;
};

const isDrinkResponse = (data: unknown): data is { drinks: Drink[] } => {
	if (
		data &&
		typeof data === "object" &&
		"drinks" in data &&
		Array.isArray(data.drinks) &&
		data.drinks.length > 0 &&
		typeof data.drinks[0] === "object" &&
		"idDrink" in data.drinks[0] &&
		"strDrink" in data.drinks[0]
	) {
		return true;
	}
	return false;
};

const ChildComponent = () => {
	useEffect(() => {
		console.log("mounted child!");
		return () => {
			console.log("unmounting child");
		};
	}, []);

	return <p>Child mounted!</p>;
};

type Cat = {
	id: string;
	url: string;
	width: number;
	height: number;
};

const Home = () => {
	const [validationError, setValidationError] = useState<string>("");
	const inputValuRef = useRef("");
	const [drink, setDrink] = useState("");
	const [count, setCount] = useState(0);
	const [showChild, setShowChild] = useState(false);
	const [catImages, setCatImages] = useState<Cat[]>([]);

	useEffect(() => {
		console.log("count changed to: ", count);
		return () => {
			console.log("cleaning up after count");
		};
	}, [count]);

	// Example of setInterval useEffect with cleanup
	useEffect(() => {
		const intervalId = setInterval(() => {
			// console.log(`Current blinking text: ${text}`);
			// setVisible((visible) => !visible);
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		console.log("count changed to: ", count);
		return () => {
			console.log("cleaning up after count");
		};
	}, [count]);

	useEffect(() => {
		const getData = async () => {
			try {
				const url =
					"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito";
				const response = await fetch(url);
				if (response.status !== 200) {
					throw new Error(`Response status: ${response.status}`);
				}

				const json: { drinks: Drink[] } = await response.json();
				console.log(json);
				return json;
			} catch (error: any) {
				const nodeError: NodeJS.ErrnoException = error;
				return nodeError;
			}
		};

		const getDrink = async () => {
			const drinkResponse = await getData();
			console.log(1, drinkResponse);
			if (isDrinkResponse(drinkResponse)) {
				console.log(2);
				if (drinkResponse.drinks.length > 0) {
					console.log(3);
					await sleep(1000);
					setDrink(drinkResponse.drinks[0].strDrink);
				}
			}
		};

		getDrink();
	}, []);

	useEffect(() => {
		const getCatData = async () => {
			try {
				const url = "https://api.thecatapi.com/v1/images/search?limit=10";
				const response = await fetch(url);
				if (response.status !== 200) {
					// Could add error to state and display on site for user to know
					throw new Error(`Response status: ${response.status}`);
				}

				const json: Cat[] = await response.json();
				return json;
			} catch (error: any) {
				const nodeError: NodeJS.ErrnoException = error;
				return nodeError;
			}
		};

		const getCatImage = async () => {
			const catResponse = await getCatData();
			if (isNodeError(catResponse)) {
				return;
			}
			setCatImages(catResponse);
		};

		getCatImage();
	}, []);

	useEffect(() => {
		console.log(catImages);
	}, [catImages]);

	const submitInfo = async () => {
		try {
			if (inputValuRef.current.length < 10) {
				throw new Error("Input length too short");
			}
		} catch (error) {
			setValidationError(error.message);
		}
	};

	if (!drink) {
		return (
			<div className="p-20">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className="p-20">
			{/* <div className="p-20">
				<p>Hello world</p>
				<input
					onChange={(e) => {
						setValidationError("");
						inputValuRef.current = e.target.value;
					}}
				/>
				<button
					type="button"
					onClick={() => {
						submitInfo();
					}}
				>
					Validate input!
				</button>
				{validationError && <p className="text-red-500">{validationError}</p>}
			</div>
			<div className="p-20">
				<button
					type="button"
					onClick={() => {
						logData();
					}}
				>
					Get data!
				</button>
			</div>
			<div className="p-20">
				<button type="button" onClick={flipACoin}>
					Flip a coin!
				</button>
			</div>
			<div className="p-20">
				<button type="button" onClick={chainPromises}>
					Chain promises!
				</button>
			</div> */}
			{/* <div className="p-20">
				<button type="button" onClick={getDrink}>
					Display drink!
				</button>
				<p>{drink}</p>
			</div> */}
			<p>{drink}</p>
			<button
				type="button"
				onClick={() => {
					setCount((c) => c + 1);
				}}
			>
				Increment
			</button>
			<p>{count}</p>
			<button
				type="button"
				onClick={() => {
					setShowChild((s) => !s);
				}}
			>
				Show child!
			</button>
			{showChild && <ChildComponent />}
			{catImages.map((im, index) => (
				<div key={im.id}>
					<img src={im.url} alt={`cat ${index}`} width={300} height={300} />
				</div>
			))}
		</div>
	);
};

export default Home;

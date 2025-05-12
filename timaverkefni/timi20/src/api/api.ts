import type { Expense } from "@/types/types";

type RequestMethod = "POST" | "GET" | "DELETE";

type ServerResponse<T> =
	| {
			success: true;
			response: T;
	  }
	| {
			success: false;
			error: string;
	  };

type RequestParams<R extends RequestMethod> = R extends "GET"
	? [url: string, method: R, body?: undefined]
	: [url: string, method: R, body?: Record<string, unknown>];

const requestResponse = async <T, R extends RequestMethod = RequestMethod>(
	...args: RequestParams<R>
) => {
	const [url, method, body] = args;

	const response = await fetch(`http://localhost:3001${url}`, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: body ? JSON.stringify(body) : undefined,
	});

	if (response.status !== 200) {
		console.log("here");
		throw new Error(`Response status: ${response.status}`);
	}

	const json: ServerResponse<T> = await response.json();

	if (!json.success) {
		console.log("there");
		throw new Error(json.error);
	}

	return json;
};

const getExpenses = async () => {
	const response = await requestResponse<Expense[]>("/api/expenses", "GET");
	console.log(response.response);
	return response.response;
};

const createExpense = async ({
	name,
	cost,
}: Pick<Expense, "cost" | "name">) => {
	const response = await requestResponse<Expense>(
		"/api/create-expense",
		"POST",
		{
			name,
			cost,
		},
	);
	return response.response;
};

const getExpenseById = async (id: number) => {
	const response = await requestResponse<Expense>(`/api/expense/${id}`, "GET");
	return response.response;
};

const deleteExpenseById = async (id: number) => {
	const response = await requestResponse<Expense[]>(
		`/api/expense/${id}`,
		"DELETE",
	);
	return response.response;
};

const api = {
	getExpenses,
	createExpense,
	getExpenseById,
	deleteExpenseById,
};

const users = [
	{
		id: 0,
		name: "Gunnsteinn",
		role: "Lead Developer",
		bio: "Focused on scalable architecture and clean code. Leads the backend systems with a passion for performance.",
		location: "Reykjavík, Iceland",
		skills: ["Node.js", "TypeScript", "PostgreSQL"],
		avatar: "https://example.com/avatars/gunnsteinn.jpg",
	},
	{
		id: 1,
		name: "Darri",
		role: "UX Designer",
		bio: "Designs intuitive user experiences with a data-informed approach. Loves prototyping and user testing.",
		location: "Akureyri, Iceland",
		skills: ["Figma", "User Research", "Accessibility"],
		avatar: "https://example.com/avatars/darri.jpg",
	},
	{
		id: 2,
		name: "Breki",
		role: "Frontend Developer",
		bio: "Writes clean, responsive UI with React and Tailwind. Obsessed with performance and pixel-perfect design.",
		location: "Selfoss, Iceland",
		skills: ["React", "Tailwind CSS", "JavaScript"],
		avatar: "https://example.com/avatars/breki.jpg",
	},
	{
		id: 3,
		name: "Númi",
		role: "Full-stack Developer",
		bio: "Bridges the gap between frontend and backend. Enjoys tackling complex problems with simple solutions.",
		location: "Kópavogur, Iceland",
		skills: ["Vue.js", "Express", "MongoDB"],
		avatar: "https://example.com/avatars/numi.jpg",
	},
];

export type User = (typeof users)[number];

const sleep = async (durationInMs: number) => {
	const coinFlipPromise = new Promise((resolve) => {
		setTimeout(() => {
			resolve("heads");
		}, durationInMs);
	});
	await coinFlipPromise;
	console.log("done sleeping");
};

export const fakeGetAllUsers = async (): Promise<User[]> => {
	await sleep(1000);
	return users;
};

export const fakeGetUserFunction = async (
	id: number,
): Promise<User | string> => {
	await sleep(1000);
	const user = users.find((user) => user.id === id);
	if (user) {
		return user;
	}
	return "No user";
};

export default api;

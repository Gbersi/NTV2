import express, { type Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";  

let nextId = 4;

type Expense = {
	id: number;
	name: string;
	cost: number;
};

let expenses: Array<Expense> = [
	{ id: 1, name: "Beer", cost: 1500 },
	{ id: 2, name: "Candy", cost: 355 },
	{ id: 3, name: "Shrek's swamp", cost: 20000000 },
];

dotenv.config();

const api: Express = express();
api.use(cors());
api.use(express.json());
api.use(bodyParser.urlencoded({ extended: false }));


api.use(express.static(path.join(__dirname, 'public')));

api.get("/api/expenses", (_, res) => {
	console.log("Getting expenses:", expenses);
	return res.json({ success: true, response: expenses });
});

api.post("/api/create-expense", (req, res) => {
	console.log(req.body);
	const name = req.body.name;
	const cost = req.body.cost;

	if (!name || !cost) {
		res.json({
			success: false,
			error: "Must supply name and cost for the expense",
		});
		return;
	}

	const expense = { id: nextId, name, cost };
	expenses.push(expense);
	nextId += 1;

	return res.json({
		success: true,
		response: expense,
	});
});

api.get("/ping", (_, res) => {
	res.json({
		success: true,
		response: "pong",
	});
});

api.get("/api/expense/:id", (req, res) => {
	const expenseId = Number.parseInt(req.params.id, 10);
	const expense = expenses.find((e) => e.id === expenseId);
	if (expense) {
		return res.json({
			success: true,
			response: expense,
		});
	}

	res.json({
		success: false,
		error: `Could not find expense with id=${expenseId}`,
	});
});

api.delete("/api/expense/:id", (req, res) => {
	const expenseId = Number.parseInt(req.params.id, 10);
	const expense = expenses.find((e) => e.id === expenseId);
	if (expense) {
		expenses = expenses.filter((e) => e.id !== expenseId);
		res.json({
			success: true,
			response: expenses,
		});
	} else {
		res.json({
			success: false,
			error: `Could not find expense with id=${expenseId}`,
		});
	}
});

api.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3001;

api.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

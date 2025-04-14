"use client";

import { useState } from "react";

const DATA = [
	{
		id: 1,
		name: "Bluetooth Headphones",
		price: 59.99,
		quantityRemaining: 35,
		isVisible: true,
	},
	{
		id: 2,
		name: "Stainless Steel Water Bottle",
		price: 19.95,
		quantityRemaining: 82,
		isVisible: true,
	},
	{
		id: 3,
		name: "Gaming Mouse Pad",
		price: 12.49,
		quantityRemaining: 50,
		isVisible: true,
	},
	{
		id: 4,
		name: "USB-C Charging Cable",
		price: 8.99,
		quantityRemaining: 150,
		isVisible: true,
	},
	{
		id: 5,
		name: "Smart LED Light Bulb",
		price: 14.99,
		quantityRemaining: 64,
		isVisible: true,
	},
	{
		id: 6,
		name: "Laptop Stand",
		price: 34.95,
		quantityRemaining: 27,
		isVisible: true,
	},
	{
		id: 7,
		name: "Wireless Keyboard",
		price: 29.99,
		quantityRemaining: 40,
		isVisible: true,
	},
	{
		id: 8,
		name: "Noise Cancelling Earplugs",
		price: 15.0,
		quantityRemaining: 75,
		isVisible: true,
	},
	{
		id: 9,
		name: "Portable Power Bank",
		price: 39.95,
		quantityRemaining: 18,
		isVisible: true,
	},
	{
		id: 10,
		name: "Mini Desk Fan",
		price: 22.5,
		quantityRemaining: 33,
		isVisible: true,
	},
];

type Items = typeof DATA;
type Item = Items[number] & {
	index: number;
	isVisible: boolean;
};

const ItemCard = ({
	name,
	price,
	quantityRemaining,
	index,
	isVisible,
}: Item) => {
	return (
		<div
			className={`border rounded border-white ${isVisible ? "fadein" : "fadeout"}`}
			style={{
				animationDelay: `${isVisible ? index * 600 : 0}ms`,
			}}
		>
			<p>Product: {name}</p>
			<p>Price: {price}$</p>
			<p>Available: {quantityRemaining}</p>
		</div>
	);
};

const Home = () => {
	const [products, setProducts] = useState(DATA);
	const [show, setShow] = useState(false);

	const removeFirstItem = () => {
		const productToRemove = products[0];
		productToRemove.isVisible = false;
		const newProducts = products.slice(1);
		setProducts([productToRemove, ...newProducts]);

		setTimeout(() => {
			setProducts(newProducts);
		}, 1000);
	};

	return (
		<div className="p-20">
			<button type="button" onClick={removeFirstItem}>
				Remove item
			</button>
			<button type="button" onClick={() => setShow((s) => !s)}>
				Show
			</button>
			{show && (
				<div className="p-20 gap-4 flex flex-col" key={products.length}>
					<h2>List with correct keys</h2>
					{products.map((product, index) => (
						<ItemCard {...product} key={product.id} index={index} />
					))}
				</div>
			)}
		</div>
	);
};

export default Home;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex">
			<div className="w-[20%] border border-red-500">
				<p>Sidebar</p>
			</div>
			<div className="w-[80%]">{children}</div>
		</div>
	);
}

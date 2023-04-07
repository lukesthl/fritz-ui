export const Breakpoints = () => (
	<>
		{process.env.VERCEL_ENV !== "production" && (
			<div className="fixed bottom-0 right-0 m-2 flex items-center rounded border border-gray-400 bg-gray-300 p-2 text-sm">
				Current breakpoint
				<span className="ml-1 sm:hidden md:hidden lg:hidden xl:hidden">default (&lt; 640px)</span>
				<span className="ml-1 hidden font-extrabold sm:inline md:hidden">sm</span>
				<span className="ml-1 hidden font-extrabold md:inline lg:hidden">md</span>
				<span className="ml-1 hidden font-extrabold lg:inline xl:hidden">lg</span>
				<span className="ml-1 hidden font-extrabold xl:inline">xl</span>
			</div>
		)}
	</>
);

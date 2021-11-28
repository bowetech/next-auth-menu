const Footer = () => {
	return (
		<footer className="px-4 sm:px-6 py-6 mt-24 text-center">
			<p className="text-sm text-gray-500"> © {new Date().getFullYear()} QuickNuggets Classroom. All rights reserved.</p>

			<p>
				<a href="https://quicknuggets.com/teaching" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-current">Made with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="inline-block w-4 h-4 -mt-1 text-red-600 animate-pulse"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg> by BoweTech.com</a>
			</p>
		</footer>
	)
}

export default Footer

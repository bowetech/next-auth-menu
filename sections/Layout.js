import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, pageMeta }) => {
	const router = useRouter();

	const meta = {
		title: 'QuickNuggets Classroom',
		keywords: 'QuickNuggets, Classroom',
		description: ' Start Learning Today for free!.',
		type: 'website',
		...pageMeta,
	}

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name="keywords" content={meta.keywords} />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name="description" content={meta.description} />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel="icon" href="/favicon.ico" />
				{/* Open Graph */}
				<meta property="og:url" content={`http://localhost:3000${router.asPath}`} />
				<meta property="og:title" content={meta.title} />
				<meta property="og:description" content={meta.description} />
				<meta property="og:site_name" content="QuickNuggets" />
				<meta property="og:type" content={meta.type} />
				{meta.date && (<meta property="article:published_time" content={meta.date} />)}
			</Head>

			<div className="min-h-screen flex flex-col">
				<Header />
				<main className="flex-grow container mx-auto px-4 sm:px-6">
					{children}
				</main>
				<Footer />
			</div>
		</>
	);
}

export default Layout

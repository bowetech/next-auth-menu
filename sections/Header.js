
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { useSession, signIn } from "next-auth/react"
import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { ChevronDownIcon } from '@heroicons/react/outline';
import useMediaQuery from '../hooks/use-media-query';

import FlyoutMenu from '../components/FlyoutMenu';
import Logo from '../components/Logo';
import MobileMenu from '../components/MobileMenu';

const Header = () => {
	const { systemTheme, theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const { data: session, status } = useSession();
	const [menuOpen, setMenuOpen] = useState(false);
	const containerRef = useRef();
	const isLargerScreen = useMediaQuery(['(min-width: 640px)'], [true], false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen]);

	const handleClickOutside = (event) => {
		if (menuOpen && containerRef.current && !containerRef.current.contains(event.target)) {
			setMenuOpen(false);
			console.log("Outside click detected")
		}
	}

	const renderThemeChanger = () => {
		if (!mounted) return null;

		const currentTheme = theme === 'system' ? systemTheme : theme;
		if (currentTheme === 'dark') {
			return (
				<SunIcon className="w-7 h-7 text-yellow-500"
					role="button"
					onClick={() => setTheme('light')}
				/>
			);
		} else {
			return (
				<MoonIcon className="w-7 h-7"
					role="button"
					onClick={() => setTheme('dark')}
				/>
			);
		}
	}

	return (
		<header className="border-b border-gray-100 dark:border-gray-700">
			<div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
				<Logo />

				<div className="flex items-center space-x-3 sm:space-x-2">
					{renderThemeChanger()}

					{
						// if (status === "loading") return // Do nothing while loading

						(!session) ? (
							<button
								type="button"
								onClick={() => signIn()}
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-4  focus:ring-blue-600 focus:ring-opacity-50 whitespace-nowrap">Sign in</button>
						) : (
							<div className="relative" id="drop_menu" ref={containerRef}>
								<button onClick={() => setMenuOpen(prev => !prev)} className="flex items-center space-x-1 sm:space-x-2">
									<img src={session.user.image} alt={session.user.name} className="rounded-full border-2 border-blue-600 w-8 h-8"
									/>
									<p className="flex items-center space-x-1">
										<span className="hidden sm:inline-block">
											Hello, {session.user.name?.split(' ')?.[0] ?? 'there'}
										</span>
										<ChevronDownIcon className="w-4 h-4 flex-shrink-0 mt-1" />
									</p>
								</button>
								<FlyoutMenu
									links={
										[{
											text: 'my page',
											href: '/api/auth/session',
											icon: MoonIcon,
										}
										]
									}

									show={menuOpen && isLargerScreen}
									onClose={() => setMenuOpen(false)}
									containerRef={containerRef}
								/>
							</div>
						)}
				</div>
			</div>
			<MobileMenu
				links={
					[{
						text: 'Mobile page',
						href: '/api/auth/session',
						icon: MoonIcon,
					}
					]
				}
				show={menuOpen && !isLargerScreen}
				onClose={() => setMenuOpen(false)}
			/>
		</header>
	);
}

export default Header;
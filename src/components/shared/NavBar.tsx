'use client';
import { useState } from 'react';
import Link from 'next/link';
import { User, Menu, X } from 'lucide-react';
import ThemeSwitch from '../ui/ThemeSwitch';
import Image from 'next/image';
import type { userTypes } from '../../types/userTypes';
import { authClient } from '@/lib/auth-client';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
    const { data: session } = authClient.useSession();
    const user: userTypes | undefined = session?.user;

    const navLinks = [
        { name: 'Menu', href: '/menu' },
        { name: 'Reservations', href: '/reservations' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleLogout = async () => {
        await authClient.signOut();
        setUserMenuOpen(false);
        window.location.href = '/';
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-neutral/20 bg-tertiary dark:bg-secondary dark:border-neutral/30 transition-colors duration-300">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <h1 className="text-3xl font-serif font-bold text-primary dark:text-primary">
                            Zestaro
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-secondary dark:text-tertiary hover:text-primary dark:hover:text-primary px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-primary transition-all duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 relative">
                        <div className='hidden md:block'>
                            <ThemeSwitch />
                        </div>

                        {
                            !session ?
                                <Link href={'/auth?login=true'} className='bg-secondary dark:bg-primary/70 hover:bg-primary rounded-2xl text-md p-1 px-3 flex justify-center items-center'>
                                    Login
                                </Link>
                                : <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="p-2 rounded-lg text-secondary dark:text-tertiary hover:bg-neutral/10 dark:hover:bg-neutral/20 transition-colors">
                                    <div className='flex justify-center items-center gap-2'>
                                        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                                            {
                                                user?.profileImage ? (
                                                    <Image
                                                        src={user?.profileImage}
                                                        alt="Profile Image"
                                                        width={500}
                                                        height={500}
                                                        loading='eager'
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <User className="w-10 h-10 text-white" />
                                                )
                                            }
                                        </div>
                                        <span className="hidden lg:block text-sm">
                                            {user?.name?.split(' ')[0] || 'User'}
                                        </span>
                                    </div>
                                </button>
                        }

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg text-secondary dark:text-tertiary hover:bg-neutral/10 dark:hover:bg-neutral/20 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>

                        {userMenuOpen && (
                            <div className="absolute -right-5 top-15 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                {/* User Info */}
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </p>
                                </div>

                                {/* Menu Items */}
                                <div className="py-1 ml-auto text-right">
                                    <Link
                                        href={`/dashboard/${user?.role || 'seeker'}`}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                        Dashboard
                                    </Link>
                                    <Link
                                        href={`/dashboard/${user?.role}/profile`}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setUserMenuOpen(false)}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Profile
                                    </Link>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-neutral/20 dark:border-neutral/30 bg-tertiary dark:bg-secondary">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-3 text-secondary dark:text-tertiary hover:text-primary dark:hover:text-primary hover:bg-neutral/10 dark:hover:bg-neutral/20 rounded-lg text-base font-medium transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="pt-4 mt-4 border-t border-neutral/20 dark:border-neutral/30 space-y-3 flex justify-between items-center">
                            <button onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-3 text-secondary dark:text-tertiary hover:bg-neutral/10 dark:hover:bg-neutral/20 rounded-lg transition-colors">
                                <div className=''>
                                    {
                                        !session ?
                                            <Link href={'/auth?login=true'} className='bg-secondary dark:bg-primary/70 hover:bg-primary rounded-2xl text-md p-1 px-3 flex justify-center items-center'>
                                                Login
                                            </Link>
                                            : user?.profileImage ? (
                                                <Image
                                                    src={user?.profileImage}
                                                    alt="Profile Image"
                                                    width={500}
                                                    height={500}
                                                    className="rounded-full w-8 h-8"
                                                />
                                            ) : (
                                                <User className="w-10 h-10 text-secondary dark:text-tertiary" />
                                            )
                                    }
                                </div>
                                <span className="font-medium">{user?.name}</span>
                            </button>
                            <ThemeSwitch />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
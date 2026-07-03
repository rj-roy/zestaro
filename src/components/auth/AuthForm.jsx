'use client';
import Link from 'next/link';

export default function AuthForm({ isLogin }) {
    return (
        <form className="space-y-4">
            {!isLogin && (
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-stone-700 mb-1.5">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition bg-white"
                    />
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                    Email Address
                </label>
                <div className="flex rounded-lg shadow-sm">
                    <input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition bg-white"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition bg-white"
                />
            </div>

            {isLogin && (
                <div className="flex items-center justify-between text-sm pt-1">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-stone-900 focus:ring-stone-900 border-stone-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-stone-700">
                            Remember me
                        </label>
                    </div>
                    <Link href="/forgot-password" className="font-medium text-stone-900 hover:underline">
                        Forgot password?
                    </Link>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors shadow-md mt-6"
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </button>
        </form>
    );
}
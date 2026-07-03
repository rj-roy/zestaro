'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function AuthForm({ isLogin }) {
    const {data:session} = authClient.useSession();
    console.log(session);
    const [formData, setFormData] = useState(
        isLogin
            ? { email: '', password: '' }
            : {
                name: '',
                email: '',
                password: '',
                role: 'customer',
                plan: '',
                profileImage: "https://res.cloudinary.com/dbkpia8ri/image/upload/v1781958996/images_rbgnle.png",
            }
    );

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/dashboard/profile';
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!isLogin && !formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        };

        setIsLoading(true);
        setErrors({});

        try {
            const { data, error } = await authClient.signUp.email({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Form Submitted:', data);
            router.push(redirectTo);
        } catch (error) {
            setErrors({ submit: 'Authentication failed. Please check your credentials.' });
        } finally {
            setIsLoading(false);
        }
    };

    const getInputClasses = (fieldName) => {
        const baseClasses = "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition bg-white text-stone-900 placeholder-stone-400";
        const errorClasses = errors[fieldName] ? "border-red-500 focus:ring-red-500" : "border-stone-300";
        return `${baseClasses} ${errorClasses}`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
                        Full Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className={getInputClasses('name')}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={getInputClasses('email')}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={getInputClasses('password')}
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {isLogin && (
                <div className="flex items-center justify-between text-sm pt-1">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
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

            {/* Global Submit Error */}
            {errors.submit && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                    <div className="flex">
                        <div className="shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-red-800">{errors.submit}</h3>
                        </div>
                    </div>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-stone-900 text-white py-3 rounded-lg font-medium hover:bg-stone-800 transition-colors shadow-md mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    isLogin ? 'Login' : 'Sign Up'
                )}
            </button>
        </form>
    );
}
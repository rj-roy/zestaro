'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
    searchParams?: Record<string, string>;
};

function getPageNumbers(current: number, total: number): (number | '...')[] {
    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    if (current > 3) {
        pages.push('...');
    }

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (current < total - 2) {
        pages.push('...');
    }

    pages.push(total);

    return pages;
}

function buildHref(
    basePath: string,
    page: number,
    searchParams?: Record<string, string>
) {
    const params = new URLSearchParams(searchParams);

    params.set('page', page.toString());

    return `${basePath}?${params.toString()}`;
}

export default function PagePagination({ currentPage, totalPages, basePath = '/menu', searchParams, }: PaginationProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [loadingPage, setLoadingPage] = useState<number | null>(null);

    if (totalPages <= 1) return null;

    const pages = getPageNumbers(currentPage, totalPages);

    const navigate = (page: number) => {
        if (page === currentPage || isPending) return;

        setLoadingPage(page);

        startTransition(() => {
            router.push(buildHref(basePath, page, searchParams));
        });
    };

    return (
        <nav
            className="flex items-center justify-center gap-1.5 sm:gap-2 mt-12"
            aria-label="Pagination"
        >
            <button
                onClick={() => navigate(currentPage - 1)}
                disabled={currentPage <= 1 || isPending}
                className="p-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
                <ChevronLeft size={20} />
            </button>

            {pages.map((page, index) =>
                page === '...' ? (
                    <span
                        key={index}
                        className="w-10 h-10 flex items-center justify-center"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        disabled={isPending}
                        onClick={() => navigate(page)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition ${currentPage === page
                                ? 'bg-primary text-white'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                            }`}
                    >
                        {loadingPage === page && isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            page
                        )}
                    </button>
                )
            )}

            <button
                onClick={() => navigate(currentPage + 1)}
                disabled={currentPage >= totalPages || isPending}
                className="p-2.5 rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
                <ChevronRight size={20} />
            </button>
        </nav>
    );
}
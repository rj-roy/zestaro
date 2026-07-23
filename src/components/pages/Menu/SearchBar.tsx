import { Search } from 'lucide-react';
import { SearchParams } from '@/types/MenuPage';

const getFirst = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) return value[0] ?? '';
    return value ?? '';
};

interface SearchBarProps {
  query: SearchParams;
}

export default async function SearchBar({ query }: SearchBarProps) {
    const category = getFirst(query.category);
    const dietaryTags = getFirst(query.dietaryTags);
    const search = getFirst(query.search);

    return (
        <form method="GET" className="relative w-full lg:w-80">
            {/* Preserve existing query params */}
            <input type="hidden" name="category" value={category} />
            <input
                type="hidden"
                name="dietaryTags"
                value={dietaryTags}
            />

            <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search for dishes name..."
                className="w-full px-6 py-3 rounded-full bg-white dark:bg-neutral/20 border border-neutral/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-secondary dark:text-tertiary placeholder-neutral"
            />

            <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
                aria-label="Search"
            >
                <Search className="w-5 h-5 text-primary/80 hover:text-primary cursor-pointer" />
            </button>
        </form>
    );
}

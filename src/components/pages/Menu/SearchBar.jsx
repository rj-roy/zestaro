import { Search } from 'lucide-react';

export default async function SearchBar({ query }) {
    const search = { ...query, search: query.search ?? '', };
    return (
        <form method="GET" className="relative w-full lg:w-80">
            {/* Preserve existing query params */}
            <input type="hidden" name="category" value={query.category ?? ""} />
            <input
                type="hidden"
                name="dietaryTags"
                value={query.dietaryTags ?? ""}
            />

            <input
                type="text"
                name="search"
                defaultValue={query.search ?? ""}
                placeholder="Search for dishes..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-neutral/20 border border-neutral/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-secondary dark:text-tertiary placeholder-neutral"
            />

            <button
                type="submit"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral hover:text-primary"
                aria-label="Search"
            >
                <Search className="w-5 h-5 text-primary/80 hover:text-primary cursor-pointer" />
            </button>
        </form>
    );
}
import Link from "next/link";
import { Leaf, WheatOff, Flame, type LucideIcon } from "lucide-react";
import { SearchParams } from "@/types/MenuPage";

interface FilterTag {
  id: string;
  label: string;
  icon: LucideIcon;
}

const filters: FilterTag[] = [
  { id: "vegetarian", label: "Vegetarian", icon: Leaf },
  { id: "sea-food", label: "Sea-Food", icon: Leaf },
  { id: "gluten-free", label: "Gluten-Free", icon: WheatOff },
  { id: "spicy", label: "Spicy", icon: Flame },
  { id: "gluten", label: "Gluten", icon: Flame },
  { id: "dairy", label: "Dairy", icon: Flame },
];

const getFirst = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) return value[0] ?? '';
    return value ?? '';
};

interface FilterTagsProps {
  query: SearchParams;
}

export default function FilterTags({ query }: FilterTagsProps) {
  const dietaryTagsStr = getFirst(query.dietaryTags);

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => {
        const dietaryTags = dietaryTagsStr ? dietaryTagsStr.split(",") : [];
        const isSelected = dietaryTags.includes(filter.id);

        const updatedTags = dietaryTags.includes(filter.id)
          ? dietaryTags.filter(tag => tag !== filter.id)
          : [...dietaryTags, filter.id];

        const params = new URLSearchParams();

        for (const [key, value] of Object.entries(query)) {
          const first = getFirst(value);
          if (first) params.set(key, first);
        }

        if (updatedTags.length) {
          params.set("dietaryTags", updatedTags.join(","));
        } else {
          params.delete("dietaryTags");
        }

        const Icon = filter.icon;

        return (
          <Link
            key={filter.id}
            href={`/menu?${params.toString()}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
              ? 'bg-primary text-tertiary shadow-md'
              : 'bg-white dark:bg-neutral/20 text-secondary dark:text-tertiary border border-neutral/20 hover:border-primary'
              }`}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </Link>
        );
      })}
    </div>
  );
}

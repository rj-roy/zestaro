// 'use client'
// import { Leaf, WheatOff, Flame } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const filters = [
//   { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
//   { id: 'vegan', label: 'Vegan', icon: Leaf },
//   { id: 'gluten-free', label: 'Gluten-Free', icon: WheatOff },
//   { id: 'spicy', label: 'Spicy', icon: Flame },
// ];

// export default function FilterTags({ query }) {
//   const router = useRouter();

//   const handleUpdateQuery = (clickedTag) => {
//     const tags = query?.tags?.split(',') ?? [];
//     const updateTags = tags.includes(clickedTag) ? tags.filter((tag) => tag !== clickedTag) : [...tags, clickedTag];

//     const newQuery = { ...query };

//     if (updateTags.length) {
//       newQuery.tags = updateTags.join(",");
//     } else {
//       delete newQuery.tags;
//     };

//     const searchParams = new URLSearchParams(newQuery);

//     router.push(`/menu?${searchParams.toString()}`);
//   };

//   return (
//     <div className="flex flex-wrap gap-3 mb-8">
//       {filters.map((filter) => {
//         const Icon = filter.icon;
//         const isSelected = query?.tags?.toLowerCase().includes(filter.id);

//         return (
//           <button
//             key={filter.id}
//             onClick={() => handleUpdateQuery(filter?.id)}
//             // href={`/menu${query?.category ? `?category=${query?.category}&` : '?'}tags=${filter.label}`}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected
//               ? 'bg-primary text-tertiary shadow-md'
//               : 'bg-white dark:bg-neutral/20 text-secondary dark:text-tertiary border border-neutral/20 hover:border-primary'
//               }`}
//           >
//             <Icon className="w-4 h-4" />
//             {filter.label}
//           </button>
//         );
//       })}
//     </div>
//   );
// }

import Link from "next/link";
import { Leaf, WheatOff, Flame } from "lucide-react";

const filters = [
  { id: "vegetarian", label: "Vegetarian", icon: Leaf },
  { id: "sea-food", label: "Sea-Food", icon: Leaf },
  { id: "gluten-free", label: "Gluten-Free", icon: WheatOff },
  { id: "spicy", label: "Spicy", icon: Flame },
  { id: "gluten", label: "Gluten", icon: Flame },
  { id: "dairy", label: "Dairy", icon: Flame },
];

export default function FilterTags({ query }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => {
        const dietaryTags = query?.dietaryTags?.split(",") ?? [];
        const isSelected = dietaryTags?.includes(filter.id);

        const updatedTags = dietaryTags.includes(filter.id)
          ? dietaryTags.filter(tag => tag !== filter.id)
          : [...dietaryTags, filter.id];

        const params = new URLSearchParams(query);

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
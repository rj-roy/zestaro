import { MenuItem } from '@/types/MenuPage';
import MenuCard from './MenuCard';

interface MenuGridProps {
  menuItems: MenuItem[];
}

export default function MenuGrid({ menuItems }: MenuGridProps) {
  if (menuItems.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral text-lg">No items match your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item, index) => (
        <MenuCard key={item._id ?? index} item={item} />
      ))}
    </div>
  );
}

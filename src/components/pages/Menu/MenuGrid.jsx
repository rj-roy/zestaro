import MenuCard from './MenuCard';

const menuItems = [
  {
    id: 1,
    name: 'Heirloom Tomato',
    price: 18,
    description: 'Burrata cheese, balsamic reduction, basil oil, toasted pine nuts',
    image: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg',
    dietaryTags: ['vegetarian', 'gluten-free'],
    category: 'starters',
  },
  {
    id: 2,
    name: 'Seared Scallops',
    price: 24,
    description: 'Cauliflower silk, crispy sage, lemon brown butter, pancetta',
    image: 'https://www.themealdb.com/images/media/meals/1c5oso1614347493.jpg',
    dietaryTags: ['gluten-free'],
    category: 'starters',
  },
  {
    id: 3,
    name: 'Truffle Arancini',
    price: 16,
    description: 'Wild mushrooms, black truffle, mozzarella, saffron aioli dip',
    image: 'https://www.themealdb.com/images/media/meals/1548772327.jpg',
    dietaryTags: ['vegetarian'],
    category: 'starters',
  },
  // Add more items...
];

export default function MenuGrid({ menuItems }) {
  // const [filteredItems, setFilteredItems] = useState([]);

  // useEffect(() => {
  //   let items = menuItems.filter((item) => item.category === category);

  //   if (filters.length > 0) {
  //     items = items.filter((item) =>
  //       filters.every((filter) => item.dietaryTags.includes(filter))
  //     );
  //   }

  //   if (searchQuery) {
  //     items = items.filter(
  //       (item) =>
  //         item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         item.description.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   }

  //   setFilteredItems(items);
  // }, [category, filters, searchQuery]);

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
        <MenuCard key={index} item={item} />
      ))}
    </div>
  );
}
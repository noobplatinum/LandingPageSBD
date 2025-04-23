import React from 'react';
import { useTheme } from '../lib/ThemeContext';

const ProductGrid: React.FC = () => {
  const { darkMode } = useTheme();
  
  const categories = [
    {
      id: 1,
      name: "Electronics",
      description: "Refurbished phones, laptops, and audio equipment",
      imageUrl: "https://placehold.co/300x200?text=Electronics",
      itemCount: 245
    },
    {
      id: 2,
      name: "Furniture",
      description: "Quality second-hand home and office furniture",
      imageUrl: "https://placehold.co/300x200?text=Furniture",
      itemCount: 118
    },
    {
      id: 3,
      name: "Clothing",
      description: "Vintage and pre-loved fashion for all styles",
      imageUrl: "https://placehold.co/300x200?text=Clothing",
      itemCount: 320
    },
    {
      id: 4,
      name: "Books",
      description: "Used books in excellent condition for all readers",
      imageUrl: "https://placehold.co/300x200?text=Books",
      itemCount: 475
    },
    {
      id: 5,
      name: "Home Goods",
      description: "Kitchen appliances, decor, and household items",
      imageUrl: "https://placehold.co/300x200?text=Home+Goods",
      itemCount: 185
    },
    {
      id: 6,
      name: "Sports & Outdoors",
      description: "Pre-owned sports equipment and outdoor gear",
      imageUrl: "https://placehold.co/300x200?text=Sports",
      itemCount: 92
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div 
            key={category.id}
            className={`rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 ${
              darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <div className="relative">
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="w-full h-48 object-cover"
              />
              <div className={`absolute bottom-0 left-0 right-0 p-2 ${
                darkMode ? 'bg-black/70' : 'bg-white/70'
              }`}>
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-amber-300' : 'text-purple-600'
                }`}>
                  {category.itemCount} items available
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className={`text-xl font-bold mb-2 ${
                darkMode ? 'text-amber-300' : 'text-purple-600'
              }`}>
                {category.name}
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {category.description}
              </p>
              
              <button className={`w-full py-2 rounded-lg transition ${
                darkMode 
                  ? 'bg-amber-400 text-black hover:bg-amber-500' 
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}>
                Explore Category
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
          Ready to explore our full collection?
        </h3>
        <button className={`mt-2 px-8 py-3 rounded-lg text-lg transition ${
          darkMode 
            ? 'bg-amber-400 text-black hover:bg-amber-500' 
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}>
          Browse All Categories
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
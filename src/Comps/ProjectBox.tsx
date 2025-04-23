import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../lib/ThemeContext';

// Product type definition for featured products
interface FeaturedProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  condition: string;
  imageUrl: string;
}

const ProjectsBox = () => {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.3);
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  const featuredProducts: FeaturedProduct[] = [
    {
      id: 1,
      name: "Vintage Leather Jacket",
      category: "Clothing",
      description: "Authentic leather jacket from the 90s in excellent condition. Perfect for casual or evening wear.",
      price: 79.99,
      originalPrice: 199.99,
      discount: 60,
      condition: "Excellent",
      imageUrl: "https://placehold.co/600x400?text=Vintage+Jacket"
    },
    {
      id: 2,
      name: "Sony WH-1000XM4 Headphones",
      category: "Electronics",
      description: "Premium noise-cancelling headphones with minimal use. Includes original packaging and accessories.",
      price: 189.99,
      originalPrice: 349.99,
      discount: 46,
      condition: "Like New",
      imageUrl: "https://placehold.co/600x400?text=Sony+Headphones"
    },
    {
      id: 3,
      name: "Mid-Century Coffee Table",
      category: "Furniture",
      description: "Solid wood coffee table with mid-century modern design. Some minor scratches but structurally perfect.",
      price: 119.99,
      originalPrice: 299.99,
      discount: 60,
      condition: "Good",
      imageUrl: "https://placehold.co/600x400?text=Coffee+Table"
    }
  ];

  return (
    <div 
      ref={boxRef}
      className={`w-full transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredProducts.map((product, index) => (
          <div
            key={product.id}
            className={`rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${index * 150}ms`
            }}
          >
            <div className="relative">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className={`absolute top-0 right-0 ${darkMode ? 'bg-amber-400 text-white' : 'bg-purple-600 text-white'} px-2 py-1 m-2 rounded text-xs font-bold`}>
                {product.discount}% OFF
              </div>
              <div className={`absolute bottom-0 left-0 right-0 py-1 px-3 text-xs font-medium ${
                darkMode ? 'bg-black/70 text-white' : 'bg-white/70 text-black'
              }`}>
                {product.condition} condition
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {product.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  darkMode ? 'bg-amber-400/20 text-amber-300' : 'bg-purple-600/20 text-purple-700'
                }`}>
                  {product.category}
                </span>
              </div>
              
              <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {product.description}
              </p>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className={`text-lg font-bold ${darkMode ? 'text-amber-300' : 'text-purple-600'}`}>
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-xs line-through opacity-70">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                </div>
                
                <button className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  darkMode 
                    ? 'bg-amber-400 text-black hover:bg-amber-500' 
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsBox;
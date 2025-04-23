import React, { useState } from 'react';
import { useTheme } from '../lib/ThemeContext';

const Newsletter: React.FC = () => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribed with email:', email);
      setSubscribed(true);
      setEmail('');
      
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className={`w-full rounded-lg shadow-lg overflow-hidden ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 md:p-12">
          <h2 className={`text-3xl font-bold mb-4 ${
            darkMode ? 'text-amber-300' : 'text-purple-600'
          }`}>
            Penawaran Eksklusif Di Sini!
          </h2>
          
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Temukan berbagai penawaran menarik dan produk berkualitas hanya untuk Anda.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
              }`}
              required
            />
            
            <button 
              type="submit" 
              disabled={subscribed}
              className={`w-full px-6 py-3 rounded-lg transition font-medium ${
                subscribed
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : darkMode
                    ? 'bg-amber-400 text-black hover:bg-amber-500'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {subscribed ? 'Terima kasih!' : 'Sign Up'}
            </button>
            
            <div className="mt-2 text-center">
              <small className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                Tanpa spam!
              </small>
            </div>
          </form>
        </div>
        
        <div className="md:w-1/2 bg-gray-200 flex items-center justify-center">
          <div className="p-6 text-center">
            <div className="text-6xl mb-4">🎁</div>
            <div className="text-xl font-bold text-gray-800">
              10% off pembelian pertama Anda
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

// Icons
const TrainIcon = getIcon('Train');
const CalendarIcon = getIcon('Calendar');
const MapPinIcon = getIcon('MapPin');
const UsersIcon = getIcon('Users');
const SearchIcon = getIcon('Search');

export default function Home() {
  // Popular destinations
  const popularRoutes = [
    { from: "New York", to: "Boston", duration: "3h 30m", price: 125 },
    { from: "Chicago", to: "St. Louis", duration: "5h 15m", price: 89 },
    { from: "Los Angeles", to: "San Francisco", duration: "6h 45m", price: 110 },
    { from: "Seattle", to: "Portland", duration: "3h 20m", price: 75 }
  ];

  // State for the search form
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    passengers: 1,
    showResults: false
  });

  // Handle search form changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchParams.from || !searchParams.to) {
      toast.error("Please select both origin and destination stations");
      return;
    }
    
    if (searchParams.from === searchParams.to) {
      toast.error("Origin and destination cannot be the same");
      return;
    }
    
    toast.success("Searching for trains. Results will appear shortly!");
    
    // Set showResults to true to display train options
    setSearchParams({
      ...searchParams,
      showResults: true
    });
  };
  
  // Quick search by popular route
  const searchByPopularRoute = (route) => {
    setSearchParams({
      ...searchParams,
      from: route.from,
      to: route.to,
      showResults: true
    });
    
    toast.info(`Selected route: ${route.from} to ${route.to}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-primary to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Train background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center text-white mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Journey by Rail, Simplified
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto"
            >
              Book train tickets quickly and easily with RailRoute
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl p-6 transform translate-y-0 neu-element">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="from" className="block text-surface-700 dark:text-surface-300 font-medium">
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-5 w-5 text-primary" />
                        <span>From</span>
                      </div>
                    </label>
                    <select 
                      id="from" 
                      name="from" 
                      value={searchParams.from}
                      onChange={handleSearchChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select origin station</option>
                      <option value="New York">New York</option>
                      <option value="Chicago">Chicago</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Seattle">Seattle</option>
                      <option value="Boston">Boston</option>
                      <option value="St. Louis">St. Louis</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="Portland">Portland</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="to" className="block text-surface-700 dark:text-surface-300 font-medium">
                      <div className="flex items-center space-x-2">
                        <MapPinIcon className="h-5 w-5 text-secondary" />
                        <span>To</span>
                      </div>
                    </label>
                    <select 
                      id="to" 
                      name="to" 
                      value={searchParams.to}
                      onChange={handleSearchChange}
                      className="form-select"
                      required
                    >
                      <option value="">Select destination station</option>
                      <option value="New York">New York</option>
                      <option value="Chicago">Chicago</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Seattle">Seattle</option>
                      <option value="Boston">Boston</option>
                      <option value="St. Louis">St. Louis</option>
                      <option value="San Francisco">San Francisco</option>
                      <option value="Portland">Portland</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="date" className="block text-surface-700 dark:text-surface-300 font-medium">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                        <span>Travel Date</span>
                      </div>
                    </label>
                    <input 
                      type="date" 
                      id="date" 
                      name="date" 
                      value={searchParams.date}
                      onChange={handleSearchChange}
                      min={format(new Date(), 'yyyy-MM-dd')}
                      className="form-input"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="passengers" className="block text-surface-700 dark:text-surface-300 font-medium">
                      <div className="flex items-center space-x-2">
                        <UsersIcon className="h-5 w-5 text-primary" />
                        <span>Passengers</span>
                      </div>
                    </label>
                    <select 
                      id="passengers" 
                      name="passengers" 
                      value={searchParams.passengers}
                      onChange={handleSearchChange}
                      className="form-select"
                      required
                    >
                      {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full md:w-auto px-6 py-3 bg-secondary text-white font-medium rounded-xl flex items-center justify-center space-x-2 transition-all hover:bg-secondary-dark active:scale-95"
                >
                  <SearchIcon className="h-5 w-5" />
                  <span>Search Trains</span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Popular Routes */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Popular Routes</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card card-hover cursor-pointer"
                onClick={() => searchByPopularRoute(route)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <TrainIcon className="h-6 w-6 text-primary" />
                    <span className="text-lg font-semibold text-secondary">${route.price}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{route.from} to {route.to}</h3>
                    <p className="text-surface-500 dark:text-surface-400">Duration: {route.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Main Feature */}
      {searchParams.showResults && <MainFeature from={searchParams.from} to={searchParams.to} date={searchParams.date} passengers={searchParams.passengers} />}
    </div>
  );
}
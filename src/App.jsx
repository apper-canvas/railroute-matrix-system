import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from 'framer-motion';
import getIcon from './utils/iconUtils';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Components
const MoonIcon = getIcon('Moon');
const SunIcon = getIcon('Sun');

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode') === 'true';
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return savedMode !== null ? savedMode : prefersDark;
    }
    return false;
  });

  // Initialize dark mode
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 sticky top-0 z-10 bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white">
              <span className="font-bold">R</span>
            </div>
            <span className="text-xl font-semibold text-primary">RailRoute</span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 transition-colors duration-300 hover:bg-surface-200 dark:hover:bg-surface-600"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-surface-600" />
            )}
          </motion.button>
        </div>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="py-6 px-4 bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto text-center text-sm text-surface-500 dark:text-surface-400">
          <p>&copy; {new Date().getFullYear()} RailRoute. All rights reserved.</p>
        </div>
      </footer>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="rounded-lg"
      />
    </div>
  );
}

export default App;
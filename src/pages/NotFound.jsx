import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import getIcon from '../utils/iconUtils';

// Icons
const TrainIcon = getIcon('Train');
const HomeIcon = getIcon('Home');
const AlertTriangleIcon = getIcon('AlertTriangle');

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center justify-center"
        >
          <div className="relative">
            <div className="text-primary-light/20 dark:text-primary-dark/20">
              <TrainIcon className="h-32 w-32" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertTriangleIcon className="h-16 w-16 text-secondary" />
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-4 text-surface-800 dark:text-surface-100"
        >
          404
        </motion.h1>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xl font-medium mb-2 text-surface-700 dark:text-surface-300"
        >
          Page Not Found
        </motion.p>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-surface-600 dark:text-surface-400 mb-8"
        >
          Oops! It seems like this train has derailed. The page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-5 py-3 bg-primary text-white font-medium rounded-lg transition-all hover:bg-primary-dark"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Return to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
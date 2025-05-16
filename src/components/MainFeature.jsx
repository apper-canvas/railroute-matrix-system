import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Icons
const TrainIcon = getIcon('Train');
const CreditCardIcon = getIcon('CreditCard');
const ClockIcon = getIcon('Clock');
const BedDoubleIcon = getIcon('BedDouble');
const CoffeeIcon = getIcon('Coffee');
const WifiIcon = getIcon('Wifi');
const CheckIcon = getIcon('Check');
const XIcon = getIcon('X');
const ChevronRightIcon = getIcon('ChevronRight');
const ChevronLeftIcon = getIcon('ChevronLeft');
const DollarSignIcon = getIcon('DollarSign');
const InfoIcon = getIcon('Info');
const UserIcon = getIcon('User');
const MapPinIcon = getIcon('MapPin');
const ArrowRightIcon = getIcon('ArrowRight');

export default function MainFeature() {
  // Sample train data
  const trainOptions = [
    {
      id: "TR001",
      name: "Pacific Express",
      departureTime: "08:30",
      arrivalTime: "12:45", 
      duration: "4h 15m",
      price: 120,
      seatTypes: [
        { id: "EC", name: "Economy", price: 0, available: 42 },
        { id: "BC", name: "Business", price: 65, available: 28 },
        { id: "FC", name: "First Class", price: 120, available: 14 }
      ],
      amenities: ["WiFi", "Dining Car", "Power Outlets", "Sleeper Cabins"]
    },
    {
      id: "TR002",
      name: "Mountain Explorer",
      departureTime: "10:15",
      arrivalTime: "15:20", 
      duration: "5h 05m",
      price: 95,
      seatTypes: [
        { id: "EC", name: "Economy", price: 0, available: 56 },
        { id: "BC", name: "Business", price: 45, available: 22 },
        { id: "FC", name: "First Class", price: 90, available: 8 }
      ],
      amenities: ["WiFi", "Café Car", "Power Outlets"]
    },
    {
      id: "TR003",
      name: "Coastal Liner",
      departureTime: "14:30",
      arrivalTime: "19:45", 
      duration: "5h 15m",
      price: 105,
      seatTypes: [
        { id: "EC", name: "Economy", price: 0, available: 38 },
        { id: "BC", name: "Business", price: 50, available: 24 },
        { id: "FC", name: "First Class", price: 100, available: 10 }
      ],
      amenities: ["WiFi", "Dining Car", "Power Outlets", "Panoramic Views"]
    }
  ];

  // State for booking process
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedSeatType, setSelectedSeatType] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // State for displayed trains
  const [displayedTrains, setDisplayedTrains] = useState([]);
  
  // Simulate loading train data
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedTrains(trainOptions);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle train selection
  const selectTrain = (train) => {
    setSelectedTrain(train);
    setCurrentStep(2);
  };

  // Handle seat type selection
  const selectSeatType = (seatType) => {
    setSelectedSeatType(seatType);
    setCurrentStep(3);
  };

  // Handle input change for passenger details
  const handlePassengerDetailsChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();
    
    // Validation
    const { fullName, email, phone } = passengerDetails;
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    // Display success message and reset form
    toast.success(`Booking confirmed for ${selectedTrain.name}!`);
    
    // Reset state
    setTimeout(() => {
      setCurrentStep(1);
      setSelectedTrain(null);
      setSelectedSeatType(null);
      setPassengerDetails({
        fullName: '',
        email: '',
        phone: '',
        address: ''
      });
    }, 2000);
  };

  // Go back to previous step
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      
      if (currentStep === 3) {
        setSelectedSeatType(null);
      } else if (currentStep === 2) {
        setSelectedTrain(null);
      }
    }
  };

  return (
    <section className="py-12 md:py-16 px-4 bg-surface-100 dark:bg-surface-800">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Book Your Journey</h2>
        
        {/* Progress Indicator */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-between">
            {/* Step indicators */}
            <div className="flex items-center relative w-full">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center relative w-1/3">
                  <div 
                    className={`h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all
                      ${currentStep >= step 
                        ? 'bg-primary text-white' 
                        : 'bg-surface-200 dark:bg-surface-700 text-surface-500 dark:text-surface-400'}`}
                  >
                    {step}
                  </div>
                  <p className={`text-sm mt-2 text-center
                    ${currentStep >= step 
                      ? 'text-primary font-medium' 
                      : 'text-surface-500 dark:text-surface-400'}`}
                  >
                    {step === 1 ? 'Select Train' : step === 2 ? 'Choose Seat' : 'Passenger Details'}
                  </p>
                  
                  {/* Connecting line */}
                  {step < 3 && (
                    <div 
                      className={`absolute top-5 h-0.5 w-full left-1/2 transition-all
                        ${currentStep > step 
                          ? 'bg-primary' 
                          : 'bg-surface-200 dark:bg-surface-600'}`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Dynamic content based on current step */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-surface-900 rounded-xl shadow-card p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Available Trains</h3>
                    <div className="flex items-center space-x-2 text-surface-600 dark:text-surface-400">
                      <MapPinIcon className="h-5 w-5" />
                      <span>Los Angeles to San Francisco</span>
                    </div>
                  </div>
                  
                  {displayedTrains.length === 0 ? (
                    <div className="py-16 text-center">
                      <div className="inline-block mb-4">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full"
                        />
                      </div>
                      <p className="text-surface-600 dark:text-surface-400">Loading available trains...</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {displayedTrains.map((train) => (
                        <motion.div
                          key={train.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.01 }}
                          transition={{ duration: 0.2 }}
                          className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 cursor-pointer"
                          onClick={() => selectTrain(train)}
                        >
                          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-3 bg-primary-light/10 dark:bg-primary-dark/20 rounded-full">
                                <TrainIcon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{train.name}</h4>
                                <p className="text-sm text-surface-500 dark:text-surface-400">Train #{train.id}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto">
                              <div className="flex items-center space-x-3 w-full md:w-auto">
                                <div className="text-right">
                                  <p className="font-semibold">{train.departureTime}</p>
                                  <p className="text-sm text-surface-500 dark:text-surface-400">Los Angeles</p>
                                </div>
                                <div className="flex flex-col items-center">
                                  <div className="h-0.5 w-10 md:w-16 bg-surface-300 dark:bg-surface-600"></div>
                                  <p className="text-xs text-surface-500 dark:text-surface-400 my-1">{train.duration}</p>
                                  <div className="h-0.5 w-10 md:w-16 bg-surface-300 dark:bg-surface-600"></div>
                                </div>
                                <div>
                                  <p className="font-semibold">{train.arrivalTime}</p>
                                  <p className="text-sm text-surface-500 dark:text-surface-400">San Francisco</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 self-end md:self-center">
                                <DollarSignIcon className="h-5 w-5 text-secondary" />
                                <span className="font-semibold">${train.price}</span>
                              </div>
                              
                              <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center space-x-1 transition-all hover:bg-primary-dark self-end md:self-center">
                                <span>Select</span>
                                <ChevronRightIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            
            {currentStep === 2 && selectedTrain && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-surface-900 rounded-xl shadow-card p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <button 
                      onClick={goBack}
                      className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <h3 className="text-xl font-semibold">Choose Seat Type</h3>
                  </div>
                  
                  <div className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary-light/10 dark:bg-primary-dark/20 rounded-full">
                          <TrainIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{selectedTrain.name}</h4>
                          <p className="text-sm text-surface-500 dark:text-surface-400">Train #{selectedTrain.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <p className="font-semibold">{selectedTrain.departureTime}</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Los Angeles</p>
                          </div>
                          <ArrowRightIcon className="h-5 w-5 text-surface-400" />
                          <div>
                            <p className="font-semibold">{selectedTrain.arrivalTime}</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">San Francisco</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-4">Available Seat Types</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedTrain.seatTypes.map((seatType) => (
                      <motion.div
                        key={seatType.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.2 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-all
                          ${seatType.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                          ${seatType.id === 'EC' ? 'border-blue-300 dark:border-blue-700' : 
                            seatType.id === 'BC' ? 'border-purple-300 dark:border-purple-700' : 
                            'border-yellow-300 dark:border-yellow-700'}`}
                        onClick={() => seatType.available > 0 && selectSeatType(seatType)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-full
                            ${seatType.id === 'EC' ? 'bg-blue-100 dark:bg-blue-900/30' : 
                              seatType.id === 'BC' ? 'bg-purple-100 dark:bg-purple-900/30' : 
                              'bg-yellow-100 dark:bg-yellow-900/30'}`}
                          >
                            {seatType.id === 'EC' ? (
                              <UserIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            ) : seatType.id === 'BC' ? (
                              <CoffeeIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            ) : (
                              <BedDoubleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            )}
                          </div>
                          <span className={`text-sm font-medium px-2 py-1 rounded
                            ${seatType.available > 10 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                              seatType.available > 0 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : 
                              'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}
                          >
                            {seatType.available > 0 ? `${seatType.available} available` : 'Sold out'}
                          </span>
                        </div>
                        
                        <h5 className="font-semibold">{seatType.name}</h5>
                        <p className="text-lg font-bold mt-1">
                          ${selectedTrain.price + seatType.price}
                          {seatType.price > 0 && (
                            <span className="text-sm text-surface-500 dark:text-surface-400 ml-1">
                              (+${seatType.price})
                            </span>
                          )}
                        </p>
                        
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center space-x-2">
                            <CheckIcon className="h-4 w-4 text-green-500" />
                            <span className="text-sm">Assigned Seat</span>
                          </div>
                          {(seatType.id === 'BC' || seatType.id === 'FC') && (
                            <div className="flex items-center space-x-2">
                              <CheckIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Extra Legroom</span>
                            </div>
                          )}
                          {seatType.id === 'FC' && (
                            <div className="flex items-center space-x-2">
                              <CheckIcon className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Meal Service</span>
                            </div>
                          )}
                          {seatType.id === 'EC' && (
                            <div className="flex items-center space-x-2">
                              <XIcon className="h-4 w-4 text-red-500" />
                              <span className="text-sm">No Meal Service</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <InfoIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h5 className="font-medium text-blue-700 dark:text-blue-400">Amenities on this train</h5>
                        <div className="mt-2 flex flex-wrap gap-3">
                          {selectedTrain.amenities.map((amenity, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
                            >
                              {amenity === "WiFi" ? (
                                <WifiIcon className="h-4 w-4 mr-1.5 text-primary" />
                              ) : amenity === "Dining Car" || amenity === "Café Car" ? (
                                <CoffeeIcon className="h-4 w-4 mr-1.5 text-primary" />
                              ) : amenity === "Sleeper Cabins" ? (
                                <BedDoubleIcon className="h-4 w-4 mr-1.5 text-primary" />
                              ) : (
                                <ClockIcon className="h-4 w-4 mr-1.5 text-primary" />
                              )}
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {currentStep === 3 && selectedTrain && selectedSeatType && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-white dark:bg-surface-900 rounded-xl shadow-card p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <button 
                      onClick={goBack}
                      className="p-2 rounded-full hover:bg-surface-100 dark:hover:bg-surface-800"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <h3 className="text-xl font-semibold">Passenger Details</h3>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-2/3">
                      <form onSubmit={handleBooking} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label htmlFor="fullName" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              value={passengerDetails.fullName}
                              onChange={handlePassengerDetailsChange}
                              className="form-input"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={passengerDetails.email}
                              onChange={handlePassengerDetailsChange}
                              className="form-input"
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label htmlFor="phone" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={passengerDetails.phone}
                              onChange={handlePassengerDetailsChange}
                              className="form-input"
                              placeholder="Enter your phone number"
                              required
                            />
                          </div>
                          
                          <div className="space-y-1">
                            <label htmlFor="address" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                              Address (Optional)
                            </label>
                            <input
                              type="text"
                              id="address"
                              name="address"
                              value={passengerDetails.address}
                              onChange={handlePassengerDetailsChange}
                              className="form-input"
                              placeholder="Enter your address"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full px-6 py-3 bg-secondary text-white font-semibold rounded-lg flex items-center justify-center space-x-2 transition-all hover:bg-secondary-dark active:scale-95"
                          >
                            <CreditCardIcon className="h-5 w-5" />
                            <span>Confirm & Pay ${selectedTrain.price + selectedSeatType.price}</span>
                          </button>
                        </div>
                      </form>
                    </div>
                    
                    <div className="lg:w-1/3">
                      <div className="border border-surface-200 dark:border-surface-700 rounded-lg p-4 bg-surface-50 dark:bg-surface-800">
                        <h4 className="font-semibold mb-4 pb-2 border-b border-surface-200 dark:border-surface-700">Booking Summary</h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-surface-600 dark:text-surface-400">Train</span>
                            <span className="font-medium">{selectedTrain.name}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-surface-600 dark:text-surface-400">Date</span>
                            <span className="font-medium">July 15, 2023</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-surface-600 dark:text-surface-400">Time</span>
                            <span className="font-medium">{selectedTrain.departureTime} - {selectedTrain.arrivalTime}</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-surface-600 dark:text-surface-400">Route</span>
                            <span className="font-medium">LA → SF</span>
                          </div>
                          
                          <div className="flex justify-between">
                            <span className="text-surface-600 dark:text-surface-400">Seat Type</span>
                            <span className="font-medium">{selectedSeatType.name}</span>
                          </div>
                          
                          <div className="pt-3 mt-3 border-t border-surface-200 dark:border-surface-700">
                            <div className="flex justify-between text-lg">
                              <span className="font-semibold">Total</span>
                              <span className="font-bold text-secondary">${selectedTrain.price + selectedSeatType.price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-primary-light/10 dark:bg-primary-dark/20 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <InfoIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-surface-700 dark:text-surface-300">
                            Your e-ticket will be sent to your email after payment. You can also access it in your account.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
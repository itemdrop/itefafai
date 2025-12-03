
'use client';

// Stub for missing ECommerceApp
function ECommerceApp() {
  return <div>E-Commerce App Demo</div>;
}

// Stub for missing categories
const categories = [
  "All",
  "Web Development",
  "Mobile Development",
  "UI/UX Design"
];

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  // Ensure modal is always centered and background is scroll-locked
  useEffect(() => {
    if (selectedProject !== null) {
      // Lock background scroll
      document.documentElement.classList.add('has-modal');
    } else {
      // Unlock background scroll
      document.documentElement.classList.remove('has-modal');
    }
    return () => {
      document.documentElement.classList.remove('has-modal');
    };
  }, [selectedProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject !== null) {
      document.documentElement.classList.add('has-modal');
    } else {
      document.documentElement.classList.remove('has-modal');
    }
    return () => {
      document.documentElement.classList.remove('has-modal');
    };
  }, [selectedProject]);

  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A modern e-commerce solution with advanced features including inventory management, payment processing, and analytics dashboard.",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      appType: "ecommerce"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure mobile banking application with biometric authentication, real-time transactions, and financial insights.",
      technologies: ["React Native", "Node.js", "MongoDB", "AWS"],
      image: "bg-gradient-to-br from-green-400 to-green-600",
      appType: "banking"
    },
    {
      title: "Healthcare Management System",
      category: "Web Development",
      description: "Comprehensive healthcare platform for patient management, appointment scheduling, and medical records.",
      technologies: ["React", "Python", "Django", "MySQL"],
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
      appType: "healthcare"
    },
    {
      title: "Real Estate Portal",
      category: "Web Development",
      description: "Property listing platform with advanced search filters, virtual tours, and integrated mortgage calculator.",
      technologies: ["Vue.js", "Laravel", "PostgreSQL", "Redis"],
      image: "bg-gradient-to-br from-orange-400 to-orange-600",
      appType: "realestate"
    },
    {
      title: "Food Delivery App",
      category: "Mobile Development",
      description: "On-demand food delivery application with real-time tracking, multiple payment options, and rating system.",
      technologies: ["Flutter", "Firebase", "Google Maps", "Stripe"],
      image: "bg-gradient-to-br from-red-400 to-red-600",
      appType: "food"
    },
    {
      title: "AI Learning Platform",
      category: "EdTech",
      description: "An interactive AI-powered learning platform featuring adaptive quizzes, real-time feedback, and personalized course recommendations.",
      technologies: ["Next.js", "TypeScript", "TensorFlow.js", "OpenAI API"],
      image: "bg-gradient-to-br from-indigo-400 to-indigo-700",
      appType: "learning"
    }
  ];

  const BankingApp = () => {
    const [accounts, setAccounts] = useState([
      { id: 1, type: 'Checking', balance: 1250.50, number: '****4521' },
      { id: 2, type: 'Savings', balance: 5480.25, number: '****7890' },
      { id: 3, type: 'Credit Card', balance: -1200.00, number: '****1234', limit: 5000 }
    ]);
    const [activeAccount, setActiveAccount] = useState(0);
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [transferAmount, setTransferAmount] = useState('');
    const [transactions, setTransactions] = useState([
      { id: 1, type: 'credit', amount: 500, desc: 'Salary Deposit', date: '2024-11-06', category: 'Income' },
      { id: 2, type: 'debit', amount: 50, desc: 'Coffee Shop', date: '2024-11-05', category: 'Food' },
      { id: 3, type: 'debit', amount: 1200, desc: 'Rent Payment', date: '2024-11-01', category: 'Housing' },
      { id: 4, type: 'credit', amount: 25, desc: 'Cashback Reward', date: '2024-10-30', category: 'Rewards' }
    ]);
    const [showBiometric, setShowBiometric] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [budgetData, setBudgetData] = useState({
      food: { spent: 350, budget: 500 },
      housing: { spent: 1200, budget: 1400 },
      transport: { spent: 180, budget: 300 },
      entertainment: { spent: 120, budget: 200 }
    });

    const handleTransaction = (type: 'credit' | 'debit') => {
      const value = parseFloat(amount);
      if (value > 0) {
        const updatedAccounts = [...accounts];
        const newBalance = type === 'credit' 
          ? updatedAccounts[activeAccount].balance + value 
          : updatedAccounts[activeAccount].balance - value;
        
        updatedAccounts[activeAccount].balance = newBalance;
        setAccounts(updatedAccounts);
        
        setTransactions([{
          id: Date.now(),
          type,
          amount: value,
          desc: type === 'credit' ? 'Deposit' : 'Withdrawal',
          date: new Date().toISOString().split('T')[0],
          category: type === 'credit' ? 'Income' : 'Other'
        }, ...transactions]);
        setAmount('');
      }
    };

    const handleTransfer = () => {
      const value = parseFloat(transferAmount);
      if (value > 0 && recipient) {
        const updatedAccounts = [...accounts];
        updatedAccounts[activeAccount].balance -= value;
        setAccounts(updatedAccounts);
        
        setTransactions([{
          id: Date.now(),
          type: 'debit',
          amount: value,
          desc: `Transfer to ${recipient}`,
          date: new Date().toISOString().split('T')[0],
          category: 'Transfer'
        }, ...transactions]);
        setTransferAmount('');
        setRecipient('');
      }
    };

    const authenticateWithBiometric = () => {
      setShowBiometric(true);
      setTimeout(() => {
        setIsAuthenticated(true);
        setShowBiometric(false);
      }, 2000);
    };

    if (!isAuthenticated) {
      return (
        <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-lg">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-6 text-blue-400">Secure Login</h3>
            <div className="bg-gray-800 p-8 rounded-lg max-w-md mx-auto">
              {showBiometric ? (
                <div className="space-y-4">
                  <div className="text-6xl animate-pulse">👆</div>
                  <p className="text-blue-400">Authenticating...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl">🔒</div>
                  <p className="text-white mb-4">Use biometric authentication to access your account</p>
                  <button
                    onClick={authenticateWithBiometric}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
                  >
                    Authenticate with Touch ID
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="demo-container p-3 sm:p-6 max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-lg overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400">Advanced Banking Platform</h3>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-400 hover:text-white"
          >
            🔒 Logout
          </button>
        </div>

        {/* Account Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              onClick={() => setActiveAccount(index)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                activeAccount === index 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-blue-400' 
                  : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{account.type}</h4>
                <span className="text-sm text-gray-400">{account.number}</span>
              </div>
              <p className={`text-2xl font-bold ${
                account.balance < 0 ? 'text-red-400' : 'text-green-400'
              }`}>
                ${Math.abs(account.balance).toFixed(2)}
              </p>
              {account.balance < 0 && (
                <p className="text-xs text-gray-400">
                  Available: ${(account.limit + account.balance).toFixed(2)}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-400">Quick Actions</h4>
            
            {/* Deposit/Withdraw */}
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 text-sm sm:text-base"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleTransaction('credit')}
                  className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white py-3 sm:py-3 rounded-lg transition-all text-base font-medium min-h-[48px] touch-manipulation"
                >
                  💰 Deposit
                </button>
                <button
                  onClick={() => handleTransaction('debit')}
                  className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-3 rounded-lg transition-all text-base font-medium min-h-[48px] touch-manipulation"
                >
                  💸 Withdraw
                </button>
              </div>
            </div>

            {/* Transfer */}
            <div className="space-y-4 pt-4 border-t border-gray-600">
              <h5 className="font-medium text-blue-400 text-base">Quick Transfer</h5>
              <input
                type="text"
                placeholder="Recipient email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 text-base min-h-[48px]"
              />
              <input
                type="number"
                placeholder="Transfer amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-blue-500 text-base min-h-[48px]"
              />
              <button
                onClick={handleTransfer}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3 rounded-lg transition-all text-base font-medium min-h-[48px] touch-manipulation"
              >
                Send Money
              </button>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4">
            <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-400">Recent Transactions</h4>
            <div className="space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
              {transactions.map(transaction => (
                <div key={transaction.id} className="bg-gray-700 p-3 sm:p-4 rounded-lg min-h-[60px]">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm sm:text-base">{transaction.desc}</p>
                      <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400 mt-1">
                        <span>{transaction.date}</span>
                        <span>•</span>
                        <span>{transaction.category}</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className={`font-bold text-base sm:text-lg ${
                        transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h4 className="text-xl font-semibold mb-4 text-blue-400">Budget Overview</h4>
            <div className="space-y-4">
              {Object.entries(budgetData).map(([category, data]) => {
                const percentage = (data.spent / data.budget) * 100;
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize text-white">{category}</span>
                      <span className="text-gray-400">${data.spent}/${data.budget}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-600">
              <h5 className="font-medium text-blue-400 mb-3">Monthly Summary</h5>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-700 p-3 rounded">
                  <div className="text-green-400 font-bold">$3,250</div>
                  <div className="text-xs text-gray-400">Income</div>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <div className="text-red-400 font-bold">$1,850</div>
                  <div className="text-xs text-gray-400">Expenses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HealthcareApp = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [appointments, setAppointments] = useState([
      { id: 1, doctor: 'Dr. Smith', date: '2024-11-15', time: '10:00 AM', type: 'General Checkup', status: 'confirmed', department: 'Primary Care' },
      { id: 2, doctor: 'Dr. Johnson', date: '2024-11-20', time: '2:30 PM', type: 'Cardiology Consultation', status: 'pending', department: 'Cardiology' },
      { id: 3, doctor: 'Dr. Williams', date: '2024-11-25', time: '9:15 AM', type: 'Blood Test', status: 'confirmed', department: 'Laboratory' }
    ]);
    const [vitals, setVitals] = useState({
      heartRate: 72,
      bloodPressure: '120/80',
      temperature: 98.6,
      weight: 165,
      lastUpdated: '2024-11-06'
    });
    const [medications, setMedications] = useState([
      { id: 1, name: 'Lisinopril 10mg', frequency: 'Once daily', remaining: 28, prescribed: 'Dr. Johnson', condition: 'Hypertension' },
      { id: 2, name: 'Metformin 500mg', frequency: 'Twice daily', remaining: 45, prescribed: 'Dr. Smith', condition: 'Diabetes' },
      { id: 3, name: 'Vitamin D3', frequency: 'Once daily', remaining: 12, prescribed: 'Dr. Smith', condition: 'Deficiency' }
    ]);
    const [healthMetrics, setHealthMetrics] = useState({
      steps: 8420,
      calories: 1850,
      sleep: 7.5,
      water: 6
    });

    const bookAppointment = () => {
      const newAppointment = {
        id: Date.now(),
        doctor: 'Dr. Anderson',
        date: '2024-12-01',
        time: '11:00 AM',
        type: 'Follow-up',
        status: 'pending',
        department: 'Primary Care'
      };
      setAppointments([...appointments, newAppointment]);
    };

    const cancelAppointment = (id: number) => {
      setAppointments(appointments.filter(apt => apt.id !== id));
    };

    return (
      <div className="demo-container p-3 sm:p-6 max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-lg overflow-hidden">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-400">Advanced Healthcare Management</h3>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-800 p-1 rounded-lg overflow-x-auto">
          {['dashboard', 'appointments', 'medications', 'vitals'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md capitalize transition-all text-sm sm:text-base whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Patient Profile */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 mb-4 text-center sm:text-left">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  👤
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">Sarah Johnson</h4>
                  <p className="text-gray-400 text-sm">Patient ID: #HP-2024-1892</p>
                  <p className="text-gray-400 text-sm">DOB: March 15, 1985</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded">
                  <p className="text-blue-400 font-medium">Blood Type</p>
                  <p className="text-white">O+ (Verified)</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <p className="text-blue-400 font-medium">Insurance</p>
                  <p className="text-white">BlueCross Premium</p>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <p className="text-blue-400 font-medium">Emergency Contact</p>
                  <p className="text-white">John Johnson</p>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            {/* Health Metrics */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4">
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-400">Today's Health</h4>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 sm:p-4 rounded-lg text-center min-h-[80px] flex flex-col justify-center">
                  <div className="text-xl sm:text-2xl mb-1">👟</div>
                  <div className="text-lg sm:text-2xl font-bold">{healthMetrics.steps.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm opacity-80">Steps</div>
                </div>
                <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 sm:p-4 rounded-lg text-center min-h-[80px] flex flex-col justify-center">
                  <div className="text-xl sm:text-2xl mb-1">🔥</div>
                  <div className="text-lg sm:text-2xl font-bold">{healthMetrics.calories}</div>
                  <div className="text-xs sm:text-sm opacity-80">Calories</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-3 sm:p-4 rounded-lg text-center min-h-[80px] flex flex-col justify-center">
                  <div className="text-xl sm:text-2xl mb-1">💤</div>
                  <div className="text-lg sm:text-2xl font-bold">{healthMetrics.sleep}h</div>
                  <div className="text-xs sm:text-sm opacity-80">Sleep</div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded text-center">
                  <div className="text-2xl mb-1">💧</div>
                  <div className="text-2xl font-bold">{healthMetrics.water}</div>
                  <div className="text-sm opacity-80">Glasses</div>
                </div>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-semibold text-blue-400">Next Appointments</h4>
                <button
                  onClick={bookAppointment}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  + Book
                </button>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {appointments.slice(0, 3).map(appointment => (
                  <div key={appointment.id} className="bg-gray-700 p-3 rounded">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-white">{appointment.doctor}</p>
                        <p className="text-sm text-gray-400">{appointment.type}</p>
                        <p className="text-sm text-blue-400">{appointment.date} at {appointment.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        appointment.status === 'confirmed' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-yellow-600 text-white'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h4 className="text-xl sm:text-2xl font-bold text-blue-400">All Appointments</h4>
              <button
                onClick={bookAppointment}
                className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-3 rounded-lg text-sm sm:text-base font-medium min-h-[48px] touch-manipulation"
              >
                📅 Schedule New
              </button>
            </div>
            <div className="grid gap-4">
              {appointments.map(appointment => (
                <motion.div 
                  key={appointment.id} 
                  className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 min-h-[100px]"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h5 className="text-base sm:text-lg font-semibold text-white">{appointment.doctor}</h5>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium self-start ${
                          appointment.status === 'confirmed' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-yellow-600 text-white'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-2 text-sm sm:text-base">{appointment.type}</p>
                      <p className="text-blue-400 mb-1">{appointment.department}</p>
                      <p className="text-gray-400">{appointment.date} at {appointment.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-blue-400 hover:text-blue-300 px-3 py-1 border border-blue-400 rounded">
                        Reschedule
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointment.id)}
                        className="text-red-400 hover:text-red-300 px-3 py-1 border border-red-400 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medications' && (
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-blue-400">Current Medications</h4>
            <div className="grid md:grid-cols-2 gap-4">
              {medications.map(med => (
                <div key={med.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="text-lg font-semibold text-white">{med.name}</h5>
                      <p className="text-blue-400">{med.frequency}</p>
                      <p className="text-gray-400 text-sm">Prescribed by {med.prescribed}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      med.remaining < 10 ? 'bg-red-600' : 'bg-green-600'
                    } text-white`}>
                      {med.remaining} left
                    </span>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <p className="text-sm text-gray-300">Condition: {med.condition}</p>
                    {med.remaining < 10 && (
                      <p className="text-red-400 text-sm mt-1">⚠ Refill needed soon</p>
                    )}
                  </div>
                  <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                    Request Refill
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-400">Vital Signs</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">❤️</div>
                <div className="text-2xl font-bold text-red-400">{vitals.heartRate}</div>
                <div className="text-gray-400">BPM</div>
                <div className="text-green-400 text-sm mt-1">Normal</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🩸</div>
                <div className="text-2xl font-bold text-blue-400">{vitals.bloodPressure}</div>
                <div className="text-gray-400">mmHg</div>
                <div className="text-green-400 text-sm mt-1">Normal</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🌡️</div>
                <div className="text-2xl font-bold text-yellow-400">{vitals.temperature}°F</div>
                <div className="text-gray-400">Body Temp</div>
                <div className="text-green-400 text-sm mt-1">Normal</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">⚖️</div>
                <div className="text-2xl font-bold text-green-400">{vitals.weight} lbs</div>
                <div className="text-gray-400">Weight</div>
                <div className="text-blue-400 text-sm mt-1">-2 lbs</div>
              </div>
            </div>
            
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h5 className="text-lg font-semibold text-blue-400 mb-4">Health Trends</h5>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Blood Pressure Trend (30 days)</span>
                    <span className="text-green-400">Stable</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Weight Goal Progress</span>
                    <span className="text-blue-400">160 lbs target</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const RealEstateApp = () => {
    const [activeTab, setActiveTab] = useState('search');
    const [properties, setProperties] = useState([
      { 
        id: 1, 
        address: '2847 Oceanview Drive, Malibu, CA 90265', 
        price: 2450000, 
        bedrooms: 5, 
        bathrooms: 4, 
        sqft: 3200, 
        type: 'Luxury Villa',
        image: '🏖️',
        description: 'Breathtaking oceanfront estate with private beach access and infinity pool',
        amenities: ['Ocean View', 'Private Beach', 'Infinity Pool', '3-Car Garage', 'Wine Cellar', 'Home Theater'],
        yearBuilt: 2020,
        status: 'For Sale',
        agent: 'Sarah Mitchell',
        agentPhone: '(555) 123-4567',
        daysOnMarket: 12,
        virtualTour: true,
        favorites: false,
        pricePerSqft: 766,
        neighborhood: 'Malibu Beachfront',
        schools: ['Malibu Elementary (9/10)', 'Malibu Middle (8/10)'],
        images: ['🏖️', '🌊', '🏊‍♀️']
      },
      { 
        id: 2, 
        address: '1456 Mountain Ridge Way, Aspen, CO 81611', 
        price: 1875000, 
        bedrooms: 4, 
        bathrooms: 3, 
        sqft: 2800, 
        type: 'Mountain Estate',
        image: '🏔️',
        description: 'Contemporary mountain retreat with panoramic Alpine views and ski-in access',
        amenities: ['Mountain View', 'Fireplace', 'Hot Tub', 'Ski Access', 'Chef\'s Kitchen', 'Office'],
        yearBuilt: 2021,
        status: 'For Sale',
        agent: 'Michael Chen',
        agentPhone: '(555) 987-6543',
        daysOnMarket: 8,
        virtualTour: true,
        favorites: false,
        pricePerSqft: 670,
        neighborhood: 'Aspen Highlands',
        schools: ['Aspen Elementary (9/10)', 'Aspen High School (10/10)'],
        images: ['🏔️', '🎿', '🔥']
      },
      { 
        id: 3, 
        address: '789 Downtown Loft St, NYC, NY 10013', 
        price: 1200000, 
        bedrooms: 2, 
        bathrooms: 2, 
        sqft: 1600, 
        type: 'Luxury Penthouse',
        image: '🏙️',
        description: 'Ultra-modern penthouse loft with floor-to-ceiling windows and rooftop terrace',
        amenities: ['City Skyline View', 'Rooftop Terrace', 'Concierge', 'Gym', 'Doorman', 'Storage'],
        yearBuilt: 2019,
        status: 'For Sale',
        agent: 'Emily Rodriguez',
        agentPhone: '(555) 456-7890',
        daysOnMarket: 25,
        virtualTour: true,
        favorites: false,
        pricePerSqft: 750,
        neighborhood: 'SoHo District',
        schools: ['PS 234 (8/10)', 'NYC Lab School (9/10)'],
        images: ['🏙️', '🌃', '🏢']
      },
      { 
        id: 4, 
        address: '3421 Suburban Circle, Austin, TX 78731', 
        price: 685000, 
        bedrooms: 4, 
        bathrooms: 3, 
        sqft: 2400, 
        type: 'Modern Family Home',
        image: '🏡',
        description: 'Beautifully designed family home with open concept living and smart home features',
        amenities: ['Smart Home Tech', 'Solar Panels', 'Garden', '2-Car Garage', 'Game Room', 'Study'],
        yearBuilt: 2020,
        status: 'For Sale',
        agent: 'David Wilson',
        agentPhone: '(555) 234-5678',
        daysOnMarket: 18,
        virtualTour: true,
        favorites: false,
        pricePerSqft: 285,
        neighborhood: 'West Lake Hills',
        schools: ['Hill Elementary (10/10)', 'West Lake High (9/10)'],
        images: ['🏡', '🌳', '☀️']
      },
      {
        id: 5,
        address: '567 Tech Hub Plaza, San Francisco, CA 94107',
        price: 1650000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        type: 'Tech District Condo',
        image: '🌉',
        description: 'Sleek contemporary condo in the heart of SOMA with Bay Bridge views',
        amenities: ['Bay Views', 'Fitness Center', 'Business Center', 'Pet Spa', 'Bike Storage', 'EV Charging'],
        yearBuilt: 2022,
        status: 'For Sale',
        agent: 'Jessica Park',
        agentPhone: '(555) 345-6789',
        daysOnMarket: 5,
        virtualTour: true,
        favorites: false,
        pricePerSqft: 917,
        neighborhood: 'SOMA District',
        schools: ['SF Community School (8/10)', 'Lincoln High (7/10)'],
        images: ['🌉', '🏢', '🚲']
      }
    ]);
    
    const [filters, setFilters] = useState({ 
      minPrice: '', 
      maxPrice: '', 
      bedrooms: '', 
      type: '',
      amenities: '',
      sortBy: 'price-asc',
      location: '',
      priceRange: 'all'
    });
    
    const [savedProperties, setSavedProperties] = useState([]);
    const [searchHistory, setSearchHistory] = useState([
      'Luxury oceanfront homes under $3M',
      'Modern downtown penthouses',
      '4+ bedroom family homes',
      'Properties with mountain views',
      'Smart homes with solar panels'
    ]);
    
    const [marketData, setMarketData] = useState({
      averagePrice: 1370000,
      priceChange: '+5.7%',
      inventory: 1847,
      daysOnMarket: 18,
      soldLastMonth: 147,
      newListings: 89,
      pricePerSqft: 623,
      marketTrend: 'Seller\'s Market'
    });
    
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [showMortgageCalculator, setShowMortgageCalculator] = useState(false);
    const [mortgageData, setMortgageData] = useState({
      loanAmount: 0,
      interestRate: 7.2,
      loanTerm: 30,
      downPayment: 20,
      monthlyPayment: 0
    });

    const toggleFavorite = (id: number) => {
      setProperties(properties.map(prop => 
        prop.id === id ? { ...prop, favorites: !prop.favorites } : prop
      ));
      
      const property = properties.find(p => p.id === id);
      if (property && !property.favorites) {
        setSavedProperties([...savedProperties, property]);
      } else {
        setSavedProperties(savedProperties.filter(p => p.id !== id));
      }
    };

    const scheduleViewing = (propertyId: number) => {
      alert(`Viewing scheduled for property ${propertyId}. Agent will contact you within 24 hours.`);
    };
    
    const filteredProperties = properties.filter(property => {
      return (
        (!filters.minPrice || property.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || property.price <= parseInt(filters.maxPrice)) &&
        (!filters.bedrooms || property.bedrooms >= parseInt(filters.bedrooms)) &&
        (!filters.type || property.type === filters.type) &&
        (!filters.amenities || property.amenities.some(amenity => 
          amenity.toLowerCase().includes(filters.amenities.toLowerCase())
        ))
      );
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'size-asc': return a.sqft - b.sqft;
        case 'size-desc': return b.sqft - a.sqft;
        case 'newest': return b.yearBuilt - a.yearBuilt;
        default: return 0;
      }
    });
    
    return (
      <div className="demo-container p-3 sm:p-6 max-w-7xl mx-auto bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white rounded-xl overflow-hidden border border-blue-500/20 shadow-2xl">
        {/* Professional Header */}
        <div className="text-center mb-8 py-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            🏠 Elite Real Estate Platform
          </h3>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover premium properties with advanced search, market analytics, and professional tools
          </p>
        </div>
        
        {/* Enhanced Navigation Tabs */}
        <div className="flex space-x-2 mb-6 bg-gradient-to-r from-gray-800/90 to-gray-700/90 p-2 rounded-xl backdrop-blur-sm border border-gray-600/50 overflow-x-auto shadow-lg">
          {[
            { key: 'search', label: 'Property Search', icon: '🔍' },
            { key: 'favorites', label: 'Saved Properties', icon: '❤️' },
            { key: 'market', label: 'Market Analytics', icon: '📊' },
            { key: 'tools', label: 'Pro Tools', icon: '🛠️' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base whitespace-nowrap min-h-[50px] flex items-center justify-center gap-2 transform hover:scale-105 ${
                activeTab === tab.key 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.key}</span>
            </button>
          ))}
        </div>

        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Professional Search Filters */}
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                  <span className="text-xl">🔍</span>
                </div>
                <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Advanced Property Search
                </h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">💰 Price Range</label>
                  <input
                    type="number"
                    placeholder="Min Price ($)"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    className="w-full bg-gray-700/80 text-white border border-gray-600/50 p-3 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">💰 Max Budget</label>
                  <input
                    type="number"
                    placeholder="Max Price ($)"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    className="w-full bg-gray-700/80 text-white border border-gray-600/50 p-3 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">🛏️ Bedrooms</label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                    className="w-full bg-gray-700/80 text-white border border-gray-600/50 p-3 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  >
                    <option value="">Any Bedrooms</option>
                    <option value="1">1+ Bedroom</option>
                    <option value="2">2+ Bedrooms</option>
                    <option value="3">3+ Bedrooms</option>
                    <option value="4">4+ Bedrooms</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-gray-300 text-sm font-medium">🏠 Property Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full bg-gray-700/80 text-white border border-gray-600/50 p-3 rounded-lg text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  >
                    <option value="">All Types</option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
                <input
                  type="text"
                  placeholder="Amenities"
                  value={filters.amenities}
                  onChange={(e) => setFilters({...filters, amenities: e.target.value})}
                  className="bg-gray-700 text-white border border-gray-600 p-2 rounded"
                />
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="bg-gray-700 text-white border border-gray-600 p-2 rounded"
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="size-asc">Size: Small to Large</option>
                  <option value="size-desc">Size: Large to Small</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              <button
                onClick={() => setFilters({ minPrice: '', maxPrice: '', bedrooms: '', type: '', amenities: '', sortBy: 'price-asc' })}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Clear All Filters
              </button>
            </div>

            {/* Property Results */}
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <motion.div 
                  key={property.id} 
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-48 flex items-center justify-center text-6xl">
                      {property.image}
                    </div>
                    <button
                      onClick={() => toggleFavorite(property.id)}
                      className={`absolute top-2 right-2 p-2 rounded-full ${
                        property.favorites 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-800 text-gray-400 hover:text-red-500'
                      }`}
                    >
                      ❤️
                    </button>
                    <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm">
                      {property.status}
                    </div>
                    {property.virtualTour && (
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                        360° Tour
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-white mb-1">{property.address}</h4>
                    <p className="text-2xl font-bold text-green-400 mb-2">${property.price.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm mb-3">{property.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="bg-gray-700 p-2 rounded text-center">
                        <div className="text-white font-semibold">{property.bedrooms}</div>
                        <div className="text-gray-400">Bedrooms</div>
                      </div>
                      <div className="bg-gray-700 p-2 rounded text-center">
                        <div className="text-white font-semibold">{property.bathrooms}</div>
                        <div className="text-gray-400">Bathrooms</div>
                      </div>
                      <div className="bg-gray-700 p-2 rounded text-center">
                        <div className="text-white font-semibold">{property.sqft.toLocaleString()}</div>
                        <div className="text-gray-400">Sq Ft</div>
                      </div>
                      <div className="bg-gray-700 p-2 rounded text-center">
                        <div className="text-white font-semibold">{property.yearBuilt}</div>
                        <div className="text-gray-400">Built</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-blue-600 font-medium mb-1">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {property.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="text-gray-400 text-xs">+{property.amenities.length - 3} more</span>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span>Agent: {property.agent}</span>
                      <span>{property.daysOnMarket} days on market</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => scheduleViewing(property.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                      >
                        Schedule Tour
                      </button>
                      <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded">
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-blue-600">Saved Properties</h4>
            {savedProperties.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">❤️</div>
                <p className="text-lg">No saved properties yet</p>
                <p>Heart the properties you love to save them here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {savedProperties.map(property => (
                  <div key={property.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="text-lg font-semibold text-white">{property.address}</h5>
                        <p className="text-xl font-bold text-green-400">${property.price.toLocaleString()}</p>
                      </div>
                      <div className="text-4xl">{property.image}</div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400 mb-3">
                      <span>{property.bedrooms} bed, {property.bathrooms} bath</span>
                      <span>{property.sqft.toLocaleString()} sq ft</span>
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                      Contact Agent
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Market Analytics</h4>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-green-400">${marketData.averagePrice.toLocaleString()}</div>
                <div className="text-gray-400">Average Price</div>
                <div className="text-green-400 text-sm">{marketData.priceChange}</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🏠</div>
                <div className="text-2xl font-bold text-white">${marketData.inventory}</div>
                <div className="text-gray-400">Active Listings</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="text-2xl font-bold text-yellow-400">{marketData.daysOnMarket}</div>
                <div className="text-gray-400">Avg Days on Market</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-purple-400">{marketData.soldLastMonth}</div>
                <div className="text-gray-400">Sold This Month</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-red-400">8.2%</div>
                <div className="text-gray-400">Market Growth</div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h5 className="text-lg font-semibold text-blue-600 mb-4">Price Trends by Property Type</h5>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Houses</span>
                    <span className="text-green-400">+4.1%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Condos</span>
                    <span className="text-blue-600">+2.8%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Townhouses</span>
                    <span className="text-yellow-400">+1.9%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '52%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Real Estate Tools</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h5 className="text-xl font-semibold text-blue-600 mb-4">🏦 Mortgage Calculator</h5>
                <div className="space-y-4">
                  <input 
                    type="number" 
                    placeholder="Home Price" 
                    className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded"
                  />
                  <input 
                    type="number" 
                    placeholder="Down Payment" 
                    className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded"
                  />
                  <input 
                    type="number" 
                    placeholder="Interest Rate %" 
                    className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded"
                  />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                    Calculate Payment
                  </button>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h5 className="text-xl font-semibold text-blue-600 mb-4">📍 Neighborhood Insights</h5>
                <div className="space-y-3">
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="text-white">School Rating</span>
                      <span className="text-yellow-400">⭐ 8.5/10</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="text-white">Crime Rate</span>
                      <span className="text-green-400">Low</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="text-white">Walkability</span>
                      <span className="text-white">7.2/10</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 p-3 rounded">
                    <div className="flex justify-between">
                      <span className="text-white">Public Transit</span>
                      <span className="text-purple-400">Excellent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <h5 className="text-xl font-semibold text-blue-600 mb-4">🔍 Recent Searches</h5>
              <div className="space-y-2">
                {searchHistory.map((search, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded">
                    <span className="text-white">{search}</span>
                    <button className="text-blue-600 hover:text-blue-700">Search Again</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FoodDeliveryApp = () => {
    const [activeTab, setActiveTab] = useState('browse');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cart, setCart] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);
    const [currentLocation, setCurrentLocation] = useState('Downtown Tech District, San Francisco');
    const [orderHistory, setOrderHistory] = useState([
      { id: 1, restaurant: 'Artisan Italiano', total: 68.50, date: '2024-12-01', status: 'Delivered', items: ['Truffle Risotto', 'Burrata Caprese', 'Tiramisu'], estimatedTime: '45 min' },
      { id: 2, restaurant: 'Sakura Sushi House', total: 89.75, date: '2024-11-30', status: 'Delivered', items: ['Omakase Set', 'Miso Soup', 'Green Tea Ice Cream'], estimatedTime: '35 min' },
      { id: 3, restaurant: 'Farm & Table', total: 45.25, date: '2024-11-29', status: 'Delivered', items: ['Quinoa Power Bowl', 'Cold Pressed Juice', 'Acai Bowl'], estimatedTime: '25 min' }
    ]);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [cuisineFilter, setCuisineFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recommended');
    
    const restaurants = [
      { 
        id: 1, 
        name: 'Pizza Palace', 
        cuisine: 'Italian', 
        rating: 4.5, 
        deliveryTime: '25-35 min', 
        image: '🍕',
        deliveryFee: 2.99,
        minOrder: 15,
        promo: '20% OFF',
        menu: [
          { id: 1, name: 'Margherita Pizza', price: 18.99, description: 'Fresh tomato, mozzarella, basil', category: 'Pizza' },
          { id: 2, name: 'Pepperoni Pizza', price: 21.99, description: 'Classic pepperoni with cheese', category: 'Pizza' },
          { id: 3, name: 'Caesar Salad', price: 12.99, description: 'Romaine lettuce, parmesan, croutons', category: 'Salads' }
        ]
      },
      { 
        id: 2, 
        name: 'Burger Barn', 
        cuisine: 'American', 
        rating: 4.2, 
        deliveryTime: '20-30 min', 
        image: '🍔',
        deliveryFee: 1.99,
        minOrder: 12,
        promo: 'Free Delivery',
        menu: [
          { id: 4, name: 'Classic Burger', price: 14.99, description: 'Beef patty, lettuce, tomato, cheese', category: 'Burgers' },
          { id: 5, name: 'BBQ Bacon Burger', price: 17.99, description: 'BBQ sauce, bacon, onion rings', category: 'Burgers' },
          { id: 6, name: 'Sweet Potato Fries', price: 6.99, description: 'Crispy sweet potato fries', category: 'Sides' }
        ]
      },
      { 
        id: 3, 
        name: 'Sushi Spot', 
        cuisine: 'Japanese', 
        rating: 4.8, 
        deliveryTime: '30-40 min', 
        image: '🍣',
        deliveryFee: 3.99,
        minOrder: 20,
        promo: 'New!',
        menu: [
          { id: 7, name: 'Dragon Roll', price: 16.99, description: 'Eel, avocado, cucumber, spicy mayo', category: 'Rolls' },
          { id: 8, name: 'Salmon Sashimi', price: 19.99, description: '6 pieces fresh salmon', category: 'Sashimi' },
          { id: 9, name: 'Miso Soup', price: 4.99, description: 'Traditional soybean soup', category: 'Soup' }
        ]
      },
      { 
        id: 4, 
        name: 'Taco Fiesta', 
        cuisine: 'Mexican', 
        rating: 4.3, 
        deliveryTime: '15-25 min', 
        image: '🌮',
        deliveryFee: 2.49,
        minOrder: 10,
        promo: '$5 OFF',
        menu: [
          { id: 10, name: 'Carnitas Tacos', price: 13.99, description: '3 tacos with slow-cooked pork', category: 'Tacos' },
          { id: 11, name: 'Guacamole & Chips', price: 8.99, description: 'Fresh guacamole with tortilla chips', category: 'Appetizers' }
        ]
      }
    ];

    const addToCart = (item: any, restaurantId: number) => {
      const restaurant = restaurants.find(r => r.id === restaurantId);
      const cartItem = {
        ...item,
        restaurantName: restaurant?.name,
        quantity: 1,
        cartId: Date.now()
      };
      setCart([...cart, cartItem]);
      setOrderTotal(orderTotal + item.price);
    };

    const removeFromCart = (cartId: number, price: number) => {
      setCart(cart.filter(item => item.cartId !== cartId));
      setOrderTotal(orderTotal - price);
    };

    const placeOrder = () => {
      if (cart.length === 0) return;
      
      const newOrder = {
        id: Date.now(),
        restaurant: cart[0].restaurantName,
        total: orderTotal + 2.99, // Add delivery fee
        date: new Date().toISOString().split('T')[0],
        status: 'Preparing',
        items: cart.map(item => item.name)
      };
      
      setOrderHistory([newOrder, ...orderHistory]);
      setCart([]);
      setOrderTotal(0);
      setActiveTab('orders');
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Preparing': return 'text-yellow-400';
        case 'On the way': return 'text-blue-400';
        case 'Delivered': return 'text-green-400';
        default: return 'text-gray-400';
      }
    };

    return (
      <div className="demo-container p-4 sm:p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
        <div className="text-center mb-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            🍽️ Premium Food Delivery
          </h3>
          <p className="text-gray-300 text-sm sm:text-base">Discover San Francisco's finest restaurants</p>
        </div>
        
        {/* Enhanced Location Selector */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600/50 rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600/20 p-3 rounded-full">
                <span className="text-2xl">📍</span>
              </div>
              <div>
                <h4 className="font-semibold text-white text-lg">Delivery Location</h4>
                <p className="text-gray-300 flex items-center">
                  <span className="mr-2">🏢</span>{currentLocation}
                  <span className="ml-2 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">Available</span>
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all">
              📍 Change Location
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-800 p-1 rounded-lg overflow-x-auto">
          {['browse', 'cart', 'orders', 'favorites'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-2 sm:px-4 rounded-md capitalize transition-all relative text-sm sm:text-base whitespace-nowrap min-h-[44px] ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'browse' ? '🍔 ' : tab === 'cart' ? '🛒 ' : tab === 'orders' ? '📋 ' : '❤️ '}{tab}
              {tab === 'cart' && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'browse' && (
          <div className="space-y-6">
            {!selectedRestaurant ? (
              <>
                {/* Restaurant Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.map(restaurant => (
                    <motion.div 
                      key={restaurant.id} 
                      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedRestaurant(restaurant)}
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-32 flex items-center justify-center text-6xl">
                        {restaurant.image}
                      </div>
                      {restaurant.promo && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                          {restaurant.promo}
                        </div>
                      )}
                      
                      <div className="p-4">
                        <h4 className="text-xl font-semibold text-white mb-2">{restaurant.name}</h4>
                        <p className="text-blue-600 mb-2">{restaurant.cuisine}</p>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">⭐</span>
                            <span className="text-white">{restaurant.rating}</span>
                          </div>
                          <span className="text-gray-400">{restaurant.deliveryTime}</span>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Delivery: ${restaurant.deliveryFee}</span>
                          <span className="text-gray-400">Min: ${restaurant.minOrder}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              /* Restaurant Menu */
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-6">
                  <button 
                    onClick={() => setSelectedRestaurant(null)}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                  >
                    ← Back
                  </button>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedRestaurant.image}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedRestaurant.name}</h3>
                      <p className="text-blue-600">{selectedRestaurant.cuisine} • {selectedRestaurant.deliveryTime}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-4">
                  {selectedRestaurant.menu.map(item => (
                    <div key={item.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-lg font-semibold text-white">{item.name}</h5>
                          <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                          <span className="text-blue-600 text-xs">{item.category}</span>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-xl font-bold text-green-400 mb-2">${item.price}</div>
                          <button 
                            onClick={() => addToCart(item, selectedRestaurant.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Your Order</h4>
            
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-lg">Your cart is empty</p>
                <p>Add some delicious items to get started!</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.cartId} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-lg font-semibold text-white">{item.name}</h5>
                          <p className="text-blue-600 text-sm">{item.restaurantName}</p>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">${item.price}</div>
                          <button 
                            onClick={() => removeFromCart(item.cartId, item.price)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white">${orderTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Delivery Fee</span>
                      <span className="text-white">$2.99</span>
                    </div>
                    <div className="border-t border-gray-600 pt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-white">Total</span>
                        <span className="text-lg font-bold text-green-400">${(orderTotal + 2.99).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={placeOrder}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg"
                  >
                    Place Order
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Order History</h4>
            
            {orderHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-lg">No orders yet</p>
                <p>Place your first order to see it here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orderHistory.map(order => (
                  <div key={order.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="text-lg font-semibold text-white">{order.restaurant}</h5>
                        <p className="text-gray-400">{order.date}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {order.items.slice(0, 3).map((item, index) => (
                            <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                              {item}
                            </span>
                          ))}
                          {order.items.length > 3 && (
                            <span className="text-gray-400 text-xs">+{order.items.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">${order.total}</div>
                        <span className={`text-sm ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Reorder
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Favorite Restaurants</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              {restaurants.slice(0, 2).map(restaurant => (
                <div key={restaurant.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{restaurant.image}</span>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-white">{restaurant.name}</h5>
                      <p className="text-blue-600">{restaurant.cuisine}</p>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-yellow-400">⭐ {restaurant.rating}</span>
                        <span className="text-gray-400">• {restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const LearningApp = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [progress, setProgress] = useState({ 
      webdev: 85, 
      datascience: 72, 
      mobile: 68, 
      ai: 45,
      blockchain: 38,
      cybersecurity: 92
    });
    const [studyStreak, setStudyStreak] = useState(21);
    const [totalPoints, setTotalPoints] = useState(8750);
    const [weeklyGoal, setWeeklyGoal] = useState(10);
    const [hoursThisWeek, setHoursThisWeek] = useState(7.5);
    const [certificatesEarned, setCertificatesEarned] = useState(3);
    
    const courses = [
      { 
        id: 1, 
        title: 'Full Stack Web Development', 
        key: 'webdev',
        progress: progress.webdev, 
        lessons: 45, 
        completed: 35,
        instructor: 'Dr. Sarah Chen',
        duration: '12 weeks',
        difficulty: 'Intermediate',
        rating: 4.8,
        students: 15420,
        image: '💻',
        category: 'Programming',
        modules: [
          { id: 1, title: 'HTML & CSS Fundamentals', completed: true, duration: '2h 30m' },
          { id: 2, title: 'JavaScript Essentials', completed: true, duration: '4h 15m' },
          { id: 3, title: 'React Development', completed: false, duration: '6h 45m' },
          { id: 4, title: 'Node.js Backend', completed: false, duration: '5h 20m' }
        ]
      },
      { 
        id: 2, 
        title: 'Data Science & Analytics', 
        key: 'datascience',
        progress: progress.datascience, 
        lessons: 38, 
        completed: 17,
        instructor: 'Prof. Michael Rodriguez',
        duration: '10 weeks',
        difficulty: 'Advanced',
        rating: 4.9,
        students: 8750,
        image: '📊',
        category: 'Data Science',
        modules: [
          { id: 1, title: 'Python for Data Analysis', completed: true, duration: '3h 15m' },
          { id: 2, title: 'Statistics & Probability', completed: false, duration: '4h 30m' },
          { id: 3, title: 'Machine Learning Basics', completed: false, duration: '5h 45m' },
          { id: 4, title: 'Data Visualization', completed: false, duration: '3h 20m' }
        ]
      },
      { 
        id: 3, 
        title: 'Mobile App Development', 
        key: 'mobile',
        progress: progress.mobile, 
        lessons: 32, 
        completed: 10,
        instructor: 'Emma Thompson',
        duration: '8 weeks',
        difficulty: 'Beginner',
        rating: 4.7,
        students: 12300,
        image: '📱',
        category: 'Mobile',
        modules: [
          { id: 1, title: 'React Native Setup', completed: true, duration: '1h 45m' },
          { id: 2, title: 'Navigation & Routing', completed: false, duration: '2h 30m' },
          { id: 3, title: 'State Management', completed: false, duration: '3h 15m' },
          { id: 4, title: 'Publishing Apps', completed: false, duration: '2h 45m' }
        ]
      },
      { 
        id: 4, 
        title: 'AI & Machine Learning', 
        key: 'ai',
        progress: progress.ai, 
        lessons: 50, 
        completed: 7,
        instructor: 'Dr. Alex Kumar',
        duration: '16 weeks',
        difficulty: 'Expert',
        rating: 4.9,
        students: 5200,
        image: '🤖',
        category: 'AI/ML',
        modules: [
          { id: 1, title: 'Introduction to AI', completed: true, duration: '2h 15m' },
          { id: 2, title: 'Neural Networks', completed: false, duration: '4h 45m' },
          { id: 3, title: 'Deep Learning', completed: false, duration: '6h 30m' },
          { id: 4, title: 'Computer Vision', completed: false, duration: '5h 20m' }
        ]
      }
    ];

    const achievements = [
      { id: 1, title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', earned: true, points: 50 },
      { id: 2, title: 'Week Warrior', description: 'Study for 7 consecutive days', icon: '🔥', earned: true, points: 200 },
      { id: 3, title: 'Course Crusher', description: 'Complete your first course', icon: '🏆', earned: false, points: 500 },
      { id: 4, title: 'Speed Learner', description: 'Complete 10 lessons in one day', icon: '⚡', earned: true, points: 300 },
      { id: 5, title: 'Knowledge Seeker', description: 'Enroll in 5 different courses', icon: '📚', earned: false, points: 400 }
    ];

    const leaderboard = [
      { rank: 1, name: 'Alex Johnson', points: 3850, avatar: '👨‍💻' },
      { rank: 2, name: 'Sarah Kim', points: 3420, avatar: '👩‍💻' },
      { rank: 3, name: 'You', points: totalPoints, avatar: '🧑‍🎓' },
      { rank: 4, name: 'Mike Chen', points: 2180, avatar: '👨‍🔬' },
      { rank: 5, name: 'Emma Davis', points: 1950, avatar: '👩‍🎨' }
    ];

    const updateProgress = (courseKey: string) => {
      const newProgress = Math.min(100, progress[courseKey] + 12);
      setProgress({ ...progress, [courseKey]: newProgress });
      setTotalPoints(totalPoints + 25);
    };

    const enrollInCourse = (courseId: number) => {
      alert(`Successfully enrolled in course! You can now access all materials and start learning.`);
    };

    return (
      <div className="p-6 max-w-7xl mx-auto bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white rounded-xl shadow-2xl border border-gray-700/50">
        <div className="text-center mb-8">
          <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-3">
            🧠 AI Learning Platform
          </h3>
          <p className="text-gray-300 text-lg">Personalized education powered by artificial intelligence</p>
        </div>
        
        {/* Enhanced User Stats Dashboard */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-600/10 rounded-xl border border-blue-600/20">
              <div className="text-3xl mb-2">💎</div>
              <div className="text-2xl font-bold text-blue-400">{totalPoints.toLocaleString()}</div>
              <div className="text-gray-300 text-sm font-medium">XP Points</div>
            </div>
            <div className="text-center p-4 bg-green-600/10 rounded-xl border border-green-600/20">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-green-400">{studyStreak}</div>
              <div className="text-gray-300 text-sm font-medium">Day Streak</div>
            </div>
            <div className="text-center p-4 bg-yellow-600/10 rounded-xl border border-yellow-600/20">
              <div className="text-3xl mb-2">📚</div>
              <div className="text-2xl font-bold text-yellow-400">{courses.filter(c => c.progress > 0).length}</div>
              <div className="text-gray-300 text-sm font-medium">Active Courses</div>
            </div>
            <div className="text-center p-4 bg-purple-600/10 rounded-xl border border-purple-600/20">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-purple-400">{achievements.filter(a => a.earned).length}</div>
              <div className="text-gray-300 text-sm font-medium">Achievements</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-300 font-medium">Weekly Learning Goal</span>
              <span className="text-blue-400 font-bold">{hoursThisWeek}/{weeklyGoal} hours</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{width: `${Math.min((hoursThisWeek / weeklyGoal) * 100, 100)}%`}}
              ></div>
            </div>
            <div className="mt-2 text-sm text-gray-400 text-center">
              {hoursThisWeek >= weeklyGoal ? "🎉 Goal achieved this week!" : `${(weeklyGoal - hoursThisWeek).toFixed(1)} hours to reach your weekly goal`}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-800 p-1 rounded-lg">
          {['dashboard', 'courses', 'progress', 'achievements', 'leaderboard'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Courses */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-xl font-semibold mb-4 text-blue-400">Continue Learning</h4>
              {courses.filter(c => c.progress > 0 && c.progress < 100).slice(0, 3).map(course => (
                <div key={course.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-3xl">{course.image}</span>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold text-white">{course.title}</h5>
                      <p className="text-blue-600 text-sm">{course.instructor}</p>
                      <p className="text-gray-400 text-sm mb-4">{course.completed}/{course.lessons} lessons completed</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateProgress(course.key)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Continue Lesson
                  </button>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Achievements */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-blue-600 mb-3">Recent Achievements</h5>
                <div className="space-y-3">
                  {achievements.filter(a => a.earned).slice(0, 3).map(achievement => (
                    <div key={achievement.id} className="flex items-center space-x-3 bg-gray-700 p-3 rounded">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{achievement.title}</p>
                        <p className="text-gray-400 text-xs">{achievement.description}</p>
                      </div>
                      <span className="text-yellow-400 text-sm">+{achievement.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Stats */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <h5 className="text-lg font-semibold text-blue-600 mb-3">This Week</h5>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Hours Studied</span>
                    <span className="text-white">12.5h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Lessons Completed</span>
                    <span className="text-white">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Points Earned</span>
                    <span className="text-yellow-400">+350</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            {!selectedCourse ? (
              <>
                <h4 className="text-2xl font-bold text-blue-600">All Courses</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <motion.div 
                      key={course.id} 
                      className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedCourse(course)}
                    >
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 h-32 flex items-center justify-center text-6xl">
                        {course.image}
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            course.difficulty === 'Beginner' ? 'bg-green-600' :
                            course.difficulty === 'Intermediate' ? 'bg-yellow-600' :
                            course.difficulty === 'Advanced' ? 'bg-orange-600' : 'bg-red-600'
                          } text-white`}>
                            {course.difficulty}
                          </span>
                          <span className="text-blue-600 text-xs">{course.category}</span>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-white mb-2">{course.title}</h4>
                        <p className="text-blue-600 text-sm mb-2">{course.instructor}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                          <span>⭐ {course.rating}</span>
                          <span>{course.students.toLocaleString()} students</span>
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-gray-400 text-sm">{course.duration}</span>
                          <span className="text-gray-400 text-sm">{course.lessons} lessons</span>
                        </div>
                        
                        {course.progress > 0 ? (
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Progress</span>
                              <span className="text-white">{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : null}
                        
                        <button 
                          className={`w-full py-2 rounded ${
                            course.progress > 0 
                              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                              : 'bg-green-600 hover:bg-green-700 text-white'
                          }`}
                        >
                          {course.progress > 0 ? 'Continue' : 'Enroll Now'}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              /* Course Detail View */
              <div className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded"
                  >
                    ← Back to Courses
                  </button>
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{selectedCourse.image}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedCourse.title}</h3>
                      <p className="text-blue-600">{selectedCourse.instructor} • {selectedCourse.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="text-xl font-semibold mb-4 text-blue-400">Course Modules</h4>
                    <div className="space-y-3">
                      {selectedCourse.modules.map(module => (
                        <div key={module.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                                module.completed ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-400'
                              }`}>
                                {module.completed ? '✓' : module.id}
                              </div>
                              <div>
                                <h5 className="text-white font-medium">{module.title}</h5>
                                <p className="text-gray-400 text-sm">{module.duration}</p>
                              </div>
                            </div>
                            <button className={`px-4 py-2 rounded text-sm ${
                              module.completed 
                                ? 'bg-gray-600 text-gray-300' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}>
                              {module.completed ? 'Review' : 'Start'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <h5 className="text-lg font-semibold text-blue-600 mb-3">Course Info</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Difficulty</span>
                          <span className="text-white">{selectedCourse.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white">{selectedCourse.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Lessons</span>
                          <span className="text-white">{selectedCourse.lessons}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rating</span>
                          <span className="text-white">⭐ {selectedCourse.rating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Students</span>
                          <span className="text-white">{selectedCourse.students.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedCourse.progress === 0 && (
                      <button 
                        onClick={() => enrollInCourse(selectedCourse.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-lg"
                      >
                        Enroll in Course
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Learning Progress</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              {courses.filter(c => c.progress > 0).map(course => (
                <div key={course.id} className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                      <span className="text-3xl">{course.image}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-lg font-semibold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{course.title}</h5>
                      <p className="text-blue-400 text-sm font-medium">{course.instructor}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-gray-300 text-sm">{course.rating} • {course.students.toLocaleString()} students</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300 font-medium">Course Progress</span>
                      <span className="text-white font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-600/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-700 relative"
                        style={{ width: `${course.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      {course.progress === 100 ? "🎉 Course completed!" : `${course.lessons - course.completed} lessons remaining`}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-600/10 border border-green-600/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-400">{course.completed}</div>
                      <div className="text-gray-300 text-sm font-medium">Lessons Done</div>
                    </div>
                    <div className="bg-yellow-600/10 border border-yellow-600/20 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-400">{course.lessons - course.completed}</div>
                      <div className="text-gray-300 text-sm font-medium">To Complete</div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Achievements</h4>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(achievement => (
                <div key={achievement.id} className={`rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/20' 
                    : 'bg-gray-800/60 border border-gray-600/50 opacity-70 hover:opacity-90'
                }`}>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                      achievement.earned 
                        ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-yellow-400/30' 
                        : 'bg-gray-700/50 border border-gray-600/50'
                    }`}>
                      <span>{achievement.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-bold text-lg mb-2 ${
                        achievement.earned 
                          ? 'bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent' 
                          : 'text-gray-400'
                      }`}>
                        {achievement.title}
                      </h5>
                      <p className={`text-sm leading-relaxed ${
                        achievement.earned ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-600/30">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        achievement.earned 
                          ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
                          : 'bg-gray-700/50 text-gray-500 border border-gray-600/30'
                      }`}>
                        {achievement.earned ? '✓ Earned' : '🔒 Locked'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">💎</span>
                      <span className="text-yellow-400 font-bold">{achievement.points}</span>
                    </div>
                  </div>
                  
                  {achievement.earned && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-blue-600">Leaderboard</h4>
            
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-700/90 backdrop-blur-sm border border-gray-600/50 rounded-xl overflow-hidden shadow-lg">
              {leaderboard.map(user => (
                <div key={user.rank} className={`p-6 border-b border-gray-600/30 last:border-b-0 transition-all duration-300 hover:bg-gray-700/30 ${
                  user.name === 'You' ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-l-blue-500' : ''
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                      user.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-black shadow-yellow-400/30' :
                      user.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-black shadow-gray-400/30' :
                      user.rank === 3 ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-orange-500/30' :
                      'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-gray-600/30'
                    }`}>
                      {user.rank <= 3 ? (
                        <span>{user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}</span>
                      ) : (
                        user.rank
                      )}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                      <span className="text-2xl">{user.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-bold text-lg ${
                        user.name === 'You' 
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                          : 'text-white'
                      }`}>
                        {user.name} {user.name === 'You' && '👤'}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-300 text-sm">Level {Math.floor(user.points / 1000) + 1}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 text-sm">{Math.floor(Math.random() * 50) + 10} courses</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <span className="text-yellow-400">💎</span>
                        <div className="text-xl font-bold text-yellow-400">{user.points.toLocaleString()}</div>
                      </div>
                      <div className="text-gray-400 text-sm">XP Points</div>
                      {user.rank <= 3 && (
                        <div className="mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.rank === 1 ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                            user.rank === 2 ? 'bg-gray-600/20 text-gray-300 border border-gray-600/30' :
                            'bg-orange-600/20 text-orange-400 border border-orange-600/30'
                          }`}>
                            Top {user.rank}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMiniApp = (appType: string) => {
    switch(appType) {
      case 'ecommerce': return <ECommerceApp />;
      case 'banking': return <BankingApp />;
      case 'healthcare': return <HealthcareApp />;
      case 'realestate': return <RealEstateApp />;
      case 'food': return <FoodDeliveryApp />;
      case 'learning': return <LearningApp />;
      default: return <div>App not found</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">Our <span className="text-blue-600">Portfolio</span></h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto px-4">
            Explore our recent projects and see how we've helped businesses achieve their digital goals.
          </p>
        </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full border border-gray-300 text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden hover:scale-[1.04] hover:-translate-y-3 transition-all duration-300 cursor-pointer flex flex-col h-full min-h-[480px]"
            style={{
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(147, 197, 253, 0.1), 0 0 25px rgba(59, 130, 246, 0.08)"
            }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              type: "spring",
              bounce: 0.3
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            {/* Enhanced Project Image with Animations */}
            <div className={`h-40 sm:h-48 ${project.image} flex items-center justify-center transition-all duration-300 hover:brightness-110 relative overflow-hidden group`}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <motion.div 
                  className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
                <motion.div 
                  className="absolute bottom-6 right-6 w-4 h-4 bg-white rounded-full"
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
                <motion.div 
                  className="absolute top-1/2 right-8 w-2 h-2 bg-white rounded-full"
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.4
                  }}
                />
              </div>
              <div className="text-white text-center relative z-10">
                <motion.div 
                  className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-2 opacity-80 flex items-center justify-center text-4xl sm:text-5xl"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {project.appType === 'ecommerce' ? '🛒' : 
                   project.appType === 'banking' ? '🏦' : 
                   project.appType === 'healthcare' ? '🏥' : 
                   project.appType === 'realestate' ? '🏠' : 
                   project.appType === 'food' ? '🍕' : 
                   project.appType === 'learning' ? '🎓' : '💻'}
                </motion.div>
                <p className="text-xs sm:text-sm opacity-80 font-medium">Interactive Demo</p>
              </div>
              
              {/* Hover Overlay with Demo Indicator */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <motion.div 
                  className="text-white text-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-2xl">
                      {project.appType === 'ecommerce' ? '�️' : 
                       project.appType === 'banking' ? '💳' : 
                       project.appType === 'healthcare' ? '🩺' : 
                       project.appType === 'realestate' ? '🔑' : 
                       project.appType === 'food' ? '🚚' : 
                       project.appType === 'learning' ? '📚' : '�🚀'}
                    </span>
                    <span className="font-semibold">Launch Demo</span>
                  </div>
                  <p className="text-sm opacity-90">Click to explore features</p>
                </motion.div>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-2">{project.title}</h3>
              <p className="text-sm sm:text-base text-black mb-4">{project.description}</p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs bg-gray-100 text-black px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto">
                <motion.button
                  onClick={() => {
                    window.open(`/portfolio/demo/${index}`, '_blank', 'noopener,noreferrer');
                  }}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold text-base transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  Launch Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Section */}
      <section className="bg-gray-50 rounded-lg p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">Project Statistics</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-black mb-2">100+</div>
            <div className="text-black">Projects Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-black mb-2">50+</div>
            <div className="text-black">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-black mb-2">98%</div>
            <div className="text-black">Success Rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-black mb-2">5+</div>
            <div className="text-black">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">Technologies We Use</h2>
        <div className="grid grid-cols-3 grid-rows-2 gap-8 max-w-2xl mx-auto">
          {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'EmailJS'].map((tech) => {
            const urls: Record<string,string> = {
              "Next.js": "https://nextjs.org",
              React: "https://reactjs.org",
              TypeScript: "https://www.typescriptlang.org",
              "Tailwind CSS": "https://tailwindcss.com",
              "Framer Motion": "https://www.framer.com/motion/",
              EmailJS: "https://www.emailjs.com",
            };
            const href = urls[tech] || '#';

            return (
              <div key={tech} className="text-center p-4 bg-white/60 backdrop-blur-md rounded-xl border border-blue-200/30 flex items-center justify-center" style={{
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.1)"
              }}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-black hover:underline">
                  {tech}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-blue-600 text-white rounded-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Like What You See?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Project
          </Link>
          <Link 
            href="/services" 
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Our Services
          </Link>
        </div>
      </section>
      </div>

      {/* Enhanced Modal for Mini Apps */}
      <AnimatePresence>
        {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4"
              style={{ pointerEvents: 'auto' }}
              onClick={() => setSelectedProject(null)}
            >
              {/* Modal background overlay */}
              <motion.div
                className="absolute inset-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              />
              {/* Modal content */}
              <motion.div
                className="relative z-10 bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto flex flex-col pointer-events-auto"
                style={{ width: '100%', overflow: 'hidden', maxHeight: '95vh' }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(95vh - 1rem)' }}>
                  {/* Modal header */}
                  <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                        🚀 {projects[selectedProject].title}
                      </h2>
                      <p className="text-blue-100 text-sm opacity-90 hidden sm:block">
                        {projects[selectedProject].description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-auto">
                      <motion.button
                        onClick={() => setSelectedProject(null)}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all duration-200"
                      >
                        ×
                      </motion.button>
                    </div>
                  </div>
                  {/* Demo Introduction Banner */}
                  <motion.div
                    className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-b border-gray-200 p-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-lg">⚡</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span>Live Demo</span>
                        </div>
                        <span className="text-gray-500 text-xs">Click around to explore!</span>
                      </div>
                    </div>
                  </motion.div>
                  {/* Demo Content */}
                  <div className="overflow-auto max-h-[calc(95vh-140px)] bg-gray-50">
                    <motion.div 
                      className="p-4 sm:p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {renderMiniApp(projects[selectedProject].appType)}
                    </motion.div>
                  </div>
                  {/* Enhanced Footer */}
                  <motion.div 
                    className="sticky bottom-0 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4 border-t border-gray-300 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {/* Technologies Used */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-sm font-medium text-gray-300">Built with:</span>
                      {projects[selectedProject].technologies.map((tech, index) => (
                        <motion.span 
                          key={index} 
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                    {/* Demo Description */}
                    <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                      <span role="img" aria-label="target">🎯</span> <strong>Interactive Demo:</strong> This is a fully functional prototype showcasing real-world features of the {projects[selectedProject].title.toLowerCase()}.
                      All interactions, animations, and data management work exactly as they would in production.
                    </p>
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Demo Active</span>
                        </div>
                        <span>•</span>
                        <span>React + TypeScript + Tailwind CSS</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-gray-300 hover:text-white font-medium transition-colors duration-200 text-sm"
                        >
                          📱 View on Mobile
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-gray-300 hover:text-white font-medium transition-colors duration-200 text-sm"
                        >
                          💻 View Source
                        </motion.button>
                        <motion.button
                          onClick={() => setSelectedProject(null)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg"
                        >
                          ✨ Close Demo
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
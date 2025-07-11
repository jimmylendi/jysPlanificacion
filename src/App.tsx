import React, { useState } from 'react';
import { PlusCircle, Target, Calculator, TrendingUp, DollarSign, PiggyBank, CreditCard, BookOpen } from 'lucide-react';
import Dashboard from './components/Dashboard';
import BudgetManager from './components/BudgetManager';
import DebtCalculator from './components/DebtCalculator';
import SavingsGoals from './components/SavingsGoals';
import InvestmentGuide from './components/InvestmentGuide';
import Navigation from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'budget':
        return <BudgetManager />;
      case 'debts':
        return <DebtCalculator />;
      case 'savings':
        return <SavingsGoals />;
      case 'investments':
        return <InvestmentGuide />;
      case 'income':
        return <IncomeManager />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Planifesto
            </span>
          </h1>
          <p className="text-gray-600 text-lg">Tu sistema financiero completo en un solo lugar</p>
        </header>

        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="mt-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
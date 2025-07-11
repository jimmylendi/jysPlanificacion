import React from 'react';
import { Home, Calculator, CreditCard, Target, TrendingUp } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'income', label: 'Ingresos', icon: Users },
    { id: 'budget', label: 'Presupuesto', icon: Calculator },
    { id: 'debts', label: 'Deudas', icon: CreditCard },
    { id: 'savings', label: 'Ahorros', icon: Target },
    { id: 'investments', label: 'Inversiones', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2">
      <div className="flex flex-wrap justify-center gap-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon size={18} />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
import React, { useState } from 'react';
import { PlusCircle, Edit3, Star, Users, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Income } from '../types';
import IncomeModal from './modals/IncomeModal';

const IncomeManager: React.FC = () => {
  const [incomes, setIncomes] = useLocalStorage<Income[]>('incomes', [
    { 
      id: '1', 
      source: 'Nómina - María', 
      amount: 2500, 
      frequency: 'monthly', 
      person: 'María',
      type: 'salary',
      color: 'from-emerald-500 to-emerald-600',
      nextPayment: '2024-01-31'
    },
    { 
      id: '2', 
      source: 'Nómina - Carlos', 
      amount: 3200, 
      frequency: 'monthly', 
      person: 'Carlos',
      type: 'salary',
      color: 'from-blue-500 to-blue-600',
      nextPayment: '2024-01-31'
    },
    { 
      id: '3', 
      source: 'Freelance - María', 
      amount: 800, 
      frequency: 'monthly', 
      person: 'María',
      type: 'freelance',
      color: 'from-purple-500 to-purple-600',
      nextPayment: '2024-02-15'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncome, setEditingIncome] = useState<Income | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleCreateIncome = (incomeData: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newIncome: Income = {
      ...incomeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setIncomes([...incomes, newIncome]);
  };

  const handleUpdateIncome = (id: string, incomeData: Partial<Income>) => {
    setIncomes(incomes.map(income => 
      income.id === id 
        ? { ...income, ...incomeData, updatedAt: new Date().toISOString() }
        : income
    ));
  };

  const handleDeleteIncome = (id: string) => {
    setIncomes(incomes.filter(income => income.id !== id));
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingIncome(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (income: Income) => {
    setModalMode('edit');
    setEditingIncome(income);
    setIsModalOpen(true);
  };

  const calculateMonthlyTotal = () => {
    return incomes.reduce((total, income) => {
      switch (income.frequency) {
        case 'weekly':
          return total + (income.amount * 4.33);
        case 'biweekly':
          return total + (income.amount * 2.17);
        case 'monthly':
          return total + income.amount;
        case 'yearly':
          return total + (income.amount / 12);
        default:
          return total + income.amount;
      }
    }, 0);
  };

  const getIncomesByPerson = () => {
    const grouped = incomes.reduce((acc, income) => {
      if (!acc[income.person]) {
        acc[income.person] = [];
      }
      acc[income.person].push(income);
      return acc;
    }, {} as Record<string, Income[]>);
    return grouped;
  };

  const calculatePersonTotal = (personIncomes: Income[]) => {
    return personIncomes.reduce((total, income) => {
      switch (income.frequency) {
        case 'weekly':
          return total + (income.amount * 4.33);
        case 'biweekly':
          return total + (income.amount * 2.17);
        case 'monthly':
          return total + income.amount;
        case 'yearly':
          return total + (income.amount / 12);
        default:
          return total + income.amount;
      }
    }, 0);
  };

  const monthlyTotal = calculateMonthlyTotal();
  const incomesByPerson = getIncomesByPerson();

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      weekly: 'Semanal',
      biweekly: 'Quincenal',
      monthly: 'Mensual',
      yearly: 'Anual'
    };
    return labels[frequency as keyof typeof labels] || frequency;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      salary: '💼',
      freelance: '💻',
      business: '🏢',
      investment: '📈',
      rental: '🏠',
      other: '💰'
    };
    return icons[type as keyof typeof icons] || '💰';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Star className="text-yellow-500 mr-2" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Ingresos en Pareja</h2>
        </div>
        <p className="text-gray-600 text-lg">Organiza todos los ingresos familiares en un solo lugar</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <DollarSign className="text-emerald-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Ingresos Mensuales Totales</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">${monthlyTotal.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Users className="text-blue-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Fuentes de Ingreso</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{incomes.length}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-purple-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Ingresos Anuales</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">${(monthlyTotal * 12).toLocaleString()}</p>
        </div>
      </div>

      {/* Add New Income Button */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Gestionar Ingresos</h3>
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2 shadow-md"
          >
            <PlusCircle size={20} />
            Nuevo Ingreso
          </button>
        </div>
      </div>

      {/* Income by Person */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Ingresos por Persona</h3>
        {Object.entries(incomesByPerson).map(([person, personIncomes]) => {
          const personTotal = calculatePersonTotal(personIncomes);
          const percentage = (personTotal / monthlyTotal) * 100;
          
          return (
            <div key={person} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {person.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800">{person}</h4>
                    <p className="text-gray-600">{personIncomes.length} fuente(s) de ingreso</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-emerald-600">${personTotal.toLocaleString()}</p>
                  <p className="text-gray-600">{percentage.toFixed(1)}% del total</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <div className="space-y-3">
                {personIncomes.map((income) => (
                  <div key={income.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getTypeIcon(income.type)}</span>
                      <div>
                        <p className="font-medium text-gray-800">{income.source}</p>
                        <p className="text-sm text-gray-600">{getFrequencyLabel(income.frequency)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold text-gray-800">${income.amount.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Próximo: {new Date(income.nextPayment).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => openEditModal(income)}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        title="Editar ingreso"
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* All Incomes List */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Todos los Ingresos</h3>
        <div className="space-y-3">
          {incomes.map((income) => (
            <div key={income.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{getTypeIcon(income.type)}</span>
                <div>
                  <h4 className="font-semibold text-gray-800">{income.source}</h4>
                  <p className="text-sm text-gray-600">{income.person} • {getFrequencyLabel(income.frequency)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-gray-800">${income.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    <Calendar size={12} className="inline mr-1" />
                    {new Date(income.nextPayment).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => openEditModal(income)}
                  className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                  title="Editar ingreso"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <IncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateIncome}
        onUpdate={handleUpdateIncome}
        onDelete={handleDeleteIncome}
        income={editingIncome}
        mode={modalMode}
      />
    </div>
  );
};

export default IncomeManager;
import React, { useState } from 'react';
import { PlusCircle, Edit3, Star } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BudgetItem } from '../types';
import BudgetModal from './modals/BudgetModal';


const BudgetManager: React.FC = () => {
  const [budgetItems, setBudgetItems] = useLocalStorage<BudgetItem[]>('budgetItems', [
    { id: '1', category: 'Vivienda', allocated: 1000, spent: 950, color: 'from-blue-500 to-blue-600' },
    { id: '2', category: 'Alimentación', allocated: 400, spent: 320, color: 'from-green-500 to-green-600' },
    { id: '3', category: 'Transporte', allocated: 200, spent: 180, color: 'from-yellow-500 to-yellow-600' },
    { id: '4', category: 'Entretenimiento', allocated: 150, spent: 120, color: 'from-pink-500 to-pink-600' },
    { id: '5', category: 'Ahorros', allocated: 300, spent: 300, color: 'from-emerald-500 to-emerald-600' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetItem | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);

  const handleCreateBudget = (budgetData: Omit<BudgetItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBudget: BudgetItem = {
      ...budgetData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setBudgetItems([...budgetItems, newBudget]);
  };

  const handleUpdateBudget = (id: string, budgetData: Partial<BudgetItem>) => {
    setBudgetItems(budgetItems.map(item => 
      item.id === id 
        ? { ...item, ...budgetData, updatedAt: new Date().toISOString() }
        : item
    ));
  };

  const handleDeleteBudget = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingBudget(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (budget: BudgetItem) => {
    setModalMode('edit');
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  const updateSpent = (id: string, spent: number) => {
    handleUpdateBudget(id, { spent });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Star className="text-yellow-500 mr-2" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Presupuesto Mensual Organizado</h2>
        </div>
        <p className="text-gray-600 text-lg">Controla cada peso que entra y sale</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Presupuestado</h3>
          <p className="text-3xl font-bold text-emerald-600">${totalAllocated.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Gastado</h3>
          <p className="text-3xl font-bold text-pink-600">${totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Disponible</h3>
          <p className="text-3xl font-bold text-teal-600">${(totalAllocated - totalSpent).toLocaleString()}</p>
        </div>
      </div>

      {/* Add New Category Button */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Gestionar Categorías</h3>
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2 shadow-md"
          >
            <PlusCircle size={20} />
            Nueva Categoría
          </button>
        </div>
      </div>

      {/* Budget Items */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Categorías de Presupuesto</h3>
        {budgetItems.map((item) => {
          const percentage = (item.spent / item.allocated) * 100;
          const isOverBudget = item.spent > item.allocated;
          
          return (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{item.category}</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    title="Editar categoría"
                  >
                    <Edit3 size={16} />
                  </button>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    isOverBudget ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {isOverBudget ? 'Excedido' : 'En presupuesto'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Gastado: ${item.spent.toLocaleString()}</span>
                <span className="text-gray-600">Presupuesto: ${item.allocated.toLocaleString()}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className={`h-4 rounded-full bg-gradient-to-r ${
                    isOverBudget ? 'from-red-500 to-red-600' : item.color
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={item.spent}
                  onChange={(e) => updateSpent(item.id, parseFloat(e.target.value) || 0)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-600">
                  {percentage.toFixed(1)}% del presupuesto
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateBudget}
        onUpdate={handleUpdateBudget}
        onDelete={handleDeleteBudget}
        budget={editingBudget}
        mode={modalMode}
      />
    </div>
  );
};

export default BudgetManager;
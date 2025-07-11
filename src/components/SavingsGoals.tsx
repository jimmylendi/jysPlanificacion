import React, { useState } from 'react';
import { Target, Star, PlusCircle, Trophy, TrendingUp, Edit3 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SavingsGoal } from '../types';
import SavingsGoalModal from './modals/SavingsGoalModal';

const SavingsGoals: React.FC = () => {
  const [goals, setGoals] = useLocalStorage<SavingsGoal[]>('savingsGoals', [
    { id: '1', name: 'Fondo de Emergencia', targetAmount: 10000, currentAmount: 3500, deadline: '2024-12-31', color: 'from-blue-500 to-blue-600', icon: '🛡️' },
    { id: '2', name: 'Viaje a Europa', targetAmount: 5000, currentAmount: 2200, deadline: '2024-08-15', color: 'from-purple-500 to-purple-600', icon: '✈️' },
    { id: '3', name: 'Nuevo Laptop', targetAmount: 1500, currentAmount: 900, deadline: '2024-06-30', color: 'from-green-500 to-green-600', icon: '💻' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');

  const handleCreateGoal = (goalData: Omit<SavingsGoal, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newGoal: SavingsGoal = {
      ...goalData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setGoals([...goals, newGoal]);
  };

  const handleUpdateGoal = (id: string, goalData: Partial<SavingsGoal>) => {
    setGoals(goals.map(goal => 
      goal.id === id 
        ? { ...goal, ...goalData, updatedAt: new Date().toISOString() }
        : goal
    ));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const openCreateModal = () => {
    setModalMode('create');
    setEditingGoal(undefined);
    setIsModalOpen(true);
  };

  const openEditModal = (goal: SavingsGoal) => {
    setModalMode('edit');
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const updateGoalAmount = (id: string, amount: number) => {
    handleUpdateGoal(id, { currentAmount: amount });
  };

  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateMonthlySavings = (goal: SavingsGoal) => {
    const daysLeft = calculateDaysLeft(goal.deadline);
    const monthsLeft = Math.max(daysLeft / 30, 1);
    const remaining = goal.targetAmount - goal.currentAmount;
    return Math.ceil(remaining / monthsLeft);
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTargets = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Star className="text-yellow-500 mr-2" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Metas de Ahorro Visualizadas</h2>
        </div>
        <p className="text-gray-600 text-lg">Desde ese viaje soñado hasta tu primer apartamento</p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Target className="text-emerald-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Total Ahorrado</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">${totalSaved.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <TrendingUp className="text-purple-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Metas Totales</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">${totalTargets.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Trophy className="text-orange-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Progreso General</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">{Math.round((totalSaved / totalTargets) * 100)}%</p>
        </div>
      </div>

      {/* Add New Goal Button */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">Gestionar Metas</h3>
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all flex items-center gap-2 shadow-md"
          >
            <PlusCircle size={20} />
            Nueva Meta
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800">Tus Metas de Ahorro</h3>
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const daysLeft = calculateDaysLeft(goal.deadline);
          const monthlySavings = calculateMonthlySavings(goal);
          const isOverdue = daysLeft < 0;
          const isCompleted = progress >= 100;
          
          return (
            <div key={goal.id} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <h4 className="text-xl font-semibold text-gray-800">{goal.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(goal)}
                    className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                    title="Editar meta"
                  >
                    <Edit3 size={16} />
                  </button>
                  {isCompleted && (
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                      ¡Completado! 🎉
                    </span>
                  )}
                  {isOverdue && !isCompleted && (
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      Vencido
                    </span>
                  )}
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Progreso</p>
                  <p className="text-xl font-bold text-gray-800">{progress.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ahorrado</p>
                  <p className="text-xl font-bold text-gray-800">${goal.currentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Meta</p>
                  <p className="text-xl font-bold text-gray-800">${goal.targetAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Días restantes</p>
                  <p className={`text-xl font-bold ${isOverdue ? 'text-red-600' : 'text-gray-800'}`}>
                    {isOverdue ? 'Vencido' : daysLeft}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full bg-gradient-to-r ${
                      isCompleted ? 'from-green-500 to-green-600' : goal.color
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={goal.currentAmount}
                    onChange={(e) => updateGoalAmount(goal.id, parseFloat(e.target.value) || 0)}
                    className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <span className="text-gray-600">de ${goal.targetAmount.toLocaleString()}</span>
                </div>
                {!isCompleted && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ahorra mensual:</p>
                    <p className="text-lg font-bold text-emerald-600">${monthlySavings.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <SavingsGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateGoal}
        onUpdate={handleUpdateGoal}
        onDelete={handleDeleteGoal}
        goal={editingGoal}
        mode={modalMode}
      />
    </div>
  );
};

export default SavingsGoals;
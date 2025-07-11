import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { BudgetItem } from '../../types';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (budget: Omit<BudgetItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, budget: Partial<BudgetItem>) => void;
  onDelete: (id: string) => void;
  budget?: BudgetItem;
  mode: 'create' | 'edit';
}

const BudgetModal: React.FC<BudgetModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
  budget,
  mode
}) => {
  const [formData, setFormData] = useState({
    category: '',
    allocated: 0,
    spent: 0,
    color: 'from-blue-500 to-blue-600'
  });

  const colorOptions = [
    'from-blue-500 to-blue-600',
    'from-green-500 to-green-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-yellow-500 to-yellow-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600'
  ];

  useEffect(() => {
    if (budget && mode === 'edit') {
      setFormData({
        category: budget.category,
        allocated: budget.allocated,
        spent: budget.spent,
        color: budget.color
      });
    } else {
      setFormData({
        category: '',
        allocated: 0,
        spent: 0,
        color: 'from-blue-500 to-blue-600'
      });
    }
  }, [budget, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || formData.allocated <= 0) return;

    if (mode === 'create') {
      onSave(formData);
    } else if (budget) {
      onUpdate(budget.id, formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (budget && window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      onDelete(budget.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'create' ? 'Nueva Categoría' : 'Editar Categoría'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la Categoría
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: Alimentación, Transporte..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto Presupuestado
            </label>
            <input
              type="number"
              value={formData.allocated}
              onChange={(e) => setFormData({ ...formData, allocated: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="0"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monto Gastado
            </label>
            <input
              type="number"
              value={formData.spent}
              onChange={(e) => setFormData({ ...formData, spent: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`h-10 rounded-lg bg-gradient-to-r ${color} ${
                    formData.color === color ? 'ring-2 ring-gray-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {mode === 'edit' && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all"
            >
              <Save size={18} />
              {mode === 'create' ? 'Crear' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetModal;
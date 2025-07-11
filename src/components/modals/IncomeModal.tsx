import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { Income } from '../../types';

interface IncomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (income: Omit<Income, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, income: Partial<Income>) => void;
  onDelete: (id: string) => void;
  income?: Income;
  mode: 'create' | 'edit';
}

const IncomeModal: React.FC<IncomeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onUpdate,
  onDelete,
  income,
  mode
}) => {
  const [formData, setFormData] = useState({
    source: '',
    amount: 0,
    frequency: 'monthly',
    person: '',
    type: 'salary',
    color: 'from-emerald-500 to-emerald-600',
    nextPayment: ''
  });

  const colorOptions = [
    'from-emerald-500 to-emerald-600',
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600',
    'from-yellow-500 to-yellow-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600'
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Semanal' },
    { value: 'biweekly', label: 'Quincenal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'yearly', label: 'Anual' }
  ];

  const typeOptions = [
    { value: 'salary', label: 'Nómina', icon: '💼' },
    { value: 'freelance', label: 'Freelance', icon: '💻' },
    { value: 'business', label: 'Negocio', icon: '🏢' },
    { value: 'investment', label: 'Inversiones', icon: '📈' },
    { value: 'rental', label: 'Alquiler', icon: '🏠' },
    { value: 'other', label: 'Otro', icon: '💰' }
  ];

  useEffect(() => {
    if (income && mode === 'edit') {
      setFormData({
        source: income.source,
        amount: income.amount,
        frequency: income.frequency,
        person: income.person,
        type: income.type,
        color: income.color,
        nextPayment: income.nextPayment
      });
    } else {
      setFormData({
        source: '',
        amount: 0,
        frequency: 'monthly',
        person: '',
        type: 'salary',
        color: 'from-emerald-500 to-emerald-600',
        nextPayment: ''
      });
    }
  }, [income, mode, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.source || formData.amount <= 0 || !formData.person || !formData.nextPayment) return;

    if (mode === 'create') {
      onSave(formData);
    } else if (income) {
      onUpdate(income.id, formData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (income && window.confirm('¿Estás seguro de que quieres eliminar este ingreso?')) {
      onDelete(income.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'create' ? 'Nuevo Ingreso' : 'Editar Ingreso'}
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
              Fuente de Ingreso
            </label>
            <input
              type="text"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: Nómina - María, Freelance..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monto
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Frecuencia
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Persona
            </label>
            <input
              type="text"
              value={formData.person}
              onChange={(e) => setFormData({ ...formData, person: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Ej: María, Carlos..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Ingreso
            </label>
            <div className="grid grid-cols-2 gap-2">
              {typeOptions.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: type.value })}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    formData.type === type.value
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span>{type.icon}</span>
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Próximo Pago
            </label>
            <input
              type="date"
              value={formData.nextPayment}
              onChange={(e) => setFormData({ ...formData, nextPayment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
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

export default IncomeModal;
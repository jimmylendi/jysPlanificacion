import React, { useState } from 'react';
import { Calculator, CreditCard, Star, TrendingDown } from 'lucide-react';

interface Debt {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  color: string;
}

const DebtCalculator: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Tarjeta de Crédito', balance: 5000, minPayment: 150, interestRate: 18.5, color: 'from-red-500 to-red-600' },
    { id: '2', name: 'Préstamo Personal', balance: 8000, minPayment: 280, interestRate: 12.0, color: 'from-orange-500 to-orange-600' },
    { id: '3', name: 'Préstamo Estudiantil', balance: 15000, minPayment: 200, interestRate: 8.5, color: 'from-blue-500 to-blue-600' },
  ]);

  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [paymentStrategy, setPaymentStrategy] = useState<'avalanche' | 'snowball'>('avalanche');

  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0);

  const calculatePayoffTime = (debt: Debt, extraPayment: number = 0) => {
    const monthlyRate = debt.interestRate / 100 / 12;
    const payment = debt.minPayment + extraPayment;
    
    if (payment <= debt.balance * monthlyRate) {
      return 999; // Never pays off
    }
    
    const months = Math.log(1 + (debt.balance * monthlyRate) / payment) / Math.log(1 + monthlyRate);
    return Math.ceil(months);
  };

  const getSortedDebts = () => {
    if (paymentStrategy === 'avalanche') {
      return [...debts].sort((a, b) => b.interestRate - a.interestRate);
    } else {
      return [...debts].sort((a, b) => a.balance - b.balance);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-3xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Star className="text-yellow-500 mr-2" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Planificador Inteligente de Deudas</h2>
        </div>
        <p className="text-gray-600 text-lg">Calculadora automática que hace todo el trabajo por ti</p>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <CreditCard className="text-red-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Total de Deudas</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">${totalDebt.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Calculator className="text-orange-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Pago Mínimo Total</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">${totalMinPayment.toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <TrendingDown className="text-emerald-500 mr-3" size={24} />
            <h3 className="text-lg font-semibold text-gray-700">Ahorro Potencial</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">${(extraPayment * 12).toLocaleString()}</p>
        </div>
      </div>

      {/* Strategy Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Estrategia de Pago</h3>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setPaymentStrategy('avalanche')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              paymentStrategy === 'avalanche'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <h4 className="font-semibold mb-2">Avalancha (Recomendado)</h4>
            <p className="text-sm text-gray-600">Paga primero las deudas con mayor interés</p>
          </button>
          <button
            onClick={() => setPaymentStrategy('snowball')}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              paymentStrategy === 'snowball'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <h4 className="font-semibold mb-2">Bola de Nieve</h4>
            <p className="text-sm text-gray-600">Paga primero las deudas más pequeñas</p>
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="text-gray-700 font-medium">Pago extra mensual:</label>
          <input
            type="number"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <span className="text-gray-600">$</span>
        </div>
      </div>

      {/* Debt List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-800">Plan de Pago de Deudas</h3>
        {getSortedDebts().map((debt, index) => {
          const payoffTime = calculatePayoffTime(debt, index === 0 ? extraPayment : 0);
          
          return (
            <div key={debt.id} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">{debt.name}</h4>
                <div className="flex items-center gap-2">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    index === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {index === 0 ? 'Prioridad' : `#${index + 1}`}
                  </span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Saldo</p>
                  <p className="text-xl font-bold text-gray-800">${debt.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pago Mínimo</p>
                  <p className="text-xl font-bold text-gray-800">${debt.minPayment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tasa de Interés</p>
                  <p className="text-xl font-bold text-gray-800">{debt.interestRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tiempo de Pago</p>
                  <p className="text-xl font-bold text-gray-800">
                    {payoffTime > 100 ? '100+' : payoffTime} meses
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${debt.color}`}
                  style={{ width: `${Math.min((debt.balance / 20000) * 100, 100)}%` }}
                ></div>
              </div>
              
              {index === 0 && extraPayment > 0 && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-700 font-medium">
                    💡 Con ${extraPayment} extra mensual, pagarás esta deuda en {payoffTime} meses
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DebtCalculator;
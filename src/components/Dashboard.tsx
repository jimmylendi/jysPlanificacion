import React from 'react';
import { Star, DollarSign, TrendingUp, Target, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  const features = [
    {
      title: "Hace todos los cálculos automáticamente",
      icon: <Star className="text-yellow-500" size={24} />,
      description: "No más hojas de cálculo complicadas"
    },
    {
      title: "Mantiene tus finanzas sincronizadas",
      icon: <Star className="text-yellow-500" size={24} />,
      description: "Todo conectado en tiempo real"
    },
    {
      title: "Dashboard visual súper cute",
      icon: <Star className="text-yellow-500" size={24} />,
      description: "Panorama completo de tu dinero"
    }
  ];

  const stats = [
    { label: "Ingresos Mensuales", value: `$${monthlyIncome.toLocaleString()}`, icon: Users, color: "from-emerald-500 to-teal-500" },
    { label: "Presupuesto Mensual", value: "$2,500", icon: DollarSign, color: "from-blue-500 to-blue-600" },
    { label: "Ahorros Totales", value: "$5,200", icon: Target, color: "from-pink-500 to-rose-500" },
    { label: "Deudas Pendientes", value: "$1,800", icon: CreditCard, color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Para la chica que busca un sistema cohesivo
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-md">
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className="text-white" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Tu Progreso Financiero</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Meta de Ahorro Mensual</span>
              <span className="text-emerald-600 font-bold">75%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Reducción de Deudas</span>
              <span className="text-pink-600 font-bold">60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Presupuesto Utilizado</span>
              <span className="text-purple-600 font-bold">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-3 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
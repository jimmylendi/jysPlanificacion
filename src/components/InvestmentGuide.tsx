import React, { useState } from 'react';
import { BookOpen, Star, TrendingUp, PieChart, DollarSign, AlertCircle } from 'lucide-react';

const InvestmentGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState('basics');

  const investmentTypes = [
    {
      name: 'Cuenta de Ahorros',
      risk: 'Muy Bajo',
      return: '0.5-2%',
      description: 'Ideal para fondo de emergencia',
      color: 'from-blue-500 to-blue-600',
      icon: '🏦'
    },
    {
      name: 'Certificados de Depósito',
      risk: 'Bajo',
      return: '2-4%',
      description: 'Dinero bloqueado por tiempo fijo',
      color: 'from-green-500 to-green-600',
      icon: '📄'
    },
    {
      name: 'Fondos Mutuos',
      risk: 'Medio',
      return: '5-8%',
      description: 'Diversificación automática',
      color: 'from-purple-500 to-purple-600',
      icon: '📊'
    },
    {
      name: 'Acciones',
      risk: 'Alto',
      return: '8-12%',
      description: 'Potencial alto, volatilidad alta',
      color: 'from-red-500 to-red-600',
      icon: '📈'
    }
  ];

  const investmentSteps = [
    {
      step: 1,
      title: 'Construye tu fondo de emergencia',
      description: 'Ahorra 3-6 meses de gastos en una cuenta de ahorros',
      icon: '🛡️'
    },
    {
      step: 2,
      title: 'Elimina deudas de alto interés',
      description: 'Paga tarjetas de crédito antes de invertir',
      icon: '💳'
    },
    {
      step: 3,
      title: 'Comienza con fondos indexados',
      description: 'Diversificación instantánea con costos bajos',
      icon: '📊'
    },
    {
      step: 4,
      title: 'Invierte consistentemente',
      description: 'Aprovecha el costo promedio del dólar',
      icon: '⏰'
    }
  ];

  const riskProfiles = [
    {
      type: 'Conservador',
      allocation: { bonds: 70, stocks: 30 },
      description: 'Priorizas la seguridad sobre los rendimientos',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: 'Moderado',
      allocation: { bonds: 50, stocks: 50 },
      description: 'Equilibrio entre riesgo y rendimiento',
      color: 'from-purple-500 to-purple-600'
    },
    {
      type: 'Agresivo',
      allocation: { bonds: 20, stocks: 80 },
      description: 'Buscas maximizar el crecimiento a largo plazo',
      color: 'from-red-500 to-red-600'
    }
  ];

  const sections = [
    { id: 'basics', label: 'Conceptos Básicos', icon: BookOpen },
    { id: 'types', label: 'Tipos de Inversión', icon: PieChart },
    { id: 'steps', label: 'Pasos a Seguir', icon: TrendingUp },
    { id: 'profiles', label: 'Perfiles de Riesgo', icon: AlertCircle }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Star className="text-yellow-500 mr-2" size={32} />
          <h2 className="text-3xl font-bold text-gray-800">Guía de Inversiones 101</h2>
        </div>
        <p className="text-gray-600 text-lg">Todo lo que necesitas saber para empezar a invertir</p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl p-4 shadow-lg">
        <div className="flex flex-wrap gap-2 justify-center">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeSection === id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        {activeSection === 'basics' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Conceptos Básicos de Inversión</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <DollarSign className="text-blue-500 mr-3" size={24} />
                  <h4 className="text-lg font-semibold text-gray-800">¿Qué es Invertir?</h4>
                </div>
                <p className="text-gray-600">
                  Invertir es poner tu dinero a trabajar para generar más dinero a largo plazo. 
                  Es diferente a ahorrar porque buscas que tu dinero crezca por encima de la inflación.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="text-purple-500 mr-3" size={24} />
                  <h4 className="text-lg font-semibold text-gray-800">Interés Compuesto</h4>
                </div>
                <p className="text-gray-600">
                  El interés compuesto es cuando ganas intereses sobre tus intereses. 
                  Es la fuerza más poderosa en las finanzas y la clave para crear riqueza.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-yellow-600 mr-3" size={24} />
                <h4 className="text-lg font-semibold text-yellow-800">Regla de Oro</h4>
              </div>
              <p className="text-yellow-700">
                <strong>Nunca inviertas dinero que no puedes permitirte perder.</strong> 
                Siempre ten un fondo de emergencia antes de comenzar a invertir.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'types' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Tipos de Inversión</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {investmentTypes.map((investment, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{investment.icon}</span>
                    <h4 className="text-lg font-semibold text-gray-800">{investment.name}</h4>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Riesgo:</span>
                      <span className="font-medium">{investment.risk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rendimiento:</span>
                      <span className="font-medium">{investment.return}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">{investment.description}</p>
                  
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${investment.color}`}
                      style={{ width: `${(index + 1) * 25}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'steps' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Pasos para Empezar a Invertir</h3>
            
            <div className="space-y-4">
              {investmentSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <span className="text-2xl">{step.icon}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'profiles' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Perfiles de Riesgo</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {riskProfiles.map((profile, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{profile.type}</h4>
                  
                  <div className="space-y-4 mb-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Acciones</span>
                        <span className="font-medium">{profile.allocation.stocks}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${profile.color}`}
                          style={{ width: `${profile.allocation.stocks}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Bonos</span>
                        <span className="font-medium">{profile.allocation.bonds}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gray-400"
                          style={{ width: `${profile.allocation.bonds}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm">{profile.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentGuide;
export interface BudgetItem {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
  icon: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Income {
  id: string;
  source: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  person: string;
  type: 'salary' | 'freelance' | 'business' | 'investment' | 'rental' | 'other';
  color: string;
  nextPayment: string;
  createdAt?: string;
  updatedAt?: string;
}
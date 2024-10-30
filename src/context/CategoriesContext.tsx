import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category } from '../types';

interface CategoriesContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  updateCategory: (category: Category) => void;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    try {
      const stored = localStorage.getItem('categories');
      if (stored) {
        setCategories(JSON.parse(stored));
      } else {
        // Set default categories if none exist
        const defaultCategories: Category[] = [
          { id: '1', name: 'Food', type: 'expense', color: '#ef4444', icon: 'shopping-bag' },
          { id: '2', name: 'Transport', type: 'expense', color: '#3b82f6', icon: 'car' },
          { id: '3', name: 'Salary', type: 'income', color: '#22c55e', icon: 'briefcase' },
        ];
        setCategories(defaultCategories);
        localStorage.setItem('categories', JSON.stringify(defaultCategories));
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const saveCategories = (newCategories: Category[]) => {
    try {
      localStorage.setItem('categories', JSON.stringify(newCategories));
    } catch (error) {
      console.error('Error saving categories:', error);
    }
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = { ...category, id: Date.now().toString() };
    const newCategories = [...categories, newCategory];
    setCategories(newCategories);
    saveCategories(newCategories);
  };

  const deleteCategory = (id: string) => {
    const newCategories = categories.filter(c => c.id !== id);
    setCategories(newCategories);
    saveCategories(newCategories);
  };

  const updateCategory = (category: Category) => {
    const newCategories = categories.map(c =>
      c.id === category.id ? category : c
    );
    setCategories(newCategories);
    saveCategories(newCategories);
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        updateCategory,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
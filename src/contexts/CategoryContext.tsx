import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category } from '../types';
import { storageService } from '../services/storage';
import { generateId, generateColor } from '../utils/helpers';

interface CategoryContextType {
  categories: Category[];
  addCategory: (name: string) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

interface CategoryProviderProps {
  children: React.ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedCategories = storageService.getCategories();
    setCategories(savedCategories);
  }, []);

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: generateId(),
      name,
      color: generateColor(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    storageService.saveCategories(updatedCategories);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    const updatedCategories = categories.map(cat =>
      cat.id === id ? { ...cat, ...updates } : cat
    );
    setCategories(updatedCategories);
    storageService.saveCategories(updatedCategories);
  };

  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter(cat => cat.id !== id);
    setCategories(updatedCategories);
    storageService.saveCategories(updatedCategories);
  };

  const getCategoryById = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  const value: CategoryContextType = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

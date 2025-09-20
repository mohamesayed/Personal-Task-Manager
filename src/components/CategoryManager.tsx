import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { useCategories } from '../contexts/CategoryContext';

export const CategoryManager: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsOpen(false);
    }
  };

  const handleEditStart = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleEditSave = () => {
    if (editingId && editName.trim()) {
      updateCategory(editingId, { name: editName.trim() });
    }
    setEditingId(null);
    setEditName('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      deleteCategory(id);
    }
  };

  return (
  <div className="space-y-4 overflow-x-hidden">
      {/* Header with Add Button */}
  <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Categories
          </h3>
          {categories.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({categories.length})
            </span>
          )}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn-primary flex items-center gap-2 text-sm px-3 py-2"
        >
          <Plus className="w-2 h-4" />
          {isOpen ? 'Cancel' : 'Add'}
        </button>
      </div>

      {/* Add category form - More compact */}
      {isOpen && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Enter category name..."
              className="input-field flex-1 text-sm py-2"
              autoFocus
            />
            <button 
              type="submit" 
              className="btn-primary text-sm px-3 py-2"
              disabled={!newCategoryName.trim()}
            >
              Add
            </button>
          </form>
        </div>
      )}

      {/* Categories list - Improved layout */}
      <div className="space-y-2">
        {categories.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Tag className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
              No categories yet
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              Create categories to organize your tasks
            </p>
          </div>
        ) : (
          <div className="grid gap-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:shadow-sm transition-all duration-200"
              >
                {editingId === category.id ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onBlur={handleEditSave}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEditSave();
                        if (e.key === 'Escape') handleEditCancel();
                      }}
                      className="input-field text-sm py-1 px-2 flex-1"
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                        {category.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => handleEditStart(category.id, category.name)}
                        className="p-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 rounded"
                        aria-label="Edit category"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id, category.name)}
                        className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 rounded"
                        aria-label="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick stats */}
      {categories.length > 0 && (
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {categories.length} categor{categories.length === 1 ? 'y' : 'ies'} available
          </p>
        </div>
      )}
    </div>
  );
};
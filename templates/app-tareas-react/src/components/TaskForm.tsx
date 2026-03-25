// ============================================
// TaskForm Component - Anexo 3A
// ============================================

import React, { useState } from 'react';
import { TaskPriority } from '../types';

interface TaskFormProps {
  onAdd: (title: string, priority: TaskPriority, description?: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd(title, priority, description || undefined);
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: '#f9f9f9',
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '24px',
    }}>
      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ marginBottom: '12px' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          rows={2}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          style={{
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <option value="low">Baja</option>
          <option value="medium">Media</option>
          <option value="high">Alta</option>
        </select>
        <button
          type="submit"
          disabled={!title.trim()}
          style={{
            padding: '12px 24px',
            backgroundColor: title.trim() ? '#2196F3' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: title.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          Agregar Tarea
        </button>
      </div>
    </form>
  );
};

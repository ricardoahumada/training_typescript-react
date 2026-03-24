// ============================================
// Header Component - Anexo 3A
// ============================================

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '20px',
      textAlign: 'center',
      marginBottom: '24px',
    }}>
      <h1 style={{ margin: 0, fontSize: '28px' }}>Sistema de Tareas</h1>
      <p style={{ margin: '8px 0 0 0', opacity: 0.8 }}>Caso 1r - React + TypeScript</p>
    </header>
  );
};

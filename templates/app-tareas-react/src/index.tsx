// ============================================================
// src/index.tsx - Entry point Webpack (Lab 3A - COMPLETADO)
// ============================================================
// Este archivo esta COMPLETO y FUNCIONAL.
// Lab 3A: Webpack entry point configurado correctamente.

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

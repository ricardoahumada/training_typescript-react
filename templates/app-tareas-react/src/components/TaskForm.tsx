// ============================================================
// src/components/TaskForm.tsx
// ============================================================
// Lab 3A -> ESTE COMPONENTE ESTA COMPLETO y FUNCIONAL
// Lab 4A: Se mejora con validacion de formularios tipados

import React, { useState } from "react";
import { TaskPriority } from "../types";

import { CreateTaskSchema } from "../utils/validators";

interface TaskFormProps {
  onSubmit: (title: string, priority: TaskPriority) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const result = CreateTaskSchema.safeParse({ title, priority });
    if (!result.success) {
      console.error("Tipo inválido!!:", result.error.issues);
      return;
    }

    onSubmit(title.trim(), priority);
    setTitle("");
    setPriority("medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-form__input"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="task-form__select"
        value={priority}
        onChange={(e) => setPriority(e.target.value as TaskPriority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
      <button type="submit" className="task-form__button">
        Add Task
      </button>
    </form>
  );
}

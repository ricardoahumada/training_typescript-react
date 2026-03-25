import React, { useState, FormEvent } from 'react';
import { Book, LoanStatus } from '../types';

interface LoanFormProps {
  books: Book[];
}

export const LoanForm: React.FC<LoanFormProps> = ({ books }) => {
  const [isbn, setIsbn] = useState('');
  const [memberId, setMemberId] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Crear préstamo:', { isbn, memberId });
    setIsbn('');
    setMemberId('');
  };

  return (
    <div className="loan-form">
      <h3>Nuevo Préstamo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="isbn">ISBN del Libro</label>
          <input
            type="text"
            id="isbn"
            value={isbn}
            onChange={e => setIsbn(e.target.value)}
            placeholder="978-0-13-468599-1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="member">ID del Socio</label>
          <input
            type="text"
            id="member"
            value={memberId}
            onChange={e => setMemberId(e.target.value)}
            placeholder="member-1"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Crear Préstamo</button>
        </div>
      </form>
    </div>
  );
};
